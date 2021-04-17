export default class Player {
    constructor(name, xPos, yPos, img) {
        this.player = document.createElement("img");
        this.player.src = img;
        this.player.className = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.player.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
    }

}
