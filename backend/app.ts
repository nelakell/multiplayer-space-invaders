const port = 8000;
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({port: port});

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const HERO_WIDTH = 40;
const HERO_HEIGHT = 30;
const HERO_SPEED = 3;

export type KeyControl = {
    leftKeyPressed: boolean,
    rightKeyPressed: boolean,
    upKeyPressed: boolean,
    downKeyPressed: boolean,
    spaceKeyPressed: boolean
}

export type User = {
    socket: any,
    id: number,
    playerState: PlayerState
};

export type GameRoom = {
    users: User[];
};

export type PlayerState = {
    name: string,
    fighter: string,
    language: string,
    ready: boolean,
    gameState: PlayerGameState
}

export type PlayerGameState = {
    xPos: number,
    yPos: number,
    lasers: any,
    bonus: any,
    score: number,
    lives: number,
    level: number,
    lastShot: number
}

export const lobbyRoom = {
    users: [] as User[]
};

export const gameRooms = {
    rooms: [] as GameRoom[]
}

type Message = {
    action: MessageAction,
    target: ActionTarget,
    value: string
}

type UserPayload = {
    name: string,
    fighter: string,
    language: string,
}

enum MessageAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    MESSAGE = 'MESSAGE'
}

enum ActionTarget {
    USER = 'USER',
    READYSTATE = 'READYSTATE',
    CHAT = 'CHAT',
    GAME = 'GAME'
}

export function stringifyMessage(action: MessageAction, target: ActionTarget, value: any): string {
    return JSON.stringify({
        action: action,
        target: target,
        value: value
    });
}

const addUser = (user: User) => {
    lobbyRoom.users.push(user);
    onUserMessageHandler(user);

    user.socket.onclose = function () {
        broadcastUserUpdate(user, MessageAction.DELETE);
        removeUser(user);
    }
};

function broadcastChatMessage(user: User, msg: Message) {
    sendMessageToLobbyUsers(stringifyMessage(MessageAction.MESSAGE, ActionTarget.CHAT, {
        'name': user.playerState.name,
        'message': msg.value
    }));
}

function broadcastUserUpdate(user: User, action: MessageAction) {
    if (MessageAction.CREATE === action) {
        sendMessageToLobbyUsers(stringifyMessage(action, ActionTarget.USER, {
            name: 'info',
            message: "Welcome player '" + user.playerState.name + "', joining the party for team " + user.playerState.fighter + ". Total connections: " + lobbyRoom.users.length
        }));
    } else if (MessageAction.DELETE === action) {
        sendMessageToLobbyUsers(stringifyMessage(action, ActionTarget.USER, {
            name: 'info',
            message: user.playerState.name + " has left the lobby. Total connections: " + lobbyRoom.users.length
        }));
    }
}

function broadcastGameStart(gameRoom: GameRoom) {
    let playerStates: PlayerState[] = [];
    gameRoom.users.forEach(u => playerStates.push(u.playerState));
    sendMessageToGameUsers(gameRoom, stringifyMessage(MessageAction.CREATE, ActionTarget.GAME, {playerStates: playerStates}));
}

function launchGameHandler() {
    const users = lobbyRoom.users.filter(user => user.playerState.ready);
    if (users.length > 0) { // TODO set to 1
        const newGameRoom = {users: users};
        gameRooms.rooms.push(newGameRoom);
        broadcastGameStart(newGameRoom);
    }
}

function updateGameHandler(gameRoom: GameRoom) {
    let playerStates: PlayerState[] = [];
    gameRoom.users.forEach(u => playerStates.push(u.playerState));
    sendMessageToGameUsers(gameRoom, stringifyMessage(MessageAction.UPDATE, ActionTarget.GAME, {playerStates: playerStates}));
}

const onUserMessageHandler = (user: User) => {
    user.socket.on("message", (message: string) => {
            const msg = JSON.parse(message);
            if (msg.action == MessageAction.MESSAGE && msg.target == ActionTarget.CHAT) {
                broadcastChatMessage(user, msg);
            } else if (msg.action == MessageAction.CREATE && msg.target == ActionTarget.USER) {
                broadcastUserUpdate(registerUser(user, msg.value), MessageAction.CREATE);
            } else if (msg.action == MessageAction.UPDATE && msg.target == ActionTarget.READYSTATE) {
                lobbyRoom.users[lobbyRoom.users.findIndex((u => u.id == user.id))] = {
                    ...user,
                    playerState: {
                        ...user.playerState,
                        ready: msg.value
                    }
                }
                launchGameHandler();
            } else if (msg.action == MessageAction.UPDATE && msg.target == ActionTarget.GAME) {
                console.log("debug")
                let currentUser = lobbyRoom.users[lobbyRoom.users.findIndex((u => u.id == user.id))];
                gameRooms.rooms[0].users[gameRooms.rooms[0].users.findIndex((u => u.id == user.id))] = {
                    ...currentUser,
                    playerState: {
                        ...currentUser.playerState,
                        gameState: movePlayer(currentUser.playerState.gameState, msg.value)
                    }
                }
                updateGameHandler(gameRooms.rooms[0]);
            }
        }
    );
};

server.on('connection', function (socket: any) {
    const user = {
        socket: socket,
        id: generateUserId(),
        playerState: {
            name: '',
            fighter: '',
            language: '',
            ready: false,
            gameState: {
                xPos: GAME_WIDTH / 2 - HERO_WIDTH / 2,
                yPos: GAME_HEIGHT - 50,
                lasers: [],
                bonus: [],
                score: 0,
                lives: 3,
                level: 1,
                lastShot: 0
            }
        }
    };
    addUser(user);
});

const registerUser = (user: User, payload: UserPayload) => {
    user.playerState.name = payload.name;
    user.playerState.fighter = payload.fighter;
    user.playerState.language = payload.language;
    return user;
};

const removeUser = (user: User) => {
    for (let i = lobbyRoom.users.length; i >= 0; i--) {
        if (lobbyRoom.users[i] === user) {
            lobbyRoom.users.splice(i, 1);
        }
    }
};

const sendMessageToLobbyUsers = (message: string) => {
    for (let i = 0; i < lobbyRoom.users.length; i++) {
        lobbyRoom.users[i].socket.send(message);
    }
};

const sendMessageToGameUsers = (gameRoom: GameRoom, message: string) => {
    for (let i = 0; i < gameRoom.users.length; i++) {
        gameRoom.users[i].socket.send(message);
    }
};

export function movePlayer(playerGameState: PlayerGameState, keyControl: KeyControl) {
    let x = Number(playerGameState.xPos);
    let y = Number(playerGameState.yPos);
    if (keyControl.upKeyPressed) {
        y -= HERO_SPEED;
    }
    if (keyControl.downKeyPressed) {
        y += HERO_SPEED;
    }
    if (keyControl.leftKeyPressed) {
        x -= HERO_SPEED;
    }
    if (keyControl.rightKeyPressed) {
        x += HERO_SPEED;
    }
    return {
        ...playerGameState,
        xPos: ensureBoundaries(x, 0, GAME_WIDTH - HERO_WIDTH),
        yPos: ensureBoundaries(y, 0, GAME_HEIGHT - HERO_HEIGHT)
    }
}

function generateUserId() {
    return Math.floor(Math.random() * 1000000000);
}

export function ensureBoundaries(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");


/*

TODO integrate below frontend logik to backend


    const [keyControl, setKeyControl] = useState({
        init: true
    });
    const keyControlRef = useRef(keyControl);
    keyControlRef.current = keyControl;


    const [invaderState, setInvaderState] = useState({
        invaders: [],
        lasers: [],
        bonus: [],
        spawning_cooldown: 0
    })
    const invaderStateRef = useRef(invaderState);
    invaderStateRef.current = invaderState;



const updateHeroState = (heroState, keyControl) => {
        const time = Date.now();
        const updatedHeroState = moveHero(heroState, keyControl);
        const shootEvent = () => {
            return keyControl.shootKeyPressed && time - heroState.lastShot > 1000;
        }

        let lasers = updateLasers(heroState.lasers);
        if (shootEvent()) {
            lasers.push(shoot(heroState.xPos, heroState.yPos));
        }

        updatedHeroState.lasers = lasers;
        updatedHeroState.lastShot = shootEvent() ? time : heroState.lastShot;
        updatedHeroState.level = Math.floor((Date.now() - props.startTime) / 6000);
        console.log(Math.floor((Date.now() - Number(props.startTime)) / 6000 + 1))
        props.socket.sendHeroUpdateMessage(updatedHeroState);
    }

    const updateInvadersState = invaderState => {
        let invaders = []
        let lasers = updateLasers(invaderState.lasers)
        for (let i = 0; i < invaderState.invaders.length; i++) {
            let invader = invaderState.invaders[i];
            invaders[i] = moveInvader(invader, invaderState.invaders)
            if (invaderHasReloaded()) {
                lasers.push(shot(lasers, invader.xPos, invader.yPos))
            }
        }

        let cooldown = Number(invaderState.spawning_cooldown);
        if (invaderState.invaders.length < 3 * heroStateRef.current.level && invaderState.spawning_cooldown <= 0) {
            invaders.push(spawnInvader());
            cooldown = 3000;
        } else {
            cooldown -= 20;
        }

        setInvaderState(prevState => {
            return {
                ...prevState,
                invaders: invaders,
                // bonus: updateBonus(invaderState.lasers),
                lasers: lasers,
                spawning_cooldown: cooldown
            }
        });
    }

    const updateStates = () => {
        updateHeroState(heroStateRef.current, keyControlRef.current);
        updateInvadersState(invaderStateRef.current);
        if (heroState.lives === 0) {
            props.onGameOver(heroStateRef.current.score);
        }
    }

    const updateCollisions = () => {
        let {
            remainingHeroLasers,
            remainingInvaders
        } = detectHeroHitsInvader(heroStateRef.current, invaderStateRef.current.invaders) || {};

        if (remainingInvaders !== undefined && invaderStateRef.current.invaders.length !== remainingInvaders.length) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    score: prevState.score += 50
                }
            });
            setInvaderState(prevState => {
                return {
                    ...prevState,
                    invaders: remainingInvaders
                }
            });
        }
        if (remainingHeroLasers !== undefined && heroStateRef.current.lasers.length !== remainingHeroLasers.lasers) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    lasers: remainingHeroLasers
                }
            });
        }
    }

    const updateHeroCollisions = () => {
        let {
            remainingHeroLives,
            remainingInvadersLasers
        } = detectInvaderHitsHero(heroStateRef.current, invaderStateRef.current.lasers) || {};

        if (remainingInvadersLasers !== undefined && invaderStateRef.current.lasers.length !== remainingInvadersLasers.length) {
            setInvaderState(prevState => {
                return {
                    ...prevState,
                    lasers: remainingInvadersLasers
                }
            });
        }
        if (remainingHeroLives !== undefined && heroStateRef.current.lives !== remainingHeroLives) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    lives: remainingHeroLives
                }
            });
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            updateStates();
            updateCollisions();
            updateHeroCollisions();
        }, 10);
        return () => clearTimeout(timer);
    });
 */