import './Laser.css'
import playerLaserImg from '../../res/kenney/PNG/Lasers/laserRed07.png';
import enemyLaserImg from '../../res/kenney/PNG/Lasers/laserGreen05.png';
import {GAME_HEIGHT} from '../../constants';
import {ensureBoundaries} from "../../util/game";

const LASER_HEIGHT = 40;

const Laser = (props) => {
    return (
        <div className={props.source + 'Laser'}>
            <img className={props.source + 'LaserImg'} src={props.source === 'invader' ? enemyLaserImg : playerLaserImg}
                 style={{position: 'relative', top: props.yPos, left: props.xPos}}
                 alt={props.source + 'laser'}/>
        </div>
    );
}

export const updateLaser = (laser) => {
    return laser.source === 'invader' ? move(laser, false) : move(laser, true);
}

const move = (laser, moveUp) => {
    const yPos = moveUp ? laser.yPos - 5 : laser.yPos +5;
    const min = moveUp ? 0 : LASER_HEIGHT;
    const max = moveUp ? GAME_HEIGHT : GAME_HEIGHT - LASER_HEIGHT
    if (yPos === ensureBoundaries(yPos, min, max)) {
        laser.yPos = yPos
        return laser
    }
}

export default Laser;