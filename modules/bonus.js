const BONUS_IMG = "img/laserRed07.png";

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

}