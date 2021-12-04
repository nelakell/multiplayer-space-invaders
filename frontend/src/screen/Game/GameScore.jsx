const GameScore = (props) => {
    return (
        <div className={'battleinfo'}>
            <div>
                <label>{props.level} level</label>
            </div>
            <div>
                <label>{props.lives} lives</label>
            </div>
            <div>
                <label>{props.score} score</label>
            </div>
        </div>
    )
}

export default GameScore;