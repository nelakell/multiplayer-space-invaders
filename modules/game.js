import Player, {PLAYER_STATE, removeLaser} from "./player.js";
import {PLAYER_MOVEMENTS, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine, {ENEMIES_STATE, removeEnemy} from "./enemiesEngine.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const GAME_STATE = {
    lastTime: Date.now(),
    bonus: []
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
