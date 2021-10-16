const webSocketURL = "ws://localhost:8000";
console.log("Connecting to: " + webSocketURL);
let webSocket;

export function onRegister() {
    try {
        openWebSocket()
        return register();
    } catch (exception) {
        console.error(exception);
    }
}

function handleNewMessage() {
    return function (messageEvent) {
        let message = messageEvent.data;
        console.log("WebSocket MESSAGE: " + message);
        if (message.indexOf("error") > 0) {
            document.getElementById("chat-history").append("error: " + message.error + "\r");
        } else {
            document.getElementById("chat-history").append(message + "\r");
        }
    };
}

function openWebSocket() {
    if (webSocket?.readyState !== WebSocket.OPEN) {
        webSocket = new WebSocket(webSocketURL);
        webSocket.onmessage = handleNewMessage();
    }
}

function register() {
    if (webSocket.readyState !== WebSocket.OPEN) {
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }

    webSocket.send(JSON.stringify({
        action: 'UPDATE',
        target: 'USER',
        value: {
            name: document.getElementById("player-name").value,
            fighter: document.querySelector('input[name="fighter-choice"]:checked').id,
            lang: 'de',
        }
    }));

    return true;
}

export function onSend() {
    if (webSocket.readyState !== WebSocket.OPEN) {
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }
    let message = document.getElementById("chat-input").value;
    webSocket.send(JSON.stringify({
        action: 'MESSAGE',
        target: 'CHAT',
        value: message
    }));
    document.getElementById("chat-input").value='';
}
