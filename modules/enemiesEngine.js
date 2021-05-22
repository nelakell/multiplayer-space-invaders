import Enemy from "./enemy.js";
import {GAME_STATE, GAME_WIDTH} from "./game.js";

export const ENEMY_HORIZONTAL_PADDING = 40;

export const ENEMIES_STATE = {
    enemies: [],
    lasers: [],
    spawning_cooldown: 0
}

export default class EnemiesEngine {

    update(timePassed) {
        if (ENEMIES_STATE.enemies.length < 3 * GAME_STATE.level && ENEMIES_STATE.spawning_cooldown <= 0) {
            spawnEnemy();
            this.resetSpawningCooldown();
        }
        for (let i = 0; i < ENEMIES_STATE.enemies.length; i++) {
            ENEMIES_STATE.enemies[i].update(timePassed);
        }
        for (let i = 0; i < ENEMIES_STATE.lasers.length; i++) {
            ENEMIES_STATE.lasers[i].update(timePassed);
        }
        ENEMIES_STATE.spawning_cooldown -= timePassed;
    }

    resetSpawningCooldown() {
        ENEMIES_STATE.spawning_cooldown = 3;
    }

}

function spawnEnemy() {
    const xPos = Math.random() * (GAME_WIDTH-ENEMY_HORIZONTAL_PADDING);
    const enemy = new Enemy(xPos, 0);
    ENEMIES_STATE.enemies.push(enemy);
    const $container = document.querySelector(".game");
    $container.appendChild(enemy.$enemy);
}
