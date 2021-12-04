import React, {useRef, useState} from 'react';
import './App.css';
import WelcomeScreen from "./screen/Onboarding/WelcomeScreen";
import LobbyScreen from "./screen/Onboarding/LobbyScreen";
import Websocket from "./util/Websocket";
import GameScreen from "./screen/Game/GameScreen";
import {GAME_HEIGHT, GAME_WIDTH, HERO_WIDTH} from "./constants";

function App() {

    const startTime = Date.now()

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

    const [score, setScore] = useState(0)

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

    const gameOverHandler = (score: number) => {
        setScore(score);
        setScreens(() => {
            return {
                start: false,
                lobby: false,
                battle: false,
                score: true
            }
        })
    }

    return (
        <div className="App">
            {screens.start && <WelcomeScreen onRegistrationHandler={onRegistrationHandler}/>}
            {screens.lobby && <LobbyScreen websocket={user.socket} room={room} onGameStart={onGameStartHandler}/>}
            {screens.battle && <GameScreen startTime={startTime} onGameOver={gameOverHandler}/>}
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
