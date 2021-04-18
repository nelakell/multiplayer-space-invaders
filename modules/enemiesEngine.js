import Enemy from "./enemy.js";
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
        const $container = document.querySelector(".game");
        this.$enemiesContainer = document.createElement("div");
        this.xPos = 0;
        this.yPos = 0;
        createEnemies(this.$enemiesContainer);
        $container.appendChild(this.$enemiesContainer)
    }

    updateEnemies() {
        const dx = Math.sin(GAME_STATE.lastTime / 1000.0);
        const dy = Math.cos(GAME_STATE.lastTime / 1000.0);

        this.xPos = respectBoundaries(this.xPos += dx, 0, ENEMY_HORIZONTAL_PADDING);
        this.yPos = respectBoundaries(this.yPos += dy, 0, (GAME_HEIGHT / 3 * 2) - (ENEMY_ROWS * ENEMY_VERTICAL_SPACING));
        this.setPosition(this.$enemiesContainer, this.xPos, this.yPos)
    }

    setPosition($el, x, y) {
        $el.style.transform = `translate(${x}px, ${y}px)`;
    }

}

function createEnemies($enemiesContainer) {
    const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
    for (let i = 0; i < ENEMY_ROWS; i++) {
        const y = i * ENEMY_VERTICAL_SPACING;
        for (let j = 0; j < ENEMIES_PER_ROW; j++) {
            const x = j * enemySpacing;
            const enemy = new Enemy(x, y);
            ENEMIES_STATE.enemies.push(enemy);
            $enemiesContainer.appendChild(enemy.$enemy)
        }
    }
}

function respectBoundaries(v, min, max) {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    } else {
        return v;
    }
}
