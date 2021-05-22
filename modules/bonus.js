import {GAME_HEIGHT, GAME_STATE, rectsIntersect, setPosition} from "./game.js";

const BONUS_IMG = "img/bolt_gold.png";
const BONUS_MAX_SPEED = 100;
const BONUS_HEIGHT = 30;

export default class Bonus {

    constructor(xPos, yPos) {
        const $container = document.querySelector(".game");
        this.$bonus = document.createElement("img");
        this.$bonus.src = BONUS_IMG;
        this.$bonus.className = "bonus";
        this.xPos = xPos;
        this.yPos = yPos;
        this.$bonus.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
        $container.appendChild(this.$bonus);
    }

    update(timePassed) {
        this.detectHit();
        if (!this.move(timePassed)) {
            this.remove();
        }
    }

    move(timePassed) {
        let yPos = this.yPos + timePassed * BONUS_MAX_SPEED;
        if (this.respectBoundaries(this.yPos + BONUS_HEIGHT, GAME_HEIGHT)) {
            this.yPos = yPos;
            setPosition(this.$bonus, this.xPos, this.yPos);
            return true;
        }
        return false;
    }

    remove() {
        const index = GAME_STATE.bonus.indexOf(this);
        if (index > -1) {
            GAME_STATE.bonus.splice(index, 1);
            const $container = document.querySelector(".game");
            $container.removeChild(this.$bonus);
        }
    }

    detectHit() {
        const rect1 = this.$bonus.getBoundingClientRect();
        const rect2 = GAME_STATE.player.$player.getBoundingClientRect();
        if (rectsIntersect(rect1, rect2)) {
            // TODO: process bonus on player
            this.remove();
        }

    }

    respectBoundaries(v, max) {
        return v <= max;
    }

}