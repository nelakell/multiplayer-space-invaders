import React, {useState} from 'react';
import './App.css';
import WelcomeScreen from "./WelcomeScreen";
import LobbyScreen from "./LobbyScreen";
import Websocket from "./Websocket";
import GameScreen from "./GameScreen";

function App() {

    const [user, setUser] = useState({
        socket: {},
        name: '',
        fighter: ''
    });

    const [screens, setScreens] = useState({
        start: true,
        lobby: false,
        battle: false,
        score: false
    });

    const room = {
        users: [] as User[]
    };

    const onRegistrationHandler = (name: string, fighter: string) => {
        const websocket = new Websocket(onGameStartHandler);
        websocket.socket.onopen = websocket.register(name, fighter);
        setUser({
            socket: websocket,
            name: name,
            fighter: fighter
        });
        setScreens({
            start: false,
            lobby: true,
            battle: false,
            score: false
        });
    }

    const onGameStartHandler = () => {
        debugger
        console.log("start game ..");
        setScreens({
            start: false,
            lobby: false,
            battle: true,
            score: false
        });
    }

    return (
        <div className="App">
            {screens.start && <WelcomeScreen onRegistrationHandler={onRegistrationHandler}/>}
            {screens.lobby && <LobbyScreen websocket={user.socket} room={room} onGameStart={onGameStartHandler}/>}
            {screens.battle && <GameScreen/>}
        </div>
    );
}

export type User = {
    socket: any,
    id: number,
    name: string,
    fighter: string,
    language: string
};

export type Message = {
    action: MessageAction,
    target: ActionTarget,
    value: string
};

export enum MessageAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    MESSAGE = 'MESSAGE'
}

export enum ActionTarget {
    USER = 'USER',
    USERSTATE = 'USERSTATE',
    CHAT = 'CHAT',
    GAME = 'GAME',
}

export function stringifyMessage(action: MessageAction, target: ActionTarget, value: any): string {
    return JSON.stringify({
        action: action,
        target: target,
        value: value
    });
}

export default App;
