const port = 8000;
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({port: port});

export type User = {
    socket: any,
    id: number,
    name: string,
    fighter: string,
    language: string
};

const room = {
    users: [] as User[]
};

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
    // DELETE = 'DELETE'
    MESSAGE = 'MESSAGE',
}

enum ActionTarget {
    USER = 'USER',
    CHAT = 'CHAT',
}

const addUser = (user: User) => {
    room.users.push(user);
    onUserMessageHandler(user);

    user.socket.onclose = function () {
        console.log("A connection left.");
        removeUser(user);
    }
}

const onUserMessageHandler = (user: User) => {
    user.socket.on("message", (message: string) => {
        const msg = JSON.parse(message)
        if (msg.action == MessageAction.MESSAGE && msg.target == ActionTarget.CHAT) {
            sendAll(user.name + ":" + msg.value);
        } else if (msg.action == MessageAction.UPDATE && msg.target == ActionTarget.USER) {
            registerUser(user, msg.value);
        }
    });
};

const registerUser = (user: User, payload: UserPayload) => {
    user.name = payload.name;
    user.fighter = payload.fighter;
    user.language = payload.language;

    const message = "Welcome " + user.name + " joining the party for team " + user.fighter + ". Total connection: " + room.users.length;
    sendAll(message);
}

const removeUser = (user: User) => {
    for (let i = room.users.length; i >= 0; i--) {
        if (room.users[i] === user) {
            room.users.splice(i, 1);
        }
    }
};

const sendAll = (message: string) => {
    let i = 0, len = room.users.length;
    for (; i < len; i++) {
        console.log("send message to client " + i + ": " + message)
        room.users[i].socket.send(message);
    }
};

function generateUserId() {
    return Math.floor(Math.random() * 1000000000);
}

server.on('connection', function (socket: any) {
    const user = {socket: socket, id: generateUserId(), name: '', fighter: '', language: ''};
    addUser(user);
});

console.log("WebSocket server is running.");
console.log("Listening to port " + port + ".");

