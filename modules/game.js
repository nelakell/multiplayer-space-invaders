import Player from "./player.js";
import {PLAYER_MOVEMENTS, PLAYER_SHOOT} from "./constants.js";
import EnemiesEngine from "./enemiesEngine.js";
import {PLAYER_STATE} from "./player.js";
import {removeLaser} from "./player.js";
import {ENEMIES_STATE} from "./enemiesEngine.js";
import {removeEnemy} from "./enemiesEngine.js";
import {move} from "./bonus.js"

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
        // TO-DO: bonusMove()
        this.checkForEnemyHit();

        GAME_STATE.lastTime = currentTime;
    }

    checkForEnemyHit(){
        for(let i =0; i < PLAYER_STATE.lasers.length; i++){
            const laser = PLAYER_STATE.lasers[i];
            const rect1 = laser.laser.getBoundingClientRect();
            for(let j = 0; j < ENEMIES_STATE.enemies.length; j++){
                const enemy = ENEMIES_STATE.enemies[j];
                const rect2 = enemy.$enemy.getBoundingClientRect();
                if(rectsIntersect(rect1, rect2)){
                    removeLaser(laser);
                    removeEnemy(enemy);
                }
            }
        }
    }

    checkForPlayerHit(){

    }

    checkForBonusHit(){

    }

}

function rectsIntersect(rect1, rect2){
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}
