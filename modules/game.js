import Player from "./player.js";
import {KEY_CODE_DOWN, KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine from "./enemiesEngine.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    lastTime: Date.now(),
    leftKeyPressed: false,
    rightKeyPressed: false,
    upKeyPressed: false,
    downKeyPressed: false,
    spaceKeyPressed: false,
}

export default class Game {
    constructor() {
        this.player = new Player("player", GAME_WIDTH / 2, GAME_HEIGHT - 50);
        this.enemiesFleet = new EnemiesEngine();
        this.bonus = []
    }

    update() {
        const currentTime = Date.now();
        const timePassed = (currentTime - GAME_STATE.lastTime) / 1000.0;

        this.player.update(timePassed)
        this.enemiesFleet.update(this, timePassed);
        for (let i = 0; i < this.bonus.length; i++) {
            this.bonus[i].update(this, timePassed);
        }

        GAME_STATE.lastTime = currentTime;
    }

    onKeyDown(e) {
        if (e.keyCode === KEY_CODE_LEFT) {
            GAME_STATE.leftKeyPressed = true;
        } else if (e.keyCode === KEY_CODE_RIGHT) {
            GAME_STATE.rightKeyPressed = true;
        } else if (e.keyCode === KEY_CODE_UP) {
            GAME_STATE.upKeyPressed = true;
        } else if (e.keyCode === KEY_CODE_DOWN) {
            GAME_STATE.downKeyPressed = true;
        } else if (e.keyCode === PLAYER_SHOOT) {
            GAME_STATE.spaceKeyPressed = true;
        }
    }

    onKeyUp(e) {
        if (e.keyCode === KEY_CODE_LEFT) {
            GAME_STATE.leftKeyPressed = false;
        } else if (e.keyCode === KEY_CODE_RIGHT) {
            GAME_STATE.rightKeyPressed = false;
        } else if (e.keyCode === KEY_CODE_UP) {
            GAME_STATE.upKeyPressed = false;
        } else if (e.keyCode === KEY_CODE_DOWN) {
            GAME_STATE.downKeyPressed = false;
        } else if (e.keyCode === PLAYER_SHOOT) {
            GAME_STATE.spaceKeyPressed = false;
        }
    }

}


export function respectBoundaries(newPos, minPos, maxPos) {
    if (newPos < minPos) {
        return minPos;
    } else if (newPos > maxPos) {
        return maxPos;
    } else {
        return newPos;
    }
}

export function rectsIntersect(rect1, rect2) {
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}
