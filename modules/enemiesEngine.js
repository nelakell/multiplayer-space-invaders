import Enemy from "./enemy.js";
import {GAME_STATE, GAME_WIDTH} from "./game.js";

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;

export const ENEMIES_STATE = {
    enemies: [],
    lasers: [],
}

export default class EnemiesEngine {
    constructor(name) {
        const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
        for (let i = 0; i < 3; i++){
            const y = ENEMY_VERTICAL_PADDING + i * ENEMY_VERTICAL_SPACING;
            for (let j = 0; j < ENEMIES_PER_ROW; j++){
                const x = j * enemySpacing + ENEMY_HORIZONTAL_PADDING;
                const $enemy = new Enemy(name, x, y);
                const enemy = {
                    x,
                    y,
                    $enemy
                };
                ENEMIES_STATE.enemies.push(enemy);
            }
        }
    }

    updateEnemies() {
        const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
        const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

        for(let i = 0; i < ENEMIES_STATE.enemies.length; i++){
            const enemy = ENEMIES_STATE.enemies[i];
            const x = enemy.x + dx;
            const y = enemy.y + dy;
            setPosition(enemy.$enemy, x, y);
        }
    }

}

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}