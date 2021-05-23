import Game, {GAME_STATE} from './modules/game.js';

document.getElementById("startGame").onclick = loadGame;

function restart() {
    window.location.reload(true);
}

function loadGame() {
    document.getElementById("playerNameForm").style.display = 'none';
    document.getElementById("endScreen").style.display = 'none';
    document.getElementById("game").style.display = 'flex';
    const playerName = document.getElementById("playerName").value;

    const $game = new Game();

    function onKeyDown(e) {
        $game.onKeyDown(e)
    }

    function onKeyUp(e) {
        $game.onKeyUp(e)
    }

    function update() {
        if (GAME_STATE.over) {
            document.getElementById("game").style.display = 'none';
            document.getElementById("endScreen").style.display = 'block';
            document.getElementById("playerScore").textContent = "Game Over! Your score is: " + GAME_STATE.score;

            let highscoreData = {
                username: playerName,
                score: GAME_STATE.score
            };

            updateHighScore(highscoreData);

            document.getElementById("restartBtn").onclick = restart;

        } else {
            $game.update();
            window.requestAnimationFrame(update);
        }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    if (GAME_STATE.over === false) {
        window.requestAnimationFrame(update);
    }
}

async function updateHighScore(newHighScore) {
    await postData(newHighScore);
    getData();
}

async function postData(data) {
    await fetch("http://localhost:3000/api/highscores", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getData() {
    fetch("http://localhost:3000/api/highscores", {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const div = document.getElementById("highscores");
                let p = document.createElement("p");
                p.innerHTML = `Name: ${data[i].username} Score: ${data[i].score}`;
                div.appendChild(p);
            }
        });
}

