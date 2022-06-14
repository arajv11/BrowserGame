// make global variables and check comments
let currentRound = 1
let totalRounds = 3
let totalPoints = 0

let start = document.getElementById("start")
let QAArea = document.getElementById("div2")

// let colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
let colors = ["red", "blue"]
let red = 0
let blue = 0

let userEnteredRed = 0
let userEnteredBlue = 0

let emptyArray = []
console.log(start)

start.addEventListener("click", showImage);

function stopGame() {
    let quit = document.getElementById("quit");
    quit.remove()
    let round = document.getElementById("round")
    round.innerHTML = "Round<br>0/0"
    let score = document.getElementById("score")
    score.innerHTML = "Score<br>0"
    let start = document.getElementById("start")
    let topButtons = document.getElementById("top-buttons")
    topButtons.append(start)
    return false
}

async function showImage() {
    while (stopGame) {
        let score = document.getElementById("score")
        score.innerHTML = `Score<br>${totalPoints}`
        QAArea.classList.remove("question-and-answer")
        if (currentRound == 1) {
            let topButtons = document.getElementById("top-buttons")
            let start = document.getElementById("start")
            topButtons.remove(start)
            let quit = document.createElement("button");
            quit.setAttribute("id", "quit");
            quit.textContent = "Quit";
            topButtons.append(quit)
            quit.addEventListener("click", stopGame);
        }
        let round = document.getElementById("round")
        round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
        console.log(currentRound+"/"+totalRounds)
        red = 0
        blue = 0
        QAArea.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
            console.log(QAArea)
            let shape = document.createElement('div')
            shape.classList.add("circle")
            let color = colors[Math.floor( Math.random() * colors.length )];
            shape.style.background = color
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
            while (circleList.length > 0) {
                circleList[circleList[0].remove()]
            }

            let QAArea = document.getElementById("div2")
            QAArea.classList.add("question-and-answer")
            
            let titleRed = document.createElement("span");
            titleRed.innerHTML = `<br>How many red?`;
            let quantityInputBox = document.createElement("input");
            quantityInputBox.setAttribute("id", "red");//redInput
            QAArea.append(titleRed, quantityInputBox);

            let titleBlue = document.createElement("span");
            titleBlue.innerHTML = `<br>How many blue?`;
            let quantityInputBoxBlue = document.createElement("input");        
            quantityInputBoxBlue.setAttribute("id", "blue");
            QAArea.append(titleBlue, quantityInputBoxBlue);

            let submitNewQuantity = document.createElement("button");
            submitNewQuantity.classList.add("submit");
            submitNewQuantity.textContent = "Submit";
            submitNewQuantity.setAttribute("id", "red");        
            QAArea.append(submitNewQuantity);

            let submitButton = document.querySelector(".submit");
            submitButton.addEventListener("click", checkQuantity);

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
                QAArea.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*2} points this round<br>`;
                currentRound++
                let nextRoundButton = document.createElement("button");
                nextRoundButton.textContent = "Next Round";
                nextRoundButton.setAttribute("button-for", "next round");
                QAArea.append(nextRoundButton);
                nextRoundButton.addEventListener("click", showImage);
                // Higher score for harder rounds
                // Score each round depends on # of questions right
            } else {
                quit.remove()
                let QAArea = document.getElementById("div2")
                QAArea.innerHTML = "";
                let gameFinished = document.createElement("text");
                gameFinished.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*2} points in this round<br>
                <br><br><br>Congrats! Your final score is ${totalPoints}<br> To play again, click the "Start" button above`
                QAArea.append(gameFinished);
                let topButtons = document.getElementById("top-buttons")
                let start = document.createElement("button");
                start.setAttribute("id", "start");
                start.textContent = "Start";
                topButtons.append(start)
                currentRound = 1
                totalRounds = 3
                totalPoints = 0
                start.addEventListener("click", showImage);
            }
        }
    }
}
