import {GAME_HEIGHT, removeBonus} from "./game.js";

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

    update(timePassed) {
        let yPos = this.yPos + timePassed * BONUS_MAX_SPEED;
        console.log("timepassed" + timePassed)
        console.log("max speed" + BONUS_MAX_SPEED)
        console.log("current pos" + this.yPos)
        console.log("new pos" + yPos)
        if (this.respectBoundaries(this.yPos + BONUS_HEIGHT, GAME_HEIGHT)) {
            console.log("move")
            this.yPos = yPos;
            this.setPosition(this.xPos, this.yPos);
        } else {
            console.log("remove")
            removeBonus(this);
        }
    }

    setPosition(x, y) {
        this.bonus.style.transform = `translate(${x}px, ${y}px)`;
    }

    respectBoundaries(v, max) {
        return v <= max;
    }

}