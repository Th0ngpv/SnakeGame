const playBoard = document.querySelector(".play-board");

let foodX = 13, foodY = 10;
let snakeX = 5, snakeY = 10;
let snakeBody =[];
let velocityX = 0,velocityY = 0;
let intervalId;
let gameOver = false;

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

//create the main game
const initGame = () => {
    //check if gameOver = true
    if (gameOver) return handleGameOver();

    //create the food element
    let htmlMarkUp = `<div class="food" style = "grid-area: ${foodY} / ${foodX}"></div>`;

    //check if snake eat the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX,foodY]); //add the food position to the snake body array
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
    }

    //add all the changes to play-board div
    playBoard.innerHTML = htmlMarkUp;
}


changeFoodPosition();
intervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);
