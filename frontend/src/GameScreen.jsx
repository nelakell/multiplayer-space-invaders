import React from 'react';
import './App.css';
import './GameScreen.css';

function GameScreen() {
    return (
        <div>
            <label>Game</label>
            <canvas id={"game"} width={"768"} height={400}>
                Space Invaders
            </canvas>
        </div>
    )
}

export default GameScreen;