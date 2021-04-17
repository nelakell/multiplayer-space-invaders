import Player, {move as movePlayer, shoot} from "./player.js";
import {move as moveLaser} from "./laser.js";
import {PLAYER_MOVEMENTS, PLAYER_SHOOT} from "./constants.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    lastTime: Date.now(),
    lasers: []
}

export default class Game {
    constructor() {
        this.$player = new Player("player", GAME_WIDTH / 2, GAME_HEIGHT - 50);
    }

    onKeyDown(e) {
        if (PLAYER_MOVEMENTS.includes(e.keyCode)) {
            movePlayer(this.$player, e.keyCode);
        } else if (PLAYER_SHOOT === e.keyCode) {
            shoot(this.$player);
        }
    }

    update() {
        const currentTime = Date.now();
        const timePassed = (currentTime - GAME_STATE.lastTime) / 1000.0;

        moveLaser(GAME_STATE.lasers, timePassed);

        GAME_STATE.lastTime = currentTime;
    }
}
