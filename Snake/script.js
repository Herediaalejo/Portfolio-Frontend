const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const gameOverText = document.querySelector(".game-over-text");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.innerHTML = `High Score: ${highScore}`

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    gameOverText.style.display = "block";
    setTimeout(() => {
        gameOverText.style.backgroundColor = "black";
        gameOverText.style.fontSize = "6rem";
        gameOverText.style.borderRadius = "50px";
        gameOverText.style.color = "rgb(234, 56, 56)";

    }, 100);
    setTimeout(() => {
        location.reload();
    }, 4000); 
}

const changeDirection = (e) => {
    if (!gameOver) {
        if ((e.key === "ArrowUp" || e.key === "w") && velocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
        } else if ((e.key === "ArrowDown" || e.key === "s") && velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
        } else if ((e.key === "ArrowLeft" || e.key === "a") && velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
        } else if ((e.key === "ArrowRight" || e.key === "d") && velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
        } else if (e.key === " ") {
            velocityX = 0;
            velocityY = 0;
        }
    }
}
const initGame = () => {

    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX, foodY])
        changeFoodPosition();
        score++;
        
        highScore = score > highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        scoreElement.innerHTML = `Score: ${score}`

        highScoreElement.innerHTML = `High Score: ${highScore}`
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0]  = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
        console.log("Game Over!")
    }

    for(let i = 0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 120);
document.addEventListener("keydown", changeDirection)