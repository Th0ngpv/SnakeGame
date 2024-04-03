const playBoard = document.querySelector("#play-board");

let foodX = 13, foodY = 10;

const changeFoodPosition = () => {
    //create an random X and Y coordination from 1-30 for food
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const initGame = () => {
    //create the food element
    let htmlMarkup = `<div class="food" style = "grid-area: ${foodX} / ${foodY}"></div>`;
    playBoard.innerHTML = htmlMarkup;
    
}
changeFoodPosition();
initGame();

