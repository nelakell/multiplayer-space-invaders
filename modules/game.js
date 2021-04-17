import Player, {move} from "./player.js";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export default class Game {
    constructor() {
        this.$container = document.querySelector(".game");
        this.$player = this.createPlayer("player")
        this.$container.appendChild(this.$player.player)
    }

    createPlayer(name) {
        return new Player(name, GAME_WIDTH / 2, GAME_HEIGHT - 50);
    }

    onKeyDown(e) {
        move(this.$player, e.keyCode);
    }
}
