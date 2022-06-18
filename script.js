// create variables for the current round, maximum round number, total points, and high score
let currentRound = 1
let totalRounds = 5
let totalPoints = 0
let currentHighScore = 0

//
let userEnteredRed = 0
let userEnteredBlue = 0
let userEnteredCircle = 0
let userEnteredTriangle = 0

let topButtons = document.getElementById("top-buttons")
let QAArea = document.getElementById("game-area")

start.addEventListener("click", showImage);


function showImage() {
    
    QAArea.classList.remove("question-and-answer")
    let round = document.getElementById("round")
    let score = document.getElementById("score")
    round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
    score.innerHTML = `Score<br>${totalPoints}`
    if (currentRound == 1) {
        let start = document.getElementById("start")
        start.remove()
    }

    let colors = ["red", "blue"]
    let shapes = ["circle", "triangle"]
    let actualRed = 0
    let actualBlue = 0
    let actualCircle = 0
    let actualTriangle = 0
    QAArea.innerHTML = ""
    
    let numberofImages = Math.ceil( Math.random() * 5 ) + (currentRound*5)
    for (let i = 1; i <= numberofImages; i++) {
        let color = colors[Math.floor( Math.random() * colors.length )]
        let image = document.createElement("div")
        image.classList.add(shapes[Math.floor( Math.random() * shapes.length )])
        switch (color) {
            case "red":
                actualRed++;
                break;
            case "blue":
                actualBlue++;
                break;
        }
        if (image.classList.contains("circle")) {
            image.style.background = color
            actualCircle++
        } else {
            image.style.borderBottomColor = color
            actualTriangle++
        }
        QAArea.append(image)
    }

    if (currentRound <= 2) {
        setTimeout(function () {
            showQuestions()
        }, 6000)
    } else if (currentRound <= 4) {
        setTimeout(function () {
            showQuestions()
        }, 9000)
    } else {
        setTimeout(function () {
            showQuestions()
        }, 12000)
    }

    function showQuestions() {
        let circleList = document.getElementsByClassName("circle")
        let triangleList = document.getElementsByClassName("triangle")
        while (circleList.length > 0) {
            circleList[circleList[0].remove()]
        }
        while (triangleList.length > 0) {
            triangleList[triangleList[0].remove()]
        }

        // let imagesList = document.getElementsByClassName("image")
        // while (imagesList.length > 0) {
        //     imagesList[imagesList[0].remove()]
        // }

        let QAArea = document.getElementById("game-area")
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
        inputCircle.setAttribute("id", "circle");
        QAArea.append(titleCircle, inputCircle);

        let titleTriangle = document.createElement("span");
        titleTriangle.innerHTML = `<br>How many triangles?`;
        let inputTriangle = document.createElement("input");        
        inputTriangle.setAttribute("id", "triangle");
        QAArea.append(titleTriangle, inputTriangle);

        let submit = document.createElement("button");
        submit.classList.add("submit", "game-button");
        submit.textContent = "Submit";
        QAArea.innerHTML += "<br><br>"      
        QAArea.append(submit);
        
        submit.addEventListener("click", checkAnswers);
    }

    // Check how many questions answered correctly
    // Add points to the player's score
    // Check if there are any rounds left
    function checkAnswers() {

        // Get the input id from each input box above
        const inputs = [...document.querySelectorAll('input')]
        // Check each input id
        inputs.forEach(input => {
            // The userEntered variables are defined at the top of the code
            if (input.getAttribute("id") == "red") {
                userEnteredRed = input.value
            } else if (input.getAttribute("id") == "blue") {
                userEnteredBlue = input.value
            } else if (input.getAttribute("id") == "circle") {
                userEnteredCircle = input.value
            } else {
                userEnteredTriangle = input.value
            }
        })

        let currentRoundPoints = 0;

        if (userEnteredRed == String(actualRed)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredBlue == String(actualBlue)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredCircle == String(actualCircle)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredTriangle == String(actualTriangle)) {
            currentRoundPoints += currentRound
        }

        totalPoints += currentRoundPoints
        let score = document.getElementById("score")
        score.innerHTML = `Score<br>${totalPoints}`
        QAArea.classList.remove("question-and-answer")
        
        // If not on the final round, tell the player their score for the current round
        // Show the button to start the next round
        if (currentRound < totalRounds) {
            QAArea.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*4} points <br> in this round<br>`;
            currentRound++
            let nextRoundButton = document.createElement("button");
            nextRoundButton.classList.add("game-button");
            nextRoundButton.textContent = "Next Round";
            QAArea.append(nextRoundButton);
            QAArea.classList.add("question-and-answer")
            nextRoundButton.addEventListener("click", showImage);
        } 
        // If on the final round, tell the player their score for the current round
        // Tell the final score and (if higher than the high score) set the high score to the final score
        // Create a "Start" button at the top of the page to play again
        else {
            let topButtons = document.getElementById("top-buttons")
            QAArea.innerHTML = "";
            let gameFinished = document.createElement("text");
            gameFinished.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*4} points <br> in this round<br>
            <br><br>Congrats! Your final score is ${totalPoints}<br> To play again, click the "Start" button above`
            QAArea.append(gameFinished);
            let highScoreArea = document.getElementById("high-score");
            if (totalPoints > currentHighScore) {
                currentHighScore = totalPoints
                highScoreArea.innerHTML = `High score<br>${currentHighScore}/60`
            }
            currentRound = 1
            totalRounds = 5
            totalPoints = 0
            let start = document.createElement("button");
            start.setAttribute("id", "start");
            start.classList.add("game-button")
            start.textContent = "Start";
            topButtons.append(start)
            QAArea.classList.add("question-and-answer")
            start.addEventListener("click", showImage);
        }
    }
}
