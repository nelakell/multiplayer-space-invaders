import React, {useState} from 'react';
import './App.css';
import './WelcomeScreen.css';
import './LobbyScreen.css';
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {useTranslation} from "react-i18next";

function LobbyScreen(props) {

    const [chatInput, setChatInput] = useState('');
    const [ready, setReady] = useState(false);

    const {t, i18n} = useTranslation();

    const sendMessage = () => {
        if (chatInput && chatInput.length > 0) {
            props.websocket.sendChatMessage(chatInput);
            setChatInput('');
        }
    }

    function setReadyState(checked: boolean) {
        props.websocket.setReadyState(checked);
        setReady(checked);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <b>{t('waiting-for-opponent')}</b>
                    <Checkbox onChange={e => setReadyState(e.checked)} checked={ready}/>
                    <label>Bereit</label>
                </div>
                <div className="row">
                    <InputTextarea id="chat-history" rows={15} cols={50} readOnly autoResize/>
                </div>
                <div className="row">
                    <InputText id="chat-input" autoFocus autoComplete="off" placeholder="Chat here.." value={chatInput}
                               onChange={(e) => setChatInput(e.target.value)}/>
                </div>
                <div className="row">
                    <Button value="send" id="chat-send" onClick={sendMessage}>{t('send-chat-message')}</Button>
                </div>
            </div>
        </div>
    )
}

export default LobbyScreen;