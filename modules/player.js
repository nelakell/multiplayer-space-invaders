import {GAME_HEIGHT, GAME_STATE, GAME_WIDTH, respectBoundaries, setPosition} from "./game.js";
import Laser from "./laser.js";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const PLAYER_IMG = "./img/playerShip1_red.png";
const SHOOT_COOLDOWN = 1

export const PLAYER_STATE = {
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
        this.$player = document.createElement("img");
        this.$player.src = PLAYER_IMG;
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
            console.log("shoot")
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
            console.log("update laser")
            PLAYER_STATE.lasers[i].update(timePassed, true);
        }
    }

    detectHit() {
        // TODO
    }

}
