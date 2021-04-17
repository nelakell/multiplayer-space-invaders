import {GAME_HEIGHT, GAME_STATE, GAME_WIDTH} from "./game.js";
import {PLAYER_STATE} from "./player.js";

const LASER_IMG = "img/laserRed07.png";
const LASER_MAX_SPEED = 300;
const LASER_HEIGHT = 20;

export default class Laser {
    constructor(id, xPos, yPos) {
        this.laser = document.createElement("img");
        this.laser.src = LASER_IMG;
        this.laser.className = "laser";
        this.laser.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.laser.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    move(time) {
        this.yPos -= time * LASER_MAX_SPEED;
        this.yPos = this.respectBoundaries(this.yPos, 0);
        this.setPosition(this.xPos, this.yPos);
    }

    setPosition(x, y) {
        this.laser.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(v, min) {
        if (v < min) {
            const $container = document.querySelector(".game");
            $container.removeChild(this.laser);
        } else {
            return v;
        }
    }
}


function createLaser($container, x, y) {
    const $element = document.createElement("img");
    $element.src = "img/laser-blue-1.png";
    $element.className = "laser";
    $container.appendChild($element);
    const laser = { x, y, $element };
    GAME_STATE.lasers.push(laser);
    const audio = new Audio("sound/sfx-laser1.ogg");
    audio.play();
    setPosition($element, x, y);
}