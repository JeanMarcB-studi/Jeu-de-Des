console.log("start")

// ----- INIT GAME VARIABLES

let currentPlayer
let score1
let score2
let current1
let current2
let resultDice

let addrScore1 = document.querySelector("#score1")
let addrScore2 = document.querySelector("#score2")
let addrCurrent1 = document.querySelector("#current1")
let addrCurrent2 = document.querySelector("#current2")
let addrDice = document.querySelector("#dice")

let btonNewGame = document.querySelector("#btonNewGame")
let btonRollDice = document.querySelector("#btonRollDice")
let btonHold = document.querySelector("#btonHold")


// ----- DEFINE GAME FUNCTIONS

// show the score for player 1 or 2
var showScore = (player) => {
  console.log("showScore for player: " + player)
  if (player == 1) {
    addrScore1.innerText = score1
  } else {
    addrScore2.innerText = score2
  }
}

// start a new game
var startNewGame = () => {
  console.log ("newGame")
  score1 = 0
  showScore(1)
  score2 = 0
  showScore(2)
  currentPlayer = 1
  current1 = 0
  current2 = 0
  addrDice.innerText = '?'
}

// roll the dice
var rollDice = () => {
  console.log("rollDice");
  resultDice = 1 + Math.floor(Math.random() * 6);
  addrDice.innerText = resultDice 

  if (resultDice == 1){

  }
}

// hold the Game
var holdGame = () => {
  console.log("holdGame");
  currentPlayer == 1 ? score1 += current1 : score2 += current2
  showScore(currentPlayer)
  changePlayer();
}

// change the player
var changePlayer = () => {
  console.log("changePlayer");
  currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1
  
  current1 = 0;
  current2 = 0;
}

// ----- SCANNING THE BUTTONS

btonNewGame.addEventListener("click", () => newGame())
btonRollDice.addEventListener("click", () => rollDice())
btonHold.addEventListener("click", () => holdGame())

// ----- LAUNCH THE GAME

startNewGame()


