const playBoard = document.querySelector("#play-board");

let foodX = 13, foodY = 10;
let snakeX = 5, SnakeY = 10;
let velocityX = 0,velocityY = 0;

//generate a random food position
const changeFoodPosition = () => {
    //create an random X and Y coordination from 1-30 for food
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//change the direction of the snake base on arrow key
const changeDirection = (e) => {
    if (e.key === "ArrowLeft") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowRight") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowUp") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowDown") {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    //check if the snake head and the food are at the same position
    if (snakeX === foodX && SnakeY === foodY) {
        changeFoodPosition();
    }
    //create the food element
    let htmlMarkup = `<div class="food" style = "grid-area: ${foodX} / ${foodY}"></div>`;
    
    //update the snake's head position base on the velocity
    snakeX += velocityX;
    SnakeY += velocityY; 
    //create the snake head element
    htmlMarkup += `<div id="snake" style ="grid-area: ${snakeX}/${SnakeY}"></div>`;
    playBoard.innerHTML = htmlMarkup;
    
}




changeFoodPosition();
setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);
