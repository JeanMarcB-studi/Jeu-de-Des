console.log("start the program")

// ----- PRELOAD SOUNDS

const soundStart = new Audio("MP3/gameStart.mp3")
const soundHold = new Audio("MP3/hold.mp3")
const soundRollDice = new Audio("MP3/rollDice.mp3")
const soundOooh = new Audio("MP3/oooh.mp3")
const soundWin = new Audio("MP3/applause.mp3")


// ----- INIT GAME VARIABLES

let scoreToWin
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

let addrScoreToWin = document.querySelector("#scoreToWin")
let addrDice = document.querySelector("#dice")
let addrHelp = document.querySelector("#help")

let btonNewGame = document.querySelector("#btonNewGame")
let btonRollDice = document.querySelector("#btonRollDice")
let btonHold = document.querySelector("#btonHold")
let btonHelp = document.querySelectorAll(".bi-info-square")


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
  soundStart.play()
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
  addrScoreToWin.disabled = false
}

// roll the dice
var rollDice = () => {
  if (gamePlaying) {
    soundRollDice.play()
    if (!addrScoreToWin.disabled){
      scoreToWin = addrScoreToWin.value  
      addrScoreToWin.disabled = true // block Score to Win
    }
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
  score[currentPlayer] = scoreToWin
  showScore(currentPlayer)
}

// hold the Game
var holdGame = () => {
  if (gamePlaying && (current[currentPlayer] > 0)){
    soundHold.play()
    console.log("holdGame");
    score[currentPlayer] += current[currentPlayer]
    //is there a winner ?
    if (score[currentPlayer] >= scoreToWin) {
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

// Security to avoid issues when multiple clicks: add a delay
function throttle (fn, delay) {
  let lastCalled = 0
  return (...args) => {
    // if a new click is done before delay, do nothing
    let now = new Date().getTime()
    if(now - lastCalled < delay) {
      return
    }
    lastCalled = now
    return fn(...args)
  }
}

// show/hide the Help on game
var showHelp = () => {
  addrHelp.classList.toggle("hideMe")
}

// ----- SCANNING THE BUTTONS

btonNewGame.addEventListener("click", () => startNewGame())
btonRollDice.addEventListener("click", throttle (rollDice, 1500))
btonHold.addEventListener("click", throttle(holdGame, 1100))
btonHelp[0].addEventListener("click",() => showHelp())
btonHelp[1].addEventListener("click",() => showHelp())

// ----- LAUNCH THE GAME

startNewGame()

