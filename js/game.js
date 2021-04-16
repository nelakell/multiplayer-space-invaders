import Player from "./player";

export default class Game {
    constructor(width, height, playerX, playerY) {
        this.width = width;
        this.height = height;
        this.gameState = {
            playerX: playerX,
            playerY: playerY,
        };
    }

    createPlayer(gameContainer) {
        const player = new Player();
        const playerImg = document.createElement("img");
        playerImg.src = `${player.img}`;
    }
}
