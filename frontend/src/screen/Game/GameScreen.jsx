import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../../App.css';
import './GameScreen.css';
import Hero, {detectHeroHitsInvader, moveHero, shoot} from "../../component/Hero/Hero";
import Invaders, {detectInvaderHitsHero, spawnInvader} from "../../component/Invader/Invaders";
import {GAME_HEIGHT, GAME_WIDTH, HERO_WIDTH} from "../../constants";
import {updateLasers} from "../../component/Laser/Lasers";
import {invaderHasReloaded, moveInvader, shot} from "../../component/Invader/Invader";
import GameScore from "./GameScore";

function GameScreen(props) {

    const [keyControl, setKeyControl] = useState({
        init: true
    });
    const keyControlRef = useRef(keyControl);
    keyControlRef.current = keyControl;

    const [heroState, setHeroState] = useState({
        xPos: GAME_WIDTH / 2 - HERO_WIDTH / 2,
        yPos: GAME_HEIGHT - 50,
        lasers: [],
        bonus: [],
        score: 0,
        lives: 3,
        level: 1,
        lastShot: 0
    });
    const heroStateRef = useRef(heroState);
    heroStateRef.current = heroState;

    const [invaderState, setInvaderState] = useState({
        invaders: [],
        lasers: [],
        bonus: [],
        spawning_cooldown: 0
    })
    const invaderStateRef = useRef(invaderState);
    invaderStateRef.current = invaderState;

    const keyDownHandler = useCallback((event) => {
        let keyControl = keyControlRef.current;
        if (event.key === "ArrowUp") {
            keyControl = {...keyControl, upKeyPressed: true}
        }
        if (event.key === "ArrowDown") {
            keyControl = {...keyControl, downKeyPressed: true}
        }
        if (event.key === "ArrowLeft") {
            keyControl = {...keyControl, leftKeyPressed: true}
        }
        if (event.key === "ArrowRight") {
            keyControl = {...keyControl, rightKeyPressed: true}
        }
        if (event.key === " ") {
            keyControl = {...keyControl, shootKeyPressed: true}
        }

        setKeyControl(keyControl);

    }, []);

    const keyUpHandler = useCallback((event) => {
        let keyControl = keyControlRef.current;
        if (event.key === "ArrowUp") {
            keyControl = {...keyControl, upKeyPressed: false}
        }
        if (event.key === "ArrowDown") {
            keyControl = {...keyControl, downKeyPressed: false}
        }
        if (event.key === "ArrowLeft") {
            keyControl = {...keyControl, leftKeyPressed: false}
        }
        if (event.key === "ArrowRight") {
            keyControl = {...keyControl, rightKeyPressed: false}
        }
        if (event.key === " ") {
            keyControl = {...keyControl, shootKeyPressed: false}
        }

        setKeyControl(keyControl);

    }, []);

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        return () => {
            document.removeEventListener('keydown', keyDownHandler, false);
            document.removeEventListener('keyup', keyUpHandler, false);
        };
    }, [keyDownHandler, keyUpHandler]);

    const updateHeroState = (heroState, keyControl) => {
        const time = Date.now();
        const updatedHeroState = moveHero(heroState, keyControl);
        const shootEvent = () => {
            return keyControl.shootKeyPressed && time - heroState.lastShot > 1000;
        }

        let lasers = updateLasers(heroState.lasers);
        if (shootEvent()) {
            lasers.push(shoot(heroState.xPos, heroState.yPos));
        }

        updatedHeroState.lasers = lasers;
        updatedHeroState.lastShot = shootEvent() ? time : heroState.lastShot;
        updatedHeroState.level = Math.floor((Date.now() - props.startTime)/ 6000);
        console.log(Math.floor((Date.now() - Number(props.startTime))/ 6000 +1))
        setHeroState(updatedHeroState);
    }

    const updateInvadersState = invaderState => {

        let invaders = []
        let lasers = updateLasers(invaderState.lasers)
        for (let i = 0; i < invaderState.invaders.length; i++) {
            let invader = invaderState.invaders[i];
            invaders[i] = moveInvader(invader, invaderState.invaders)
            if (invaderHasReloaded()) {
                lasers.push(shot(lasers, invader.xPos, invader.yPos))
            }
        }

        let cooldown = Number(invaderState.spawning_cooldown);
        if (invaderState.invaders.length < 3 * heroStateRef.current.level && invaderState.spawning_cooldown <= 0) {
            invaders.push(spawnInvader());
            cooldown = 3000;
        } else {
            cooldown -= 20;
        }

        setInvaderState(prevState => {
            return {
                ...prevState,
                invaders: invaders,
                // bonus: updateBonus(invaderState.lasers),
                lasers: lasers,
                spawning_cooldown: cooldown
            }
        });
    }

    const updateStates = () => {
        updateHeroState(heroStateRef.current, keyControlRef.current);
        updateInvadersState(invaderStateRef.current);
        if (heroState.lives === 0) {
            props.onGameOver(heroStateRef.current.score);
        }
    }

    const updateCollisions = () => {
        let {
            remainingHeroLasers,
            remainingInvaders
        } = detectHeroHitsInvader(heroStateRef.current, invaderStateRef.current.invaders) || {};

        if (remainingInvaders !== undefined && invaderStateRef.current.invaders.length !== remainingInvaders.length) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    score: prevState.score += 50
                }
            });
            setInvaderState(prevState => {
                return {
                    ...prevState,
                    invaders: remainingInvaders
                }
            });
        }
        if (remainingHeroLasers !== undefined && heroStateRef.current.lasers.length !== remainingHeroLasers.lasers) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    lasers: remainingHeroLasers
                }
            });
        }
    }

    const updateHeroCollisions = () => {
        let {
            remainingHeroLives,
            remainingInvadersLasers
        } = detectInvaderHitsHero(heroStateRef.current, invaderStateRef.current.lasers) || {};

        if (remainingInvadersLasers !== undefined && invaderStateRef.current.lasers.length !== remainingInvadersLasers.length) {
            setInvaderState(prevState => {
                return {
                    ...prevState,
                    lasers: remainingInvadersLasers
                }
            });
        }
        if (remainingHeroLives !== undefined && heroStateRef.current.lives !== remainingHeroLives) {
            setHeroState(prevState => {
                return {
                    ...prevState,
                    lives: remainingHeroLives
                }
            });
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            updateStates();
            updateCollisions();
            updateHeroCollisions();
        }, 10);
        return () => clearTimeout(timer);
    });

    console.log("GameScreen")
    return (
        <div className={'game'}>
            <Hero heroState={heroState}/>
            {/* TODO enable invaders */}
            {/*<Invaders invaders={invaderState.invaders}*/}
            {/*          lasers={invaderState.lasers}*/}
            {/*          level={heroState.level}/>*/}
            <GameScore score={heroState.score} lives={heroState.lives} level={heroState.level}/>
        </div>
    )
}

export function ensureBoundaries(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function rectsIntersect(rect1, rect2) {
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}

export const createKey = () => {
    return Date.now() + '_' + Math.floor(Math.random() * (100000 - 1 + 1) + 1)
}

export default GameScreen;