const PlayerScore = (props) => {
    return (
        <div className={'playerScore'}>
            <h3>Game Over !</h3>
            <label>{props.name}, deine Punktzahl diese Runde: {props.score}</label>
            <h3>Highscores:</h3>
            <button className='restartBtn' onClick={props.onRestart}>Spiel von vorne beginnen!</button>
        </div>
    )
}

export default PlayerScore;