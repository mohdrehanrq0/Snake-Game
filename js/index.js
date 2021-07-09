///assigning the variable
let inputDir = {x: 0, y: 0};
let foodSound = new Audio("/Snake-Game/music/food.mp3");
let gameOver = new Audio("/music/gameover.mp3");
let moveSound = new Audio("/Snake-Game/music/move.mp3");
let musicSound = new Audio("/music/music.mp3");
let lastPaintTime = 0;
let speed = 5;
let score = 0;
let snakeArr = [{x:12,y:14}];
let food = {x:8, y:5};


//all the function writes here
let main = (ctime) => {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();   
}

let Collide = (sarr) => {
    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;  
    }
    for (let i = 1; i < snakeArr.length; i++) {
        if(sarr[i].x === snakeArr[0].x && sarr[i].y === snakeArr[0].y){
            return true;
        }   
    }
    // for (let i = 1; i < snakeArr.length; i++) {
    //     if (sarr[i].x === snakeArr[0].x && sarr[i].y === snakeArr[0].y) {
    //         return true;    
    //     }   
    // }
}

let gameEngine = () => {

    if(Collide(snakeArr)){
        gameOver.play();
        console.log(snakeArr);
        alert("Game Over! Press any key to continue...");
        inputDir = {x:0, y:0};
        snakeArr = [{x:12,y:14}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // if snake eat the food add element to it 
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 1;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        // console.log(snakeArr);
        let a = 2;
        let b = 17;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }




    // move the snake body
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    //move the snake head
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    // display the snake and food 
    snakeArr.forEach((e, index) => {
       
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });


    // display the food 

    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}





//all the logic goes here
let hiscore = localStorage.getItem("hiscore");
if(hiscore  === null) {
    hiscoreval = 5;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)  => {
    inputDir = {x:0 , y:1}; //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowDown":
            //console.log("arrow down")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        
        case "ArrowUp":
            //console.log("arrow up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowRight":
            //console.log("arrow right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            //console.log("arrow left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
    //console.log(inputDir);
})
