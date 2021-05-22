import Player, {PLAYER_STATE} from "./player.js";
import {KEY_CODE_DOWN, KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine from "./enemiesEngine.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    startTime: Date.now(),
    lastTime: Date.now(),
    leftKeyPressed: false,
    rightKeyPressed: false,
    upKeyPressed: false,
    downKeyPressed: false,
    spaceKeyPressed: false,
    player: new Player("player", GAME_WIDTH / 2, GAME_HEIGHT - 50),
    bonus: [],
    score: 0,
    level: 1,
    over: false
}

export default class Game {
    constructor() {
        this.player = GAME_STATE.player;
        this.enemiesFleet = new EnemiesEngine();
    }

    update() {
        const currentTime = Date.now();
        const timePassed = (currentTime - GAME_STATE.lastTime) / 1000.0;

        this.player.update(timePassed)
        if (PLAYER_STATE.lives < 0) {
            GAME_STATE.over = true;
        }
        this.enemiesFleet.update(timePassed);
        for (let i = 0; i < GAME_STATE.bonus.length; i++) {
            GAME_STATE.bonus[i].update(timePassed);
        }

        if ((currentTime - GAME_STATE.startTime) / 1000.0 >= 10 * GAME_STATE.level) {
            GAME_STATE.level += 1;
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

export function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}
