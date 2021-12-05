import {ActionTarget, MessageAction, stringifyMessage} from "../App";

class Websocket {

    socket;
    onGameStart;
    onGameUpdate;

    constructor(onGameStartHandler, onGameUpdateHandler) {
        this.socket = new WebSocket("ws://localhost:8000");
        this.socket.onmessage = this.onMessageReceiveHandler();
        this.onGameStart = onGameStartHandler;
        this.onGameUpdate = onGameUpdateHandler;
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
                                this.onGameStart(message.value.playerStates);
                                break;
                            case ActionTarget.USER:
                                document.getElementById("chat-history").append(message.value.name + ": " + message.value.message + "\r");
                                break;
                            default:
                                console.log("unknown message of action " + message.action + " and target " + message.target + " received.")
                                break;
                        }
                        break;
                    case MessageAction.UPDATE:
                        switch (message.target) {
                            case ActionTarget.GAME:
                                this.onGameUpdate(message.value.playerStates);
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

    register(name, fighter) {
        return () => {
            this.socket.send(stringifyMessage(MessageAction.CREATE, ActionTarget.USER, {
                name: name,
                fighter: fighter,
                language: 'de'
            }));
        };
    }

    sendChatMessage(message) {
        this.socket.send(stringifyMessage(MessageAction.MESSAGE, ActionTarget.CHAT, message));
    }

    sendHeroUpdateMessage(message){
        this.socket.send(stringifyMessage(MessageAction.UPDATE, ActionTarget.GAME, message));
    }

    setReadyState(ready) {
        this.socket.send(stringifyMessage(MessageAction.UPDATE, ActionTarget.READYSTATE, ready));
    }

}

export default Websocket;