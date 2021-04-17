import Game from './modules/game.js';

const $game = new Game();

function onKeyDown(e) {
    $game.onKeyDown(e)
}

window.addEventListener("keydown", onKeyDown);
