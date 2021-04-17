import Player, {move} from "./player.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_IMG = "./img/playerShip1_red.png";

export default class Game {
    constructor() {
        this.$container = document.querySelector(".game");
        this.$player = this.createPlayer("player")
        this.$container.appendChild(this.$player.player)
    }

    createPlayer(name) {
        return new Player(name, GAME_WIDTH / 2, GAME_HEIGHT - 50, PLAYER_IMG);
    }

    onKeyDown(e) {
        move(this.$player, e.keyCode);
    }
}
