import {GAME_HEIGHT, setPosition} from "./game.js";
import {PLAYER_STATE} from "./player.js";

const LASER_IMG = "img/laserRed07.png";
const LASER_MAX_SPEED = 300;
const LASER_HEIGHT = 20;

export default class Laser {
    constructor(xPos, yPos, source) {
        this.laser = document.createElement("img");
        this.laser.src = LASER_IMG;
        this.laser.className = "laser";
        this.source = source;
        this.xPos = xPos;
        this.yPos = yPos;
        this.laser.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    update(timePassed) {
        if (this.source === "player") {
            if (!this.moveUp(timePassed)) {
                this.remove(PLAYER_STATE.lasers, this);
            }
        } else if (this.source === "enemy") {
            if (!this.moveDown(timePassed)) {
                // TODO
                // this.remove();
            }
        }
    }

    moveUp(timePassed) {
        let yPos = this.yPos - timePassed * LASER_MAX_SPEED;
        if (this.respectBoundaries(yPos - LASER_HEIGHT, 0)) {
            this.yPos = yPos;
            setPosition(this.laser, this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    moveDown(timePassed) {
        let yPos = this.yPos + timePassed * LASER_MAX_SPEED;
        if (this.respectBoundaries(yPos + LASER_HEIGHT, GAME_HEIGHT)) {
            this.yPos = yPos;
            setPosition(this.laser, this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    remove(laserArr, laserObj) {
        const index = laserArr.indexOf(laserObj);
        if (index > -1) {
            laserArr.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(laserObj.laser);
        }
    }

    respectBoundaries(v, min) {
        return v >= min;
    }

}
