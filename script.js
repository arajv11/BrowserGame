let currentRound = 1
let totalRounds = 5
let totalPoints = 0

let topButtons = document.getElementById("top-buttons")
let start = document.getElementById("start")
let QAArea = document.getElementById("div2")

let colors = ["red", "blue"]
let shapes = ["circle", "triangle"]
let red = 0
let blue = 0
let circle = 0
let triangle = 0

let userEnteredRed = 0
let userEnteredBlue = 0

start.addEventListener("click", showImage);

function showImage() {
    
    QAArea.classList.add("question-and-answer")
    QAArea.innerHTML = ""
    QAArea.innerHTML = `<br>Round starting...`
    let round = document.getElementById("round")
    let score = document.getElementById("score")
    round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
    score.innerHTML = `Score<br>${totalPoints}`
    if (currentRound == 1) {
        let start = document.getElementById("start")
        start.remove()
    }

    QAArea.classList.remove("question-and-answer")
    round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
    score.innerHTML = `Score<br>${totalPoints}`
    red = 0
    blue = 0
    QAArea.innerHTML = "" 
    for (let i = 1; i <= currentRound*4; i++) {
        console.log(QAArea)
        let shape = document.createElement('div')
        shape.classList.add(shapes[Math.floor( Math.random() * shapes.length )])
        let color = colors[Math.floor( Math.random() * colors.length )]
        if (shape.classList.contains("circle")) {
            shape.style.background = color
            circle++
        } else {
            shape.style.borderBottomColor = color
            // shape.setAttribute("border-bottom", `100px solid ${color}`)
            triangle++
        }
        switch (color) {
            case "red":
                red++;
                break;
            case "blue":
                blue++;
                break;
        }
        QAArea.append(shape)
    }

    setTimeout(function () {
        console.log("Number of red displayed = "+red)
        console.log("Number of blue displayed = "+blue)
        let circleList = document.getElementsByClassName("circle")
        let triangleList = document.getElementsByClassName("triangle")
        while (circleList.length > 0) {
            circleList[circleList[0].remove()]
        }
        while (triangleList.length > 0) {
            triangleList[triangleList[0].remove()]
        }

        let QAArea = document.getElementById("div2")
        QAArea.classList.add("question-and-answer")
                
        let titleRed = document.createElement("span");
        titleRed.innerHTML = `<br>How many red?`;
        let inputRed = document.createElement("input");
        inputRed.setAttribute("id", "red");
        QAArea.append(titleRed, inputRed);

        let titleBlue = document.createElement("span");
        titleBlue.innerHTML = `<br>How many blue?`;
        let inputBlue = document.createElement("input");        
        inputBlue.setAttribute("id", "blue");
        QAArea.append(titleBlue, inputBlue);

        let titleCircle = document.createElement("span");
        titleCircle.innerHTML = `<br>How many circles?`;
        let inputCircle = document.createElement("input");
        inputCircle.setAttribute("id", "red");
        QAArea.append(titleCircle, inputCircle);

        let titleTriangle = document.createElement("span");
        titleTriangle.innerHTML = `<br>How many triangles?`;
        let inputTriangle = document.createElement("input");        
        inputTriangle.setAttribute("id", "blue");
        QAArea.append(titleTriangle, inputTriangle);

        let submit = document.createElement("button");
        submit.classList.add("submit", "game-button");
        submit.textContent = "Submit";
        QAArea.innerHTML += "<br><br>"      
        QAArea.append(submit);
        
        submit.addEventListener("click", checkQuantity);

    }, 1000)

    function checkQuantity() {

        const colorInputs = [...document.querySelectorAll('input')]
        console.log(colorInputs)

        colorInputs.forEach(colorInput => {
            if (colorInput.getAttribute("id") == "red") {
                userEnteredRed = colorInput.value
            } else {
                userEnteredBlue = colorInput.value
            }
        })

        console.log("userEnteredRed = " + userEnteredRed)
        console.log("userEnteredBlue = " + userEnteredBlue)

        let currentRoundPoints = 0;
            
        if ((userEnteredRed == red ) && (userEnteredBlue == blue )) {
            currentRoundPoints += currentRound * 2
        } else if ((userEnteredRed != red ) && (userEnteredBlue != blue )) {
            currentRoundPoints += 0
        } else {
            currentRoundPoints += currentRound
        }

        totalPoints += currentRoundPoints
        let score = document.getElementById("score")
        score.innerHTML = `Score<br>${totalPoints}`

        // Check round number
        if (currentRound < totalRounds) {
            let QAArea = document.getElementById("div2")
            QAArea.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*2} points <br> in this round<br>`;
            currentRound++
            let nextRoundButton = document.createElement("button");
            nextRoundButton.textContent = "Next Round";
            nextRoundButton.classList.add("game-button");
            QAArea.append(nextRoundButton);
            nextRoundButton.addEventListener("click", showImage);
            // Higher score for harder rounds
            // Score each round depends on # of questions right
        } else {
            let topButtons = document.getElementById("top-buttons")
            let QAArea = document.getElementById("div2")
            QAArea.innerHTML = "";
            let gameFinished = document.createElement("text");
            gameFinished.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*2} points <br> in this round<br>
            <br><br>Congrats! Your final score is ${totalPoints}<br> To play again, click the "Start" button above`
            QAArea.append(gameFinished);
            let start = document.createElement("button");
            start.setAttribute("id", "start");
            start.textContent = "Start";
            topButtons.append(start)
            currentRound = 1
            totalRounds = 5
            totalPoints = 0
            start.addEventListener("click", showImage);
        }
    }
}
