
const board = [];
const boardWidth = 20, boardHeight = 20;
const danceMusic = new Audio("sounds/mixkit-deep-urban-623.mp3");

let snakeX;
let snakeY;
let snakeLength =0;
let snakeDirection;
let score = 0;
let level = 1;
let speed = 2;

  
function toggleSound() {
    if (danceMusic.paused) {
        danceMusic.play();
    } else {
        danceMusic.pause();
    }
}

function initGame() {
        const boardElement = document.getElementById('board');

    for (let y = 0; y < boardHeight; y++) {
            let row = [];
        for (let x = 0; x < boardWidth; x++) {
            let cell = {
                snake: 0
            };
                // Create a <div></div> and store it in the cell object
            cell.element = document.createElement('div');
                
                // Add it to the board
            boardElement.appendChild(cell.element);
    
                // Add to list of all
            row.push(cell);
        }
            // Add this row to the board
        board.push(row);
    }

    startGame();
    gameLoop();
}

function randomApple() {
        // A random coordinate for the apple
    let appleX = Math.floor(Math.random() * boardWidth);
    let appleY = Math.floor(Math.random() * boardHeight);
    board[appleY][appleX].apple = 1;
}

function startGame() {
        // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    snakeLength = 2;
    snakeDirection = 'Up';

    //clear the board
    for (let y =0; y < boardHeight; y++){
        for (let x = 0; x < boardWidth; x++){
            board[y][x].snake = 0;
            board[y][x].apple = 0;
            score = 0;
            level = 1;
            numScore.innerHTML = 0;
            numLevel.innerHTML = 0;
            speed = 2;
        }
    }
    board[snakeY][snakeX].snake = snakeLength;
    randomApple();
}


function gameLoop() {

    // Update position depending on which direction the snake is moving.
    switch (snakeDirection) {
        case 'Up':    snakeY--; break;
        case 'Down':  snakeY++; break;
        case 'Left':  snakeX--; break;
        case 'Right': snakeX++; break;
    }

      // Check for walls, and restart if we collide with any
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight){
        gameOver();
        startGame();
        
    }
    // Tail collision
     else if (board[snakeY][snakeX].snake > 0){
        gameOver();
       startGame();
    }
    
    if (board[snakeY][snakeX].apple === 1) {
        score += 50;
        numScore.innerHTML = score;
        level++;
        numLevel.innerHTML = level;
        snakeLength++;
        speed++;
        board[snakeY][snakeX].apple = 0;
        randomApple();
    }

    // Update the board at the new snake position
 board[snakeY][snakeX].snake = snakeLength;

  // Loop over the entire board, and update every cell
  for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            let cell = board[y][x];

            if (cell.snake > 0) {
                cell.element.className = "snake";
                cell.snake -= 1;
            } 
            else if (cell.apple === 1) {
                cell.element.className = "apple";
            } 
            else {
                cell.element.className = "";
            }
        }
    }
    // This function calls itself, with a timeout of 1000 milliseconds
    setTimeout(gameLoop, 1000 / speed);
}


function enterKey(event) {
        // Update direction depending on key hit
    switch (event.key) {
        case 'ArrowUp': snakeDirection = 'Up'; break;
        case 'ArrowDown': snakeDirection = 'Down'; break;
        case 'ArrowLeft': snakeDirection = 'Left'; break;
        case 'ArrowRight': snakeDirection = 'Right'; break;
        default: return;
    }
        // This prevents the arrow keys from scrolling the window
    event.preventDefault();
}
function move(dir) {
    // Update direction depending on key hit

    if(dir == 'up') {snakeDirection = 'Up'}
    if(dir == 'down') {snakeDirection = 'Down'}
    if(dir == 'left') {snakeDirection = 'Left'}
    if(dir == 'right') {snakeDirection = 'Right'}
}

///hide and unhide start screen and gameover screen
const gameOverMsg = document.getElementById("gameOverMsg");

document.getElementById("start").addEventListener("click", function (startGame) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    danceMusic.play();
  });

document.getElementById('reset').onclick = function(){
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    console.log("I have been clicked");
    startGame();
    danceMusic.play();
    }

function gameOver() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "block";
    danceMusic.pause();
    gameOverMsg.innerHTML = "Game Over! "+ "You collected " + snakeLength + " party Aliens!";
            console.log(snakeLength)
    if (reset.onclick == true){
        document.getElementById('reset').onclick = function(){
            document.getElementById("startScreen").style.display = "none";
            document.getElementById("gameOverScreen").style.display = "none";
            document.getElementById("gameContainer").style.display = "block";
            console.log("I have been clicked");
            startGame();
            danceMusic.play();
            }
    }
}

