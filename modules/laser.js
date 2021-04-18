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
        let yPos = this.yPos - time * LASER_MAX_SPEED;
        if (this.respectBoundaries(this.yPos, 0)) {
            this.yPos = yPos;
            this.setPosition(this.xPos, this.yPos);
            return true;
        } else {
            const $container = document.querySelector(".game");
            $container.removeChild(this.laser);
            return false;
        }
    }

    setPosition(x, y) {
        this.laser.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(v, min) {
        return v >= min;
    }
}
