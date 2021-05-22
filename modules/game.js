import Player, {PLAYER_STATE, removeLaser} from "./player.js";
import {KEY_CODE_DOWN, KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine, {ENEMIES_STATE, removeEnemy} from "./enemiesEngine.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    lastTime: Date.now(),
    bonus: [],
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

    update() {
        const currentTime = Date.now();
        const timePassed = (currentTime - GAME_STATE.lastTime) / 1000.0;

        this.player.update(timePassed)
        this.enemiesFleet.updateEnemies();
        this.moveBonus(timePassed);
        this.checkForEnemyHit();
        this.checkForBonusHit();

        GAME_STATE.lastTime = currentTime;
    }

    checkForEnemyHit() {
        for (let i = 0; i < PLAYER_STATE.lasers.length; i++) {
            const laser = PLAYER_STATE.lasers[i];
            const rect1 = laser.laser.getBoundingClientRect();
            for (let j = 0; j < ENEMIES_STATE.enemies.length; j++) {
                const enemy = ENEMIES_STATE.enemies[j];
                const rect2 = enemy.$enemy.getBoundingClientRect();
                if (rectsIntersect(rect1, rect2)) {
                    removeLaser(laser);
                    const bonus = removeEnemy(enemy);
                    if (bonus !== undefined) {
                        GAME_STATE.bonus.push(bonus);
                    }
                }
            }
        }
    }

    moveBonus(timePassed) {
        const bonus = GAME_STATE.bonus;
        for (let i = 0; i < bonus.length; i++) {
            bonus[i].update(timePassed);
        }
    }

    checkForPlayerHit() {

    }

    checkForBonusHit() {
        for (let i = 0; i < GAME_STATE.bonus.length; i++) {
            const bonus = GAME_STATE.bonus[i];
            const rect1 = bonus.bonus.getBoundingClientRect();
            const rect2 = this.player.player.getBoundingClientRect();
            if (rectsIntersect(rect1, rect2)) {
                // TODO: process bonus on player
                removeBonus(bonus)
            }
        }
    }

}

export function removeBonus(bonusObj) {
    const index = GAME_STATE.bonus.indexOf(bonusObj);
    if (index > -1) {
        GAME_STATE.bonus.splice(index, 1);
        const $container = document.querySelector(".game");
        $container.removeChild(bonusObj.bonus);
    }
}

function rectsIntersect(rect1, rect2) {
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}
