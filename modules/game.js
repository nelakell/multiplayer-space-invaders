import Player from "./player.js";
import {PLAYER_MOVEMENTS, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine from "./enemiesEngine.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    lastTime: Date.now()
}

export default class Game {
    constructor() {
        this.player = new Player("player", GAME_WIDTH / 2, GAME_HEIGHT - 50);
        this.enemiesFleet = new EnemiesEngine();
    }

    onKeyDown(e) {
        if (PLAYER_MOVEMENTS.includes(e.keyCode)) {
            this.player.move(e.keyCode)
        } else if (PLAYER_SHOOT === e.keyCode) {
            this.player.shoot();
        }
    }

    update() {
        const currentTime = Date.now();
        const timePassed = (currentTime - GAME_STATE.lastTime) / 1000.0;

        this.player.update(timePassed)
        this.enemiesFleet.updateEnemies();

        GAME_STATE.lastTime = currentTime;
    }
}
