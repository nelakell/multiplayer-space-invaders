import {ActionTarget, MessageAction, stringifyMessage} from "./App";

class Websocket {

    socket: WebSocket;
    onGameStart;

    constructor(onGameStartHandler) {
        this.socket = new WebSocket("ws://localhost:8000");
        this.socket.onmessage = this.onMessageReceiveHandler();
        this.onGameStart = onGameStartHandler;
    }

    onMessageReceiveHandler() {
        return (messageEvent) => {
            console.log("frontend: received msg")
            debugger
            if (messageEvent.data.indexOf("error") > 0) {
                document.getElementById("chat-history").append("error: " + messageEvent.data.error + "\r");
            } else {
                let message = JSON.parse(messageEvent.data);
                switch (message.action) {
                    case MessageAction.MESSAGE:
                        document.getElementById("chat-history").append(message.value.name + ": " + message.value.message + "\r");
                        break;
                    case MessageAction.CREATE:
                        switch (message.target) {
                            case ActionTarget.GAME:
                                this.onGameStart();
                                break;
                            case ActionTarget.USER:
                                document.getElementById("chat-history").append(message.value.name + ": " + message.value.message + "\r");
                                break;
                            default:
                                console.log("unknown message of action " + message.action + " and target " + message.target + " received.")
                                break;
                        }
                        break;
                    default:
                        console.log("unknown message of action " + message.action + " and target " + message.target + " received.")
                        break;
                }
            }
        };
    }

    register(name: string, fighter: string) {
        return () => {
            this.socket.send(stringifyMessage(MessageAction.CREATE, ActionTarget.USER, {
                name: name,
                fighter: fighter,
                language: 'de'
            }));
        };
    }

    sendChatMessage(message: string) {
        this.socket.send(stringifyMessage(MessageAction.MESSAGE, ActionTarget.CHAT, message));
    }

    setReadyState(ready: boolean) {
        this.socket.send(stringifyMessage(MessageAction.UPDATE, ActionTarget.USERSTATE, {ready: ready}));
    }

}

export default Websocket;