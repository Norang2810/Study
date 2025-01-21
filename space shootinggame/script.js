const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score-board');

let score = 0;
let enemies = [];
let bullets = [];

// 플레이어 이동
document.addEventListener('keydown', (e) => {
    const playerRect = player.getBoundingClientRect();
    if (e.key === 'ArrowLeft' && playerRect.left > 0) {
        player.style.left = `${player.offsetLeft - 30}px`;
    }
    if (e.key === 'ArrowRight' && playerRect.right < window.innerWidth) {
        player.style.left = `${player.offsetLeft + 30}px`;
    }
    if (e.key === ' ') {
        shootBullet();
    }
});

// 총알 생성
function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${player.offsetLeft + 20}px`;
    bullet.style.top = `${player.offsetTop}px`;
    gameContainer.appendChild(bullet);
    bullets.push(bullet);

    // 총알 이동
    const bulletInterval = setInterval(() => {
        bullet.style.top = `${bullet.offsetTop - 10}px`;

        if (bullet.offsetTop < 0) {
            clearInterval(bulletInterval);
            bullet.remove();
            bullets = bullets.filter((b) => b !== bullet);
        }
    }, 20);
}

// 적 생성
function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    gameContainer.appendChild(enemy);
    enemies.push(enemy);

    const enemyInterval = setInterval(() => {
        enemy.style.top = `${enemy.offsetTop + 5}px`;

        // 충돌 감지
        if (detectCollision(player, enemy)) {
            alert(`게임 오버! 최종 점수: ${score}`);
            window.location.reload();
        }

        bullets.forEach((bullet) => {
            if (detectCollision(bullet, enemy)) {
                bullet.remove();
                enemy.remove();
                bullets = bullets.filter((b) => b !== bullet);
                enemies = enemies.filter((e) => e !== enemy);
                score += 10;
                scoreBoard.textContent = `점수: ${score}`;
                clearInterval(enemyInterval);
            }
        });

        if (enemy.offsetTop > window.innerHeight) {
            enemy.remove();
            enemies = enemies.filter((e) => e !== enemy);
            clearInterval(enemyInterval);
        }
    }, 20);
}

// 충돌 감지 함수
function detectCollision(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

// 적 생성 주기
setInterval(spawnEnemy, 1500);
