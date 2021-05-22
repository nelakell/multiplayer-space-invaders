import Enemy from "./enemy.js";
import {GAME_WIDTH} from "./game.js";

const ENEMIES_PER_ROW = 10;
export const ENEMY_ROWS = 3;
export const ENEMY_HORIZONTAL_PADDING = 40;
export const ENEMY_VERTICAL_SPACING = 80;

export const ENEMIES_STATE = {
    enemies: []
}

export default class EnemiesEngine {
    constructor() {
        createEnemies();
    }

    update(timepassed) {
        for (let i = 0; i < ENEMIES_STATE.enemies.length; i++) {
            let enemy = ENEMIES_STATE.enemies[i];
            enemy.update();
            const lasers = enemy.lasers;
            for (let l = 0; l < lasers.length; l++) {
                const laser = lasers[i];
                if (laser) {
                    laser.update(timepassed);
                }
            }
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
