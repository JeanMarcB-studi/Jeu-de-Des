console.log("start the program")

// ----- PRELOAD SOUNDS

const soundHold = new Audio("MP3/hold.mp3")
const soundRollDice = new Audio("MP3/rollDice.mp3")
const soundOooh = new Audio("MP3/oooh.mp3")

// ----- INIT GAME VARIABLES

const scoreToWin = 100
let currentPlayer
let score = new Array()
let current = new Array()
let addrScore = new Array()
let addrCurrent = new Array()
let resultDice
let gamePlaying = false
let oldValue = 0

addrScore[1] = document.querySelector("#score1")
addrScore[2] = document.querySelector("#score2")
addrCurrent[1] = document.querySelector("#current1")
addrCurrent[2] = document.querySelector("#current2")
let addrDice = document.querySelector("#dice")

let btonNewGame = document.querySelector("#btonNewGame")
let btonRollDice = document.querySelector("#btonRollDice")
let btonHold = document.querySelector("#btonHold")


// ----- DEFINE GAME FUNCTIONS

// show the dice face value

var showDice = (value) => {
  addrDice.classList.remove(`d${oldValue}`)
  addrDice.classList.add(`d${value}`)
  oldValue = value
}

// show the score for player 1 or 2
var showScore = (player) => {
  console.log("showScore for player: " + player)
  addrScore[player].innerText = score[player]
}

// show the current value for player 1 or 2
var showCurrent = (player) => {
  console.log("showCurrent for player: " + player + " = "+ current[player])
  
  addrCurrent[player].innerText = current[player]
}

// start a new game
var startNewGame = () => {
  console.log ("newGame")
  score[1] = 0
  showScore(1)
  score[2] = 0
  showScore(2)
  current[1] = 0
  current[2] = 0
  currentPlayer = 1
  gamePlaying = true
}

// roll the dice
var rollDice = () => {
  if (gamePlaying) {
    soundRollDice.play()
    resultDice = 1 + Math.floor(Math.random() * 6);
    // addrDice.innerText = resultDice 
    showDice(resultDice)
    console.log("rollDice: " + resultDice);
    
    if (resultDice == 1){
      current[currentPlayer] = 0
      showCurrent(currentPlayer)
      changePlayer()
  
    } else {
      current[currentPlayer] += resultDice
      showCurrent(currentPlayer)
    }
  }
}

// hold the Game
var holdGame = () => {
  if (gamePlaying) {
    soundHold.play()
    console.log("holdGame");
    score[currentPlayer] += current[currentPlayer]
    if (score[currentPlayer] >= 100) {
      score[currentPlayer] = 100
      gamePlaying = false
      showWinner()
    } else {      
      showScore(currentPlayer)
      changePlayer();
    }
  }
}

// change the player
var changePlayer = () => {
  console.log("changePlayer");
  currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1
  current[currentPlayer] = 0
}

// ----- SCANNING THE BUTTONS

btonNewGame.addEventListener("click", () => startNewGame())
btonRollDice.addEventListener("click", () => rollDice())
btonHold.addEventListener("click", () => holdGame())

// ----- LAUNCH THE GAME

startNewGame()


