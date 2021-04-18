import Laser from "./laser.js";
import {ENEMIES_STATE} from "./enemiesEngine.js";


const ENEMY_WIDTH = 20;
const ENEMY_HEIGHT = 30;
const ENEMY_IMG = "./img/enemyGreen1.png";

export default class Enemy {
    constructor(name, xPos, yPos) {
        const $container = document.querySelector(".game");
        this.initEnemy(name, xPos, yPos);
        $container.appendChild(this.enemy)
    }

    initEnemy(name, xPos, yPos) {
        this.enemy = document.createElement("img");
        this.enemy.src = ENEMY_IMG;
        this.enemy.className = name;
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.xPos = xPos;
        this.yPos = yPos;
        this.lasers = [];
        this.enemy.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    shoot() {
        const $container = document.querySelector(".game");
        const laser = new Laser(Date.now(), this.xPos - 5, this.yPos - 35);
        $container.appendChild(laser.laser);
        ENEMIES_STATE.lasers.push(laser);
        setPosition(laser.laser, laser.xPos, laser.yPos);
    }
}

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}