import {GAME_STATE, GAME_WIDTH} from "./game.js";

const LASER_IMG = "img/laserRed07.png";
const LASER_MAX_SPEED = 300;
const LASER_HEIGHT = 20;

export default class Laser {
    constructor(xPos, yPos) {
        this.laser = document.createElement("img");
        this.laser.src = LASER_IMG;
        this.laser.className = "laser";
        this.xPos = xPos;
        this.yPos = yPos;
        this.laser.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }
}

export function move(lasers, time) {
    for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        laser.yPos -= time * LASER_MAX_SPEED;
        // TODO
        // laser.yPos = respectBoundaries(laser.yPos, 0, GAME_WIDTH);
        setPosition(laser.laser, laser.xPos, laser.yPos);
    }
}

function respectBoundaries(v, min) {
    if (v < min) {
        // TODO: remove laser
    } else {
        return v;
    }
}

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}