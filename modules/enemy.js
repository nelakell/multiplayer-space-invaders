import {ENEMIES_STATE, ENEMY_HORIZONTAL_PADDING, ENEMY_ROWS, ENEMY_VERTICAL_SPACING} from "./enemiesEngine.js";
import Laser from "./laser.js";
import {PLAYER_STATE} from "./player.js";
import {GAME_STATE, rectsIntersect, respectBoundaries} from "./game.js";
import Bonus from "./bonus.js";

const ENEMY_IMG = "./img/enemyGreen1.png";

export default class Enemy {
    constructor(xPos, yPos) {
        this.$enemy = document.createElement("img");
        this.$enemy.src = ENEMY_IMG;
        this.$enemy.className = "enemy";
        this.initXPos = xPos;
        this.initYPos = yPos;
        this.xPos = xPos;
        this.yPos = yPos;
        this.lasers = [];
        this.bonus = Math.random() < 0.5;
        this.$enemy.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    update(game) {
        this.detectHit(game)
        this.move();
        if (Math.random() < 0.001) {
            this.shoot()
        }
    }

    move() {
        const dx = Math.sin(GAME_STATE.lastTime / 250.0);
        const dy = Math.cos(GAME_STATE.lastTime / 250.0);
        this.xPos = respectBoundaries(this.xPos += dx, 0 + this.initXPos, ENEMY_HORIZONTAL_PADDING + this.initXPos);
        this.yPos = respectBoundaries(this.yPos += dy, 0 + this.initYPos, (ENEMY_ROWS * ENEMY_VERTICAL_SPACING) + this.initYPos);
        this.setPosition(this.$enemy, this.xPos, this.yPos)
    }

    shoot() {
        const $container = document.querySelector(".game");
        const laser = new Laser(this.xPos, this.yPos, "enemy");
        $container.appendChild(laser.laser);
        this.lasers.push(laser);
    }

    detectHit(game) {
        for (let i = 0; i < PLAYER_STATE.lasers.length; i++) {
            const laser = PLAYER_STATE.lasers[i];
            const rect1 = laser.laser.getBoundingClientRect();
            const rect2 = this.$enemy.getBoundingClientRect();
            if (rectsIntersect(rect1, rect2)) {
                laser.remove(PLAYER_STATE.lasers, laser);
                const bonus = this.remove();
                console.log(bonus)
                console.log(game)
                if (bonus !== undefined) {
                    game.bonus.push(bonus);
                }
            }
        }
    }

    remove() {
        const index = ENEMIES_STATE.enemies.indexOf(this);
        let bonus = undefined;
        if (index > -1) {
            if (this.bonus) {
                bonus = new Bonus(this.xPos, this.yPos);
            }
            ENEMIES_STATE.enemies.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(this.$enemy);
        }
        return bonus;
    }

    setPosition($el, x, y) {
        $el.style.transform = `translate(${x}px, ${y}px)`;
    }

}
