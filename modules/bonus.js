import {GAME_HEIGHT, rectsIntersect} from "./game.js";

const BONUS_IMG = "img/bolt_gold.png";
const BONUS_MAX_SPEED = 100;
const BONUS_HEIGHT = 30;

export default class Bonus {

    constructor(xPos, yPos) {
        const $container = document.querySelector(".game");
        this.bonus = document.createElement("img");
        this.bonus.src = BONUS_IMG;
        this.bonus.className = "bonus";
        this.xPos = xPos;
        this.yPos = yPos;
        this.bonus.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
        $container.appendChild(this.bonus);
    }

    update(game, timePassed) {
        this.detectHit(game);
        if (!this.move(timePassed)) {
            this.remove(game);
        }
    }

    move(timePassed) {
        let yPos = this.yPos + timePassed * BONUS_MAX_SPEED;
        if (this.respectBoundaries(this.yPos + BONUS_HEIGHT, GAME_HEIGHT)) {
            this.yPos = yPos;
            this.setPosition(this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    remove(game) {
        const index = game.bonus.indexOf(this);
        if (index > -1) {
            game.bonus.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(this.bonus);
        }
    }

    detectHit(game) {
        const rect1 = this.bonus.getBoundingClientRect();
        const rect2 = game.player.player.getBoundingClientRect();
        if (rectsIntersect(rect1, rect2)) {
            // TODO: process bonus on player
            this.remove(game);
        }

    }

    setPosition(x, y) {
        this.bonus.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(v, max) {
        return v <= max;
    }

}