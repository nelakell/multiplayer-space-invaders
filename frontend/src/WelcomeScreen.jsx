import React from 'react';
import './App.css';
import './WelcomeScreen.css';
import {onRegister} from "./Registration";

function WelcomeScreen(props) {

    const register = () => {
        if (onRegister()) {
            props.onRegistrationHandler();
        }
    }

    return (
        <div className="player-registration">
            <label className='player-name-label'>Spielername:</label>
            <input type="text" id="player-name"/>
            <br/>
            <label className='fighter-choice-label'>Wählen sie einen Held aus:</label>
            <div className="fighter-choice">
                <input id="red" type="radio" name="fighter-choice" value="red"/>
                <label className="fighter-card red" htmlFor="red"/>
                <input id="blue" type="radio" name="fighter-choice" value="blue"/>
                <label className="fighter-card blue" htmlFor="blue"/>
                <input id="green" type="radio" name="fighter-choice" value="green"/>
                <label className="fighter-card green" htmlFor="green"/>
            </div>
            <br/>
            <input type="button" value="Lobby beitreten" id="entry-game" onClick={register}/>
        </div>
    )
}


export default WelcomeScreen