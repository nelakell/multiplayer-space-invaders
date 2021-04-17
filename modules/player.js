import * as Constants from "./constants.js";

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

export function move($player, keyCode) {
    switch (keyCode) {
        case Constants.KEY_CODE_LEFT:
            $player.xPos -= 5;
            break;
        case Constants.KEY_CODE_RIGHT:
            $player.xPos += 5;
            break;
        case Constants.KEY_CODE_UP:
            $player.yPos -= 5;
            break;
        case Constants.KEY_CODE_DOWN:
            $player.yPos += 5;
            break;
    }
    setPosition($player.player, $player.xPos, $player.yPos)
}

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}
