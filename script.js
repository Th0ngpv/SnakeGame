const playBoard = document.querySelector(".play-board");

let foodX = 13, foodY = 10;
let snakeX = 5, SnakeY = 10;
let snakeBody =[];
let velocityX = 0,velocityY = 0;
let timerId = null;

//generate a random food position
const changeFoodPosition = () => {
    //create an random X and Y coordination from 1-30 for food
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
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

const initGame = () => {
    //create the food element
    let html = `<div class="food" style = "grid-area: ${foodX} / ${foodY}"></div>`;
    //check if the snake head and the food are at the same position
    if (snakeX === foodX && SnakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX,foodY]); //add the food position to the snake body array
        
        console.log(snakeBody);
    }
    //update the snake's head position base on the velocity
    snakeX += velocityX;
    SnakeY += velocityY; 
 
    //shifting forward the values of element in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, SnakeY]; //create a default snake (the first element in the array)
    
    for (let i = 0; i < snakeBody.length; i++) {
        //add a div for each part of a snake body
        html += `<div class="snake" style ="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    //create the snake head element
    playBoard.innerHTML = html;
}


changeFoodPosition();
timerId = setInterval(initGame,125);
document.addEventListener("keyup",changeDirection);
