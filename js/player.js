export default class Player{
    constructor(name, xPos, yPos, img, speed, fireRate) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.img = img;
        this.speed = speed;
        this.fireRate = fireRate;

    }

    move(keyCode) {
        if(keyCode == 39){
            this.xPos += 5;
        }
        if (keyCode == 37){
            this.xPos -= 5;
        }
    }
}