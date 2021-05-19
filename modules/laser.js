import {PLAYER_STATE, removeLaser} from "./player.js";

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

    update(timePassed) {
        let yPos = this.yPos - timePassed * LASER_MAX_SPEED;
        if (this.respectBoundaries(this.yPos - LASER_HEIGHT, 0)) {
            this.yPos = yPos;
            this.setPosition(this.xPos, this.yPos);
        } else {
            removeLaser(this);
        }
    }

    setPosition(x, y) {
        this.laser.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(v, min) {
        return v >= min;
    }

}
