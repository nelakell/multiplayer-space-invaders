import Game, {GAME_HEIGHT, GAME_STATE, GAME_WIDTH} from './modules/game.js';
import Player from "./modules/player.js";

document.getElementById("startGame").onclick = loadGame;

function restart() {
    window.location.reload(true);
}

function loadGame() {
    document.getElementById("playerNameForm").style.display = 'none';
    document.getElementById("endScreen").style.display = 'none';
    document.getElementById("game").style.display = 'flex';
    const $game = new Game();

    function onKeyDown(e) {
        $game.onKeyDown(e)
    }

    function onKeyUp(e) {
        $game.onKeyUp(e)
    }

    function update() {
        if (GAME_STATE.over) {
            document.getElementById("game").style.display = 'none';
            document.getElementById("endScreen").style.display = 'flex';
            document.getElementById("playerScore").textContent = "Game Over! Your score is: " + GAME_STATE.score;
            document.getElementById("restartBtn").onclick = restart;

        } else {
            $game.update();
            window.requestAnimationFrame(update);
        }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    if (GAME_STATE.over === false) {
        window.requestAnimationFrame(update);
    }
}

