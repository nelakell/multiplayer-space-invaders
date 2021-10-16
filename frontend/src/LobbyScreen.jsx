import React from 'react';
import './App.css';
import './WelcomeScreen.css';
import {onSend} from "./Registration";

function LobbyScreen() {
    return (
        <div>
            <label>Warte auf Mitspieler ..</label>
            <br/>
            <textarea id="chat-history" rows="15" cols="50"/>
            <br/>
            <input type="text" id="chat-input" autoFocus autoComplete="off" placeholder="Chat here.."/>
            <br/>
            <input type="button" value="send" id="chat-send" onClick={onSend}/>
        </div>
    )
}

export default LobbyScreen