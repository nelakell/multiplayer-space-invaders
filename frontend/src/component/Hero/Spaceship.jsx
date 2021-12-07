import redFighter from '../../res/kenney/PNG/playerShip1_red.png';
import blueFighter from '../../res/kenney/PNG/playerShip1_blue.png';
import greenFighter from '../../res/kenney/PNG/playerShip1_green.png';
import './Hero.css'


const playerImgFighter = props => {
    let fighterColour = props.fighter;
    if (fighterColour=="red") {
        return redFighter;
    }
    else if (fighterColour=="blue") {
        return blueFighter
    }
    else if (fighterColour=="green"){
        return greenFighter;
    }
};


const Spaceship = (props) => {
    console.log("spaceship");
    console.log(props);
    return (
        <div className={'spaceship'}>
            <img className={'spaceshipImg'} src={playerImgFighter(props)} alt={'spaceship'}
                 style={{
                     position: 'relative',
                     top: props.yPos,
                     left: props.xPos
                 }}/>
        </div>
    );
};

export default Spaceship;
