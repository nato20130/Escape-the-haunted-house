// Quick Settings
const settings = {
    startingLevel: 1,
    startingScore: 0,
    maxLevels: 5,
    maxTime: 30, // Time in seconds per level
};

// State
let currentLevel = settings.startingLevel;
let score = settings.startingScore;
let levelTimeout;

// Game Logic

function startGame() {
    score = settings.startingScore;
    currentLevel = settings.startingLevel;
    updateGameUI();
    nextLevel();
}

function nextLevel() {
    if (currentLevel > settings.maxLevels) {
        endGame();
        return;
    }

    updateGameUI();
    startLevelTimer();
}

function startLevelTimer() {
    const timeLeft = settings.maxTime;
    let timer = timeLeft;
    levelTimeout = setInterval(() => {
        if (timer <= 0) {
            clearInterval(levelTimeout);
            nextLevel();
        } else {
            timer--;
            document.getElementById('game-status').innerHTML = `
                <p>Level: ${currentLevel}</p>
                <p>Score: ${score}</p>
                <p>Time Left: ${timer}s</p>
            `;
        }
    }, 1000);
}

function endGame() {
    alert('Game Over! Your score: ' + score);
}

function updateGameUI() {
    document.getElementById('level').textContent = 'Level: ' + currentLevel;
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Event Listeners

document.getElementById('start-game').addEventListener('click', startGame);

// Initialize
startGame();
