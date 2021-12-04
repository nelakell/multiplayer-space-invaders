import './Invader.css';
import enemyImg from '../../res/kenney/PNG/Enemies/enemyGreen1.png';
import {GAME_HEIGHT, GAME_WIDTH, INVADER_HEIGHT, INVADER_WIDTH} from '../../constants';
import {createKey, ensureBoundaries, rectsIntersect} from '../../screen/Game/GameScreen';
import {getRandomDirection} from './Invaders';


const INVADER_HORIZONTAL_SIZE = 40;
const INVADER_VERTICAL_SIZE = 30;

const Invader = props => {

    return (
        <div className={'invader'}>
            <img className={'invaderImg'} src={enemyImg} alt={'invader'}
                 style={{position: 'relative', top: props.yPos, left: props.xPos}}/>
        </div>
    );
}

function move(invader, otherInvaders) {

    let xd = invader.xDir;
    let yd = invader.yDir;
    let x = invader.xPos + xd;
    let y = invader.yPos + yd;

    const isXMoveValid = () => {
        return x === ensureBoundaries(x, 0, GAME_WIDTH - INVADER_HORIZONTAL_SIZE)
            && !doesInvaderIntersect(invader, otherInvaders);
    }

    const isYMoveValid = () => {
        return y === ensureBoundaries(y, 0, GAME_HEIGHT - INVADER_VERTICAL_SIZE)
            && !doesInvaderIntersect(invader, otherInvaders);
    }

    if (!isXMoveValid()) {
        xd = xd * -1;
        yd = getRandomDirection();
    }

    if (!isYMoveValid()) {
        xd = getRandomDirection();
        yd = yd * -1;
    }

    return {
        ...invader,
        xPos: x,
        yPos: y,
        xDir: xd,
        yDir: yd
    };
}

const getBoundingClientRect = invader => {
    return {
        left: invader.xPos,
        right: invader.xPos + INVADER_WIDTH - 5,
        top: invader.yPos,
        bottom: invader.yPos + INVADER_HEIGHT - 5
    };
}

const doesInvaderIntersect = (invader, otherInvaders) => {
    for (let i = 0; i < otherInvaders.length; i++) {
        const otherInvader = otherInvaders[i];
        if (otherInvader.key === invader.key) {
            continue;
        }
        const rect1 = getBoundingClientRect(invader);
        const rect2 = getBoundingClientRect(otherInvader);
        if (rectsIntersect(rect1, rect2)) {
            return true
        }
    }
    return false;
}

export const shot = (ls, x, y) => {
    return {
        key: 'invader_shot_' + createKey() + createKey(),
        xPos: x,
        yPos: y,
        source: 'invader'
    };
}

export const moveInvader = (invader, otherInvaders) => {
    return move(Object.assign({}, invader), otherInvaders);
}

export const invaderHasReloaded = () => {
    return Math.random() < 0.005;
}

export default Invader;