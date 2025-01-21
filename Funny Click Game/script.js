const gameArea = document.getElementById("game-area");
const targetButton = document.getElementById("target-button");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");

let score = 0;
let timeLeft = 30;
let gameInterval;

// 버튼의 위치를 랜덤으로 변경하는 함수
function moveButton() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const buttonWidth = targetButton.offsetWidth;
    const buttonHeight = targetButton.offsetHeight;

    const randomX = Math.random() * (gameAreaRect.width - buttonWidth);
    const randomY = Math.random() * (gameAreaRect.height - buttonHeight);

    targetButton.style.left = `${randomX}px`;
    targetButton.style.top = `${randomY}px`;
}

// 점수 증가 및 버튼 이동
targetButton.addEventListener("click", () => {
    score++;
    scoreboard.textContent = `점수: ${score}`;
    moveButton();
});

// 게임 타이머
function startGame() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `남은 시간: ${timeLeft}초`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert(`게임 종료! 최종 점수: ${score}`);
            resetGame();
        }
    }, 1000);
}

// 게임 초기화
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreboard.textContent = "점수: 0";
    timerDisplay.textContent = "남은 시간: 30초";
    moveButton();
}

// 게임 시작
startGame();
moveButton();
