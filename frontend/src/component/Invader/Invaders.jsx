import Invader from './Invader';
import {GAME_WIDTH, HERO_HEIGHT, HERO_WIDTH, LASER_HEIGHT, LASER_WIDTH} from '../../constants';
import Lasers from "../Laser/Lasers";
import {createKey, rectsIntersect} from "../../util/game";

export const ENEMY_HORIZONTAL_PADDING = 40;
const INVADER_SPEED = 1;

function Invaders(props) {

    return (
        <div>
            {props.invaders.map(invader => (
                <Invader
                    key={invader.key}
                    xPos={invader.xPos}
                    yPos={invader.yPos}
                />
            ))}
            <Lasers items={props.lasers}/>
        </div>
    );
}


export const detectInvaderHitsHero = (heroState, lasers) => {
    let lives = Number(heroState.lives);
    let remainingLasers = []
    for (let i = 0; i < lasers.length; i++) {
        let laser = lasers[i];
        const laserXMargin = 15;
        const laserYMargin = 20;
        const laserRect = {
            left: laser.xPos + laserXMargin,
            right: laser.xPos + laserXMargin + LASER_WIDTH,
            top: laser.yPos + laserYMargin,
            bottom: laser.yPos + laserYMargin + LASER_HEIGHT
        }

        const heroRect = {
            left: heroState.xPos,
            right: heroState.xPos + HERO_WIDTH,
            top: heroState.yPos,
            bottom: heroState.yPos + HERO_HEIGHT
        }
        if (rectsIntersect(laserRect, heroRect)) {
            lives -= 1;
        } else {
            remainingLasers.push(laser)
        }
    }
    return {
        remainingHeroLives: lives,
        remainingInvadersLasers: remainingLasers
    };
}

export const spawnInvader = () => {
    const xPos = Math.random() * (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING);
    return {
        key: 'invader_' + createKey() + createKey(),
        xPos: xPos,
        yPos: 0,
        bonus: Math.random() < 0.5,
        xDir: getRandomDirection(),
        yDir: getRandomDirection()
    };
}

export const getRandomDirection = () => {
    const posOrNeg = Math.round(Math.random()) * 2 - 1;
    return Math.random() * INVADER_SPEED * posOrNeg;
}

export default Invaders;