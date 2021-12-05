const port = 8000;
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({port: port});

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const HERO_WIDTH = 40;

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
    USERSTATE = 'USERSTATE',
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
    if (users.length > 1) {
        const newGameRoom = {users: users};
        gameRooms.rooms.push(newGameRoom);
        broadcastGameStart(newGameRoom);
    }
}

const onUserMessageHandler = (user: User) => {
    user.socket.on("message", (message: string) => {
            const msg = JSON.parse(message);
            if (msg.action == MessageAction.MESSAGE && msg.target == ActionTarget.CHAT) {
                broadcastChatMessage(user, msg);
            } else if (msg.action == MessageAction.CREATE && msg.target == ActionTarget.USER) {
                broadcastUserUpdate(registerUser(user, msg.value), MessageAction.CREATE);
            } else if (msg.action == MessageAction.UPDATE && msg.target == ActionTarget.USERSTATE) {
                lobbyRoom.users[lobbyRoom.users.findIndex((u => u.id == user.id))] = {
                    ...user,
                    playerState: msg.value
                }
                launchGameHandler();
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

function generateUserId() {
    return Math.floor(Math.random() * 1000000000);
}

console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");
