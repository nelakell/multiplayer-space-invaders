import React, {useRef} from 'react';
import './App.css';
import './WelcomeScreen.css';
import {useTranslation} from "react-i18next";
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function WelcomeScreen(props) {

    const {t, i18n} = useTranslation();

    const changeLanguageHandler = (e) => {
        const languageValue = e.target.value
        i18n.changeLanguage(languageValue);
    }

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
            showToast('error', t('error'), t('missing-fighter-choice'))
        }
    }

    return (
        <div className="player-registration">
            <div>
                <select className="custom-select" style={{width: 200}} onChange={changeLanguageHandler}>
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div className="container">
                <div className="row">
                    <label className='player-name-label'>{t('player-name-label')}</label>
                </div>
                <div className="row">
                    <InputText id="player-name"/>
                </div>
                <div className="row">
                    <label className='fighter-choice-label'>{t('fighter-choice-label')}</label>
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
                    <Button id={'entry-game'} onClick={register}>{t('enter-lobby')}</Button>
                </div>
            </div>
        </div>
    )
}


export default WelcomeScreen