const ENEMY_IMG = "./img/enemyGreen1.png";

export default class Enemy {
    constructor(xPos, yPos) {
        this.initEnemy(xPos, yPos);
    }

    initEnemy(xPos, yPos) {
        this.$enemy = document.createElement("img");
        this.$enemy.src = ENEMY_IMG;
        this.$enemy.className = "enemy";
        this.xPos = xPos;
        this.yPos = yPos;
        this.lasers = [];
        this.$enemy.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

}
