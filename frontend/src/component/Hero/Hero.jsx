import './Hero.css';
import Spaceship from "./Spaceship";
import DamageModel from "./DamageModel";
import Lasers from "../Laser/Lasers";
import {
    GAME_HEIGHT,
    GAME_WIDTH,
    HERO_HEIGHT,
    HERO_SPEED,
    HERO_WIDTH,
    INVADER_HEIGHT,
    INVADER_WIDTH,
    LASER_HEIGHT,
    LASER_WIDTH
} from "../../constants";
import {createKey, ensureBoundaries, rectsIntersect} from "../../util/game";


const Hero = props => {
    console.log("hero")
    console.log(props)
    return (
        <div>
            <div className={"hero"}>
                <Spaceship xPos={props.heroState.xPos} yPos={props.heroState.yPos}/>
                <DamageModel xPos={props.heroState.xPos} yPos={props.heroState.yPos} lives={props.heroState.lives}/>
            </div>
            <Lasers items={props.heroState.lasers}/>
        </div>
    )
}

export function detectHeroHitsInvader(hero, invaders) {

    if (hero.lasers.length === 0) {
        return;
    }

    let remainingLasers = [];
    let remainingInvaders = [];

    for (let i = 0; i < hero.lasers.length; i++) {
        let laser = hero.lasers[i];
        const laserXMargin = 0;
        const laserYMargin = 0;

        const laserRect = {
            left: laser.xPos + laserXMargin,
            right: laser.xPos + laserXMargin + LASER_WIDTH,
            top: laser.yPos + laserYMargin,
            bottom: laser.yPos + laserYMargin + LASER_HEIGHT
        }
        let hit;
        for (let e = 0; e < invaders.length; e++) {
            let invader = invaders[e];
            const invaderRect = {
                left: invader.xPos,
                right: invader.xPos + INVADER_WIDTH,
                top: invader.yPos,
                bottom: invader.yPos + INVADER_HEIGHT
            }
            if (rectsIntersect(laserRect, invaderRect)) {
                hit = true;
            } else {
                remainingInvaders.push(invader);
            }
        }
        if (!hit) {
            remainingLasers.push(laser);
        }
    }

    return {
        remainingHeroLasers: remainingLasers, remainingInvaders
    };
}

export function moveHero(hero, keyControl) {
    let x = Number(hero.xPos);
    let y = Number(hero.yPos);
    if (keyControl.upKeyPressed) {
        y -= HERO_SPEED;
    }
    if (keyControl.downKeyPressed) {
        y += HERO_SPEED;
    }
    if (keyControl.leftKeyPressed) {
        x -= HERO_SPEED;
    }
    if (keyControl.rightKeyPressed) {
        x += HERO_SPEED;
    }
    return {
        ...hero,
        xPos: ensureBoundaries(x, 0, GAME_WIDTH - HERO_WIDTH),
        yPos: ensureBoundaries(y, 0, GAME_HEIGHT - HERO_HEIGHT)
    }
}

export function shoot(x, y) {
    return {
        key: 'hero_shot_' + createKey() + createKey(),
        source: 'hero',
        xPos: x + HERO_WIDTH / 2 - 5,
        yPos: y - 30
    }
}

export default Hero;