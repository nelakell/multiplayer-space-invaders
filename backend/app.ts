const port = 8000;
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({port: port});

export type User = {
    socket: any,
    id: number,
    name: string,
    fighter: string,
    language: string,
    state: UserState
};

export type GameRoom = {
    users: User[];
};

export type UserState = {
    ready: boolean,
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
    sendMessageToAllUsers(stringifyMessage(MessageAction.MESSAGE, ActionTarget.CHAT, {
        'name': user.name,
        'message': msg.value
    }));
}

function broadcastUserUpdate(user: User, action: MessageAction) {
    if (MessageAction.CREATE === action) {
        sendMessageToAllUsers(stringifyMessage(action, ActionTarget.USER, {
            name: 'info',
            message: "Welcome player '" + user.name + "', joining the party for team " + user.fighter + ". Total connections: " + lobbyRoom.users.length
        }));
    } else if (MessageAction.DELETE === action) {
        sendMessageToAllUsers(stringifyMessage(action, ActionTarget.USER, {
            name: 'info',
            message: user.name + " has left the lobby. Total connections: " + lobbyRoom.users.length
        }));
    }
}

function broadcastGameStart(gameRoom: GameRoom) {
    sendMessageToSpecificUsers(gameRoom.users, stringifyMessage(MessageAction.CREATE, ActionTarget.GAME, {}));
}

function launchGameHandler() {
    const users = lobbyRoom.users.filter(user => user.state.ready);
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
                    state: msg.value
                }
                launchGameHandler();
            }
        }
    );
};

const registerUser = (user: User, payload: UserPayload) => {
    user.name = payload.name;
    user.fighter = payload.fighter;
    user.language = payload.language;
    return user;
};

const removeUser = (user: User) => {
    for (let i = lobbyRoom.users.length; i >= 0; i--) {
        if (lobbyRoom.users[i] === user) {
            lobbyRoom.users.splice(i, 1);
        }
    }
};

const sendMessageToAllUsers = (message: string) => {
    for (let i = 0; i < lobbyRoom.users.length; i++) {
        lobbyRoom.users[i].socket.send(message);
    }
};

const sendMessageToSpecificUsers = (users: User[], message: string) => {
    for (let i = 0; i < users.length; i++) {
        users[i].socket.send(message);
    }
};

function generateUserId() {
    return Math.floor(Math.random() * 1000000000);
}

server.on('connection', function (socket: any) {
    const user = {
        socket: socket,
        id: generateUserId(),
        name: '',
        fighter: '',
        language: '',
        state: {
            ready: false
        }
    };
    addUser(user);
});

console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");
