import playerImg from '../../res/kenney/PNG/playerShip1_red.png';
import './Player.css'


const Spaceship = (props) => {
    console.log("spaceship")
    console.log(props)
    return (
        <div className={'spaceship'}>
            <img className={'spaceshipImg'} src={playerImg} alt={'spaceship'}
                 style={{
                     position: 'relative',
                     top: props.yPos,
                     left: props.xPos
                 }}/>
        </div>
    );
}

export default Spaceship;