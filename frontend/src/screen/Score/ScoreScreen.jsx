import '../../main.css';
import PlayerScore from './PlayerScore';

const ScoreScreen = (props) => {
    return (
        <div className='endScreen'>
            <PlayerScore name={props.name} score={props.score} onRestart={props.onRestart}/>
        </div>
    );
}

export default ScoreScreen;