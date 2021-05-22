import {GAME_HEIGHT, respectBoundaries, setPosition} from "./game.js";
import {PLAYER_STATE} from "./player.js";
import {ENEMIES_STATE} from "./enemiesEngine.js";

const LASER_IMG = "img/laserRed07.png";
const LASER_MAX_SPEED = 300;
const LASER_HEIGHT = 20;

export default class Laser {
    constructor(xPos, yPos, source) {
        this.$laser = document.createElement("img");
        this.$laser.src = LASER_IMG;
        this.$laser.className = source + "laser";
        this.xPos = xPos;
        this.yPos = yPos;
        this.$laser.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    update(timePassed) {
        if (this.$laser.className === "playerlaser") {
            if (!this.moveUp(timePassed)) {
                this.remove(PLAYER_STATE.lasers, this);
            }
        } else if (this.$laser.className === "enemylaser") {
            if (!this.moveDown(timePassed)) {
                this.remove(ENEMIES_STATE.lasers, this);
            }
        }
    }

    moveUp(timePassed) {
        let yPos = this.yPos - timePassed * LASER_MAX_SPEED;
        if (yPos === respectBoundaries(yPos, LASER_HEIGHT, undefined)) {
            this.yPos = yPos;
            setPosition(this.$laser, this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    moveDown(timePassed) {
        let yPos = this.yPos + timePassed * LASER_MAX_SPEED;
        if (yPos === respectBoundaries(yPos, undefined, GAME_HEIGHT - 3 * LASER_HEIGHT)) {
            this.yPos = yPos;
            setPosition(this.$laser, this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    remove(laserArr, laserObj) {
        const index = laserArr.indexOf(laserObj);
        if (index > -1) {
            laserArr.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(laserObj.$laser);
        }
    }

}
