let currentRound = 1;
let totalRounds = 10;
let remainingTime = 10;


let start = document.getElementById("start");
let colors = ["red", "black"]
let index = 0;
console.log(start)

start.addEventListener("click", showImage);

function showImage() {
    console.log("Game started")
    let gameArea = document.getElementById("div2")
    console.log(gameArea)
    let shape = document.createElement('div')
    shape.classList.add("circle")
    if (index % 2 == 0) {
        shape.style.background = "red"
        console.log(index)
    } else {
        shape.style.background = "black"
        console.log(index)
    }
    index +=1
    console.log(index)
    gameArea.append(shape)
}