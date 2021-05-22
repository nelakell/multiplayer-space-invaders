import {GAME_HEIGHT, GAME_STATE, GAME_WIDTH, rectsIntersect, respectBoundaries, setPosition} from "./game.js";
import Laser from "./laser.js";
import {ENEMIES_STATE} from "./enemiesEngine.js";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const PLAYER_IMG = "./img/playerShip1_red.png";
const SHOOT_COOLDOWN = 1

export const PLAYER_STATE = {
    lives: 3,
    lasers: [],
    cooldown: 0
}

export default class Player {
    constructor(name, xPos, yPos) {
        const $container = document.querySelector(".game");
        this.initPlayer(name, xPos, yPos);
        $container.appendChild(this.$player)
    }

    initPlayer(name, xPos, yPos) {
        this.$player = document.createElement("div");
        this.$spaceship = document.createElement("img");
        this.$spaceship.src = PLAYER_IMG;
        this.$spaceship.className = "spaceship";
        this.$player.appendChild(this.$spaceship)
        this.$damage = document.createElement("img");
        this.$damage.src = PLAYER_IMG;
        this.$damage.className = "damage";
        this.$player.appendChild(this.$damage)
        this.$player.className = "player";
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.$player.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    move() {
        if (GAME_STATE.leftKeyPressed) {
            this.xPos -= 5;
        } else if (GAME_STATE.rightKeyPressed) {
            this.xPos += 5;
        } else if (GAME_STATE.upKeyPressed) {
            this.yPos -= 5;
        } else if (GAME_STATE.downKeyPressed) {
            this.yPos += 5;
        }
        this.xPos = respectBoundaries(this.xPos, PLAYER_WIDTH, GAME_WIDTH - PLAYER_WIDTH);
        this.yPos = respectBoundaries(this.yPos, 0, GAME_HEIGHT - PLAYER_HEIGHT);
        setPosition(this.$player, this.xPos, this.yPos)
    }

    shoot(timepassed) {
        PLAYER_STATE.cooldown -= timepassed;
        if (GAME_STATE.spaceKeyPressed && PLAYER_STATE.cooldown <= 0) {
            const $container = document.querySelector(".game");
            const laser = new Laser(this.xPos, this.yPos, "player");
            $container.appendChild(laser.laser);
            PLAYER_STATE.lasers.push(laser);
            PLAYER_STATE.cooldown += SHOOT_COOLDOWN;
        } else if (PLAYER_STATE.cooldown < 0) {
            PLAYER_STATE.cooldown = 0;
        }
    }

    update(timePassed) {
        this.detectHit();
        this.move();
        this.shoot(timePassed);
        for (let i = 0; i < PLAYER_STATE.lasers.length; i++) {
            PLAYER_STATE.lasers[i].update(timePassed, true);
        }
    }

    detectHit() {
        for (let i = 0; i < ENEMIES_STATE.lasers.length; i++) {
            const laser = ENEMIES_STATE.lasers[i];
            const rect1 = laser.laser.getBoundingClientRect();
            const rect2 = this.$player.getBoundingClientRect();
            if (rectsIntersect(rect1, rect2)) {
                this.processHit();
                laser.remove(ENEMIES_STATE.lasers, laser);
            }
        }
    }

    processHit() {
        if (PLAYER_STATE.lives === 3) {
            this.$damage.src = "./img/playerShip1_damage1.png"
        } else if (PLAYER_STATE.lives === 2) {
            this.$damage.src = "./img/playerShip1_damage2.png"
        } else if (PLAYER_STATE.lives === 1) {
            this.$damage.src = "./img/playerShip1_damage3.png"
        }
        PLAYER_STATE.lives -= 1;
    }

}
