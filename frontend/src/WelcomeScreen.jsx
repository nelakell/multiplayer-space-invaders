import React, {useRef} from 'react';
import './App.css';
import './WelcomeScreen.css';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function WelcomeScreen(props) {

    const toast = useRef(null);

    const showToast = (severityValue, summaryValue, detailValue) => {
        toast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});
    }

    const register = () => {
        let fighterChoice = document.getElementsByName('fighter-choice');
        let fighter;
        for (let i of fighterChoice) {
            if (i.checked) {
                fighter = i.id;
            }
        }

        if (fighter) {
            props.onRegistrationHandler(document.getElementById("player-name").value, fighter);
        } else {
            showToast('error', 'Fehler', 'Sie müssen ein Raumschiff auswählen um fortzufahren.')
        }
    }

    return (
        <div className="player-registration">

            <div className="container">
                <div className="row">
                    <label className='player-name-label'>Spielername:</label>
                </div>
                <div className="row">
                    <InputText id="player-name"/>
                </div>
                <div className="row">
                    <label className='fighter-choice-label'>Wählen sie einen Held aus:</label>
                    <div className="fighter-choice">
                        <input id="red" type="radio" name="fighter-choice" value="red"/>
                        <label className="fighter-card red" htmlFor="red"/>
                        <input id="blue" type="radio" name="fighter-choice" value="blue"/>
                        <label className="fighter-card blue" htmlFor="blue"/>
                        <input id="green" type="radio" name="fighter-choice" value="green"/>
                        <label className="fighter-card green" htmlFor="green"/>
                    </div>
                </div>
                <div className="row">
                    <Toast ref={toast}/>
                    <Button id={'entry-game'} onClick={register}>Lobby beitreten</Button>
                </div>
            </div>
        </div>
    )
}


export default WelcomeScreen