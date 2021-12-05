import React, {useState} from 'react';
import './App.css';
import WelcomeScreen from "./screen/Onboarding/WelcomeScreen";
import LobbyScreen from "./screen/Onboarding/LobbyScreen";
import Websocket from "./util/Websocket";
import GameScreen from "./screen/Game/GameScreen";

function App() {

    const startTime = Date.now()

    const [localUser, setLocalUser] = useState({
        socket: {},
        name: '',
        fighter: '',
    });

    const [screens, setScreens] = useState({
        start: true,
        lobby: false,
        battle: false,
        score: false
    });

    const [score, setScore] = useState(0)
    const [gameRoom, setGameRoom] = useState([] as GameRoom)

    const onRegistrationHandler = (name: string, fighter: string) => {
        const websocket = new Websocket(onGameStartHandler, onGameUpdateHandler);
        websocket.socket.onopen = websocket.register(name, fighter);
        setLocalUser({
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

    const onGameStartHandler = (gameRoom: GameRoom) => {
        debugger
        setGameRoom(gameRoom);
        console.log("start game ..");
        setScreens({
            start: false,
            lobby: false,
            battle: true,
            score: false
        });
    }

    const onGameUpdateHandler = (gameRoom: GameRoom) => {
        setGameRoom(gameRoom);
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

    function getHeroPlayerState() {
        return gameRoom.filter(playerState => playerState.name === localUser.name)[0];
    }

    function getOpponentPlayerState() {
        return gameRoom.filter(playerState => playerState.name !== localUser.name)[0];
    }

    return (
        <div className="App">
            {screens.start && <WelcomeScreen onRegistrationHandler={onRegistrationHandler}/>}
            {screens.lobby && <LobbyScreen websocket={localUser.socket}/>}
            {screens.battle &&
                <GameScreen startTime={startTime}
                            socket={localUser.socket}
                            heroState={getHeroPlayerState()}
                            opponentState={getOpponentPlayerState()}
                            onGameOver={gameOverHandler}/>}
        </div>
    );
}

export type GameRoom = PlayerState[];

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
    READYSTATE = 'READYSTATE',
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
