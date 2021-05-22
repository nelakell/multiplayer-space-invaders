import {ENEMIES_STATE} from "./enemiesEngine.js";
import Laser from "./laser.js";
import {PLAYER_STATE} from "./player.js";
import {GAME_HEIGHT, GAME_STATE, GAME_WIDTH, rectsIntersect, respectBoundaries, setPosition} from "./game.js";
import Bonus from "./bonus.js";

const ENEMY_HORIZONTAL_SIZE = 40;
const ENEMY_VERTICAL_SIZE = 30;
const ENEMY_IMG = "./img/enemyGreen1.png";

export default class Enemy {
    constructor(xPos, yPos) {
        this.$enemy = document.createElement("img");
        this.$enemy.src = ENEMY_IMG;
        this.$enemy.className = "enemy";
        this.xPos = xPos;
        this.yPos = yPos;
        this.bonus = Math.random() < 0.5;
        this.xDir = this.getRandomDirection();
        this.yDir = this.getRandomDirection();
    }

    getRandomDirection() {
        const directionSpeed = 3;
        const positiveOrNegative = Math.round(Math.random()) * 2 - 1;
        return Math.random() * directionSpeed * positiveOrNegative;
    }

    update(timePassed) {
        this.detectHit();
        this.detectCollision();
        this.move(timePassed);
        this.shoot();
    }

    move() {
        const xPos = this.xPos + this.xDir
        if (xPos === respectBoundaries(xPos, 0, GAME_WIDTH - ENEMY_HORIZONTAL_SIZE)) {
            this.xPos += this.xDir;
        }else {
            this.xDir *= -1;
            this.yDir= this.getRandomDirection();
        }
        const yPos = this.yPos + this.yDir
        if (yPos === respectBoundaries(yPos, 0, GAME_HEIGHT - ENEMY_VERTICAL_SIZE)) {
            this.yPos += this.yDir;
        }else{
            this.xDir = this.getRandomDirection();
            this.yDir *= -1;
        }
        setPosition(this.$enemy, this.xPos, this.yPos)
    }

    shoot() {
        if (Math.random() < 0.01 * GAME_STATE.level) {
            const $container = document.querySelector(".game");
            const laser = new Laser(this.xPos, this.yPos, "enemy");
            $container.appendChild(laser.$laser);
            ENEMIES_STATE.lasers.push(laser);
        }
    }

    detectHit() {
        for (let i = 0; i < PLAYER_STATE.lasers.length; i++) {
            const laser = PLAYER_STATE.lasers[i];
            const rect1 = laser.$laser.getBoundingClientRect();
            const rect2 = this.$enemy.getBoundingClientRect();
            if (rectsIntersect(rect1, rect2)) {
                laser.remove(PLAYER_STATE.lasers, laser);
                const bonus = this.bonus
                this.remove();
                GAME_STATE.score += 50 * GAME_STATE.level;
                if (bonus) {
                    GAME_STATE.bonus.push(new Bonus(this.xPos, this.yPos));
                }
            }
        }
    }

    detectCollision() {
        for (let i = 0; i < ENEMIES_STATE.enemies.length; i++) {
            const enemy = ENEMIES_STATE.enemies[i];
            if(enemy === this){
                continue;
            }
            const rect1 = enemy.$enemy.getBoundingClientRect();
            const rect2 = this.$enemy.getBoundingClientRect();
            if (rectsIntersect(rect1, rect2)) {
                this.xDir *= -1;
                this.yDir *= -1;
            }
        }
    }

    remove() {
        const index = ENEMIES_STATE.enemies.indexOf(this);
        if (index > -1) {
            ENEMIES_STATE.enemies.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(this.$enemy);
        }
    }

}
