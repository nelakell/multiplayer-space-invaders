import * as Constants from "./constants.js";
import {GAME_HEIGHT, GAME_WIDTH} from "./game.js";
import Laser from "./laser.js";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const PLAYER_IMG = "./img/playerShip1_red.png";

export const PLAYER_STATE = {
    lasers: []
}

export default class Player {
    constructor(name, xPos, yPos) {
        const $container = document.querySelector(".game");
        this.initPlayer(name, xPos, yPos);
        $container.appendChild(this.player)
    }

    initPlayer(name, xPos, yPos) {
        this.player = document.createElement("img");
        this.player.src = PLAYER_IMG;
        this.player.className = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.player.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

    move(keyCode) {
        switch (keyCode) {
            case Constants.KEY_CODE_LEFT:
                this.xPos -= 5;
                break;
            case Constants.KEY_CODE_RIGHT:
                this.xPos += 5;
                break;
            case Constants.KEY_CODE_UP:
                this.yPos -= 5;
                break;
            case Constants.KEY_CODE_DOWN:
                this.yPos += 5;
                break;
        }
        this.xPos = respectBoundaries(this.xPos, PLAYER_WIDTH, GAME_WIDTH - PLAYER_WIDTH);
        this.yPos = respectBoundaries(this.yPos, 0, GAME_HEIGHT - PLAYER_HEIGHT);
        setPosition(this.player, this.xPos, this.yPos)
    }

    shoot() {
        const $container = document.querySelector(".game");
        const laser = new Laser(Date.now(), this.xPos, this.yPos);
        $container.appendChild(laser.laser);
        PLAYER_STATE.lasers.push(laser);
        setPosition(laser.laser, laser.xPos, laser.yPos);
    }

    update(timePassed) {
        const lasers = PLAYER_STATE.lasers;
        for (let i = 0; i < lasers.length; i++) {
            lasers[i].update(timePassed);
        }
    }
}

export function removeLaser(laserObj) {
    const index = PLAYER_STATE.lasers.indexOf(laserObj);
    if (index > -1) {
        PLAYER_STATE.lasers.splice(index, 1);
        const $container = document.querySelector(".game");
        $container.removeChild(laserObj.laser);
    }
}

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function respectBoundaries(v, min, max) {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    } else {
        return v;
    }
}
