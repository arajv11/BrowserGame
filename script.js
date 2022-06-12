let currentRound = 1;
let totalRounds = 10;
let remainingTime = 10;


let start = document.getElementById("start");
// let colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
let colors = ["red", "black"]
let red = 0
let black = 0
let emptyArray = []
console.log(start)


start.addEventListener("click", showImage);

function showImage() {
    console.log("Game started")
    for (let i = 1; i <= 10; i++) {
        let gameArea = document.getElementById("div2")
        console.log(gameArea)
        let shape = document.createElement('div')
        shape.classList.add("circle")
        let color = colors[Math.floor( Math.random() * colors.length )];
        shape.style.background = color
        switch (color) {
            case "red":
                red++;
                break;
            case "black":
                black++;
                break;
        }
        gameArea.append(shape)
    }

    setTimeout(function () {
        console.log("red="+red)
        console.log("black="+black)
        let circleList = document.getElementsByClassName("circle")
        while (circleList.length > 0) {
            circleList[circleList[0].remove()]
        }
    }, 3000)
}

function deleteImage() {

}