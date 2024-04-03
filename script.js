const playBoard = document.querySelector("#play-board");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#high-score")
const controls = document.querySelectorAll("#controls i");

let foodX = 1, foodY = 2;
let snakeX = 3, snakeY = 2;
let snakeBody =[];
let velocityX = 0,velocityY = 0;
let intervalId;
let gameOver = false;
let score = 0;

//get highScore from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//generate a random food position
const changeFoodPosition = () => {
    //create an random X and Y coordination from 1-30 for food
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//handle when gameOver = true
const handleGameOver = () => {
    clearInterval(intervalId);
    alert("Game Over! click OK to play again.");
    location.reload();
}

//change the direction of the snake base on arrow key
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != 1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != 1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    //calling changeDirection on each key click and pass key dataset value as an object
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});
//create the main game
const initGame = () => {
    //check if gameOver = true
    if (gameOver) return handleGameOver();

    //create the food element
    let htmlMarkUp = `<div class="food" style = "grid-area: ${foodY} / ${foodX}"></div>`;

    //check if snake eat the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        //add the food position to the snake body array
        snakeBody.push([foodX,foodY]); 

        //update score and high score
        score++;
        highScore = score >= highScore ? score : highScore;

        //initialize high-score in local storage
        localStorage.setItem("high-score", highScore);

        //display score to html
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    //shifting forward the values of elements in the snakeBody by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }

    //create the first element of the snake array
    snakeBody[0] = [snakeX,snakeY];

    //update the snake's head position base on the velocity
    snakeX += velocityX;
    snakeY += velocityY; 

    //check if the snake hit a wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    //add a div for each part of the snake
    for(i = 0; i < snakeBody.length;i++) {
        htmlMarkUp += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
        //check if the snake hit the body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1]
            && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    //add all the changes to play-board div
    playBoard.innerHTML = htmlMarkUp;
}

//initialize the game
changeFoodPosition();
intervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);
