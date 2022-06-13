let currentRound = 1;
let totalRounds = 2;
let remainingTime = 10;


let start = document.getElementById("start");
// let colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
let colors = ["red", "blue"]
let red = 0
let blue = 0

let userEnteredRed = 0
let userEnteredBlue = 0


let emptyArray = []
console.log(start)

start.addEventListener("click", showImage);

function showImage() {
    let round = document.getElementById("round")
    round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
    console.log(currentRound+"/"+totalRounds)
    red = 0
    blue = 0
    let gameArea = document.getElementById("div2")
    gameArea.innerHTML = "";
    console.log("Game started")
    for (let i = 1; i <= 10; i++) {
        console.log(gameArea)
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
        gameArea.append(shape)
    }

    setTimeout(function () {
        console.log("Number of red displayed = "+red)
        console.log("Number of bluw displayed = "+blue)
        let circleList = document.getElementsByClassName("circle")
        while (circleList.length > 0) {
            circleList[circleList[0].remove()]
        }

        let QAArea = document.getElementById("div2")
        QAArea.classList.add("question-and-answer")
         
        // Create text field and add book title as value
        let titleRed = document.createElement("text");
        titleRed.textContent = "How many red?";
        
        // Create input area 
        let quantityInputBox = document.createElement("input");
        quantityInputBox.setAttribute("input-data-for", "red");

        QAArea.append(titleRed, quantityInputBox);


        let titleBlue = document.createElement("text");
        titleBlue.textContent = "How many blue?";
        
        // Create input area and button
        let quantityInputBoxBlue = document.createElement("input");
     
        
        // Update quantity input box
        
        quantityInputBoxBlue.setAttribute("input-data-for", "blue");

        QAArea.append(titleBlue, quantityInputBoxBlue);

        let submitNewQuantity = document.createElement("button");
        // Update button properties
        submitNewQuantity.classList.add("submit");
        submitNewQuantity.textContent = "Submit";
        submitNewQuantity.setAttribute("button-for", "red");
        // Update quantity input box
        
        
        QAArea.append(submitNewQuantity);

        // Get the list of  all submit buttons and input areas

        let submitButtonsList = document.querySelectorAll(".submit");
        //let inputAreasList = document.querySelectorAll("input");

        //  add event lister for each button(SAVE)
        submitButtonsList.forEach((button) => {
            button.addEventListener("click", checkQuantity);
        });


    }, 100)
}


function checkQuantity() {


    const colorItems = [...document.querySelectorAll('input')]
    console.log(colorItems)

    colorItems.forEach(color => {
        console.log("Printing values for " + color.getAttribute("input-data-for") + " color " + color.value)

        if (color.getAttribute("input-data-for") == "red"){

            console.log("Value Entered for Red")

            userEnteredRed = color.value
        }else

        {
            userEnteredBlue = color.value

        }

        })

    console.log("userEnteredRed = " + userEnteredRed)
    console.log("userEnteredBlue = " + userEnteredBlue)

    if ((userEnteredRed == red ) && (userEnteredBlue == blue )){

        console.log("You won")
    }else{
        console.log("You lose")

    }

    // Check round number
    if (currentRound < totalRounds) {
        let QAArea = document.getElementById("div2")
        // QAArea.innerHTML = `You scored ${} out of y points<br>`;
        currentRound++
        let nextRoundButton = document.createElement("button");
        nextRoundButton.textContent = "Next Round";
        nextRoundButton.setAttribute("button-for", "next round");
        QAArea.append(nextRoundButton);
        nextRoundButton.addEventListener("click", showImage);
        // Higher score for harder rounds
        // Score each round depends on # of questions right
    } else {
        let QAArea = document.getElementById("div2")
        QAArea.innerHTML = "";
        let gameFinished = document.createElement("text");
        gameFinished.innerHTML = `You scored x out of y points<br>Your final score is z<br>Congrats! Play again for a higher score.`
        QAArea.append(gameFinished);
        // Quit
        // Congrats! Play again for a higher score
    }
}
