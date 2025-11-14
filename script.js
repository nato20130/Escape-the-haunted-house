document.addEventListener("DOMContentLoaded", () => {

    // Pull configuration from config.js
    const settings = {
        startingLevel: DEFAULTS.startingLevel,
        startingScore: DEFAULTS.startingScore,
        maxLevels: DEFAULTS.maxLevels,
        maxTime: DEFAULTS.maxTime
    };

    let currentLevel = settings.startingLevel;
    let score = settings.startingScore;
    let levelTimeout;

    // Initialize UI with app name from config.js
    document.querySelector("header h1").textContent = APP_NAME;

    function startGame() {
        score = settings.startingScore;
        currentLevel = settings.startingLevel;

        updateGameUI();
        nextLevel();
    }

    function nextLevel() {
        clearInterval(levelTimeout);

        if (currentLevel > settings.maxLevels) {
            endGame();
            return;
        }

        updateGameUI();
        startLevelTimer();

        currentLevel++;
    }

    function startLevelTimer() {
        let timer = settings.maxTime;

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
        clearInterval(levelTimeout);
        alert(`Game Over! Your final score: ${score}`);
    }

    function updateGameUI() {
        document.getElementById('level').textContent = `Level: ${currentLevel}`;
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    document.getElementById('start-game').addEventListener('click', startGame);
});
