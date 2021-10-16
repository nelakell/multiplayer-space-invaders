import React, {useState} from 'react';
import './App.css';
import WelcomeScreen from "./WelcomeScreen";
import LobbyScreen from "./LobbyScreen";

function App() {

    const [screens, setScreens] = useState({
        startScreen: true,
        lobbyScreen: false,
        battleScreen: false,
        scoreScreen: false
    });

    const onRegistrationHandler = () => {
        setScreens(() => {
            return {
                startScreen: false,
                lobbyScreen: true,
                battleScreen: false,
                scoreScreen: false
            }
        })
    }

    return (
        <div className="App">
            {screens.startScreen && <WelcomeScreen onRegistrationHandler={onRegistrationHandler}/>}
            {screens.lobbyScreen && <LobbyScreen/>}
        </div>
    );
}

export default App;
