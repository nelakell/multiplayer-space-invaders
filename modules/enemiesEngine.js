import Enemy from "./enemy.js";
import Bonus from "./bonus.js";
import {GAME_HEIGHT, GAME_STATE, GAME_WIDTH} from "./game.js";

const ENEMIES_PER_ROW = 10;
const ENEMY_ROWS = 3;
const ENEMY_HORIZONTAL_PADDING = 40;
const ENEMY_VERTICAL_SPACING = 80;

export const ENEMIES_STATE = {
    enemies: []
}

export default class EnemiesEngine {
    constructor() {
        createEnemies();
    }

    updateEnemies() {
        const dx = Math.sin(GAME_STATE.lastTime / 250.0);
        const dy = Math.cos(GAME_STATE.lastTime / 250.0);

        for(let i =0; i < ENEMIES_STATE.enemies.length; i++) {
            let enemy = ENEMIES_STATE.enemies[i];
            enemy.xPos = this.respectBoundaries(enemy.xPos += dx, 0 + enemy.initXPos, ENEMY_HORIZONTAL_PADDING + enemy.initXPos);
            enemy.yPos = this.respectBoundaries(enemy.yPos += dy, 0 + enemy.initYPos, (ENEMY_ROWS * ENEMY_VERTICAL_SPACING) + enemy.initYPos);
            this.setPosition(enemy.$enemy, enemy.xPos, enemy.yPos)
        }
    }

    setPosition($el, x, y) {
        $el.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(newPos, minPos, maxPos) {
        if (newPos < minPos) {
            return minPos;
        } else if (newPos > maxPos) {
            return maxPos;
        } else {
            return newPos;
        }
    }

}

function createEnemies() {
    const $container = document.querySelector(".game");
    const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
    for (let i = 0; i < ENEMY_ROWS; i++) {
        const y = i * ENEMY_VERTICAL_SPACING;
        for (let j = 0; j < ENEMIES_PER_ROW; j++) {
            const x = j * enemySpacing;
            const enemy = new Enemy(x, y);
            ENEMIES_STATE.enemies.push(enemy);
            enemy.$enemy.style.transform = `translate(${x}px, ${y}px)`;
            $container.appendChild(enemy.$enemy)
        }
    }
}

export function removeEnemy(enemyObj) {
    const index = ENEMIES_STATE.enemies.indexOf(enemyObj);
    let bonus = undefined;
    if (index > -1) {
        if(enemyObj.bonus){
            bonus = new Bonus(enemyObj.xPos, enemyObj.yPos);
        }
        ENEMIES_STATE.enemies.splice(index, 1);
        const $container = document.querySelector(".game");
        $container.removeChild(enemyObj.$enemy);
    }
    return bonus;
}