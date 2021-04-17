import Game from './modules/game.js';

const $game = new Game();

function onKeyDown(e) {
    $game.onKeyDown(e)
}

function update() {
    $game.update();
    window.requestAnimationFrame(update);
}

window.addEventListener("keydown", onKeyDown);
window.requestAnimationFrame(update);
