console.log("start the program")

// ----- PRELOAD SOUNDS

const soundHold = new Audio("MP3/hold.mp3")
const soundRollDice = new Audio("MP3/rollDice.mp3")
const soundOooh = new Audio("MP3/oooh.mp3")
const soundWin = new Audio("MP3/applause.mp3")


// ----- INIT GAME VARIABLES

const scoreToWin = 100
let currentPlayer
let score = new Array()
let current = new Array()
let addrScore = new Array()
let addrCurrent = new Array()
let addrPlayer = new Array()
let resultDice
let gamePlaying = false
let oldValue = 0

addrScore[1] = document.querySelector("#score1")
addrScore[2] = document.querySelector("#score2")
addrCurrent[1] = document.querySelector("#current1")
addrCurrent[2] = document.querySelector("#current2")
addrPlayer[1] = document.querySelector("#player1")
addrPlayer[2] = document.querySelector("#player2")

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
  showDice(0)
  current[1] = 0
  showCurrent(1)
  current[2] = 0
  showCurrent(2)
  currentPlayer = 1
  gamePlaying = true
  addrPlayer[1].classList.add("activePlayer")
  addrPlayer[2].classList.remove("activePlayer")
}

// roll the dice
var rollDice = () => {
  if (gamePlaying) {
    soundRollDice.play()    
    resultDice = 1 + Math.floor(Math.random() * 6);
    showDice(0)
    setTimeout(() => {
      showDice(resultDice)
      console.log("rollDice: " + resultDice);
      
      if (resultDice == 1){
        soundOooh.play()
        current[currentPlayer] = 0
        // setTimeout(() => {
          showCurrent(currentPlayer)
          changePlayer()
        // },99)
        
      } else {
        current[currentPlayer] += resultDice
        showCurrent(currentPlayer)
      }
    },800)
  }
}

// and the winner is...
var showWinner = () => {
  gamePlaying = false
  soundWin.play()
  score[currentPlayer] = 100
  showScore(currentPlayer)
}

// hold the Game
var holdGame = () => {
  if (gamePlaying && (current[currentPlayer] > 0)){
    soundHold.play()
    console.log("holdGame");
    score[currentPlayer] += current[currentPlayer]
    //is there a winner ?
    if (score[currentPlayer] >= 100) {
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
  setTimeout(() => {
    addrPlayer[currentPlayer].classList.remove("activePlayer")
    currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1
    addrPlayer[currentPlayer].classList.add("activePlayer")
  
    current[currentPlayer] = 0
    showCurrent(currentPlayer)
  }, 1000
  )
}

// ----- SCANNING THE BUTTONS

btonNewGame.addEventListener("click", () => startNewGame())
btonRollDice.addEventListener("click", () => rollDice())
btonHold.addEventListener("click", () => holdGame())

// ----- LAUNCH THE GAME

startNewGame()


