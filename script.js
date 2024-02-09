const gameContainer = document.getElementById('gameContainer');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
let basketLeft = gameContainer.offsetWidth / 2 - basket.offsetWidth / 2;
let score = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketLeft > 0) {
        basketLeft -= 20;
    } else if (e.key === 'ArrowRight' && basketLeft < gameContainer.offsetWidth - basket.offsetWidth) {
        basketLeft += 20;
    }
    basket.style.left = basketLeft + 'px';
});

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
    star.style.top = '0px';
    gameContainer.appendChild(star);

    function fall() {
        let starTop = parseInt(star.style.top);
        let basketTop = parseInt(window.getComputedStyle(basket).getPropertyValue("top"));
        star.style.top = starTop + 2 + 'px';
        
        if (starTop < gameContainer.offsetHeight - 20 && checkCollision(star, basket)) {
            increaseScore();
            star.remove();
        } else if (starTop < gameContainer.offsetHeight) {
            requestAnimationFrame(fall); 
        } else {
            star.remove();
        }
    }

    fall();
}

function checkCollision(star, basket) {
    let starRect = star.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();

    return !(
        starRect.top > basketRect.bottom ||
        starRect.bottom < basketRect.top ||
        starRect.right < basketRect.left ||
        starRect.left > basketRect.right
    );
}

function increaseScore() {
    score += 1;
    scoreDisplay.textContent = 'Score: ' + score;
}

setInterval(createStar, 1000);

