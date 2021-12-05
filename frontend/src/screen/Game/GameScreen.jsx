import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import './GameScreen.css';
import Player from "../../component/Player/Player";
import GameScore from "./GameScore";

function GameScreen(props) {

    const heroState = props.heroState;

    let keyControl = {};

    const keyDownHandler = useCallback((event) => {

        let playerIsActing = false;

        if (event.key === "ArrowUp") {
            playerIsActing = true;
            keyControl = {...keyControl, upKeyPressed: true}
        }
        if (event.key === "ArrowDown") {
            playerIsActing = true;
            keyControl = {...keyControl, downKeyPressed: true}
        }
        if (event.key === "ArrowLeft") {
            playerIsActing = true;
            keyControl = {...keyControl, leftKeyPressed: true}
        }
        if (event.key === "ArrowRight") {
            playerIsActing = true;
            keyControl = {...keyControl, rightKeyPressed: true}
        }
        if (event.key === " ") {
            playerIsActing = true;
            keyControl = {...keyControl, shootKeyPressed: true}
        }

        if (playerIsActing) {
            props.socket.sendHeroUpdateMessage(keyControl);
        }

    }, []);

    const keyUpHandler = useCallback((event) => {

        let playerIsActing = false;

        if (event.key === "ArrowUp") {
            playerIsActing = true;
            keyControl = {...keyControl, upKeyPressed: false}
        }
        if (event.key === "ArrowDown") {
            playerIsActing = true;
            keyControl = {...keyControl, downKeyPressed: false}
        }
        if (event.key === "ArrowLeft") {
            playerIsActing = true;
            keyControl = {...keyControl, leftKeyPressed: false}
        }
        if (event.key === "ArrowRight") {
            playerIsActing = true;
            keyControl = {...keyControl, rightKeyPressed: false}
        }
        if (event.key === " ") {
            playerIsActing = true;
            keyControl = {...keyControl, shootKeyPressed: false}
        }

        if (playerIsActing) {
            props.socket.sendHeroUpdateMessage(keyControl);
        }

    }, []);

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        return () => {
            document.removeEventListener('keydown', keyDownHandler, false);
            document.removeEventListener('keyup', keyUpHandler, false);
        };
    }, [keyDownHandler, keyUpHandler]);

    return (
        <div className={'game'}>
            <Player hero={true} playerState={heroState}/>
            {/*<Player hero={false} state={props.opponentState}/>*/}
            {/* TODO enable invaders */}
            {/*<Invaders invaders={invaderState.invaders}*/}
            {/*          lasers={invaderState.lasers}*/}
            {/*          level={heroState.level}/>*/}
            <GameScore score={heroState.gameState.score} lives={heroState.gameState.lives}
                       level={heroState.gameState.level}/>
        </div>
    )
}

export function ensureBoundaries(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function rectsIntersect(rect1, rect2) {
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}

export const createKey = () => {
    return Date.now() + '_' + Math.floor(Math.random() * (100000 - 1 + 1) + 1)
}

export default GameScreen;