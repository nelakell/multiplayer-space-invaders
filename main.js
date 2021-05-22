import Game from './modules/game.js';

const $game = new Game();

function onKeyDown(e) {
    $game.onKeyDown(e)
}

function onKeyUp(e) {
    $game.onKeyUp(e)
}

function update() {
    $game.update();
    window.requestAnimationFrame(update);
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
