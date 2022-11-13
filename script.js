const words = 
[
    {
      word: "hydrogéne",
      question: "H",
    },
    {
      word: "magnésium",
      question: "Mg",
    },
    {
      word: "sodium",
      question: "Na",
    },
    {
      word: "uranium",
      question: "U",
    },
    {
      word: "zinc",
      question: "Zn",
    },
    {
      word: "potassium",
      question: "K",
    }
];

// variables
var hidden = document.querySelector(".i1");
var Qes = document.querySelector(".question");
var count = document.querySelector(".guess");
var inpArea = document.querySelector(".inputs");
var bt = document.querySelector("button");

// sounds
let omg = new Audio('meme-oh-my-god.mp3');
let alertSound = new Audio('danger-alarm-sound-effect.mp3');
let sad = new Audio('sad-violin-sound-effect.mp3');
let meme = new Audio('meme-sound-effects-4.mp3');
let win = new Audio('children-yay-sound-effect.mp3');

let word;
let maxGuess = 12;

// array to push the chars for testing if you win or no 
let countToWin = [];


// focus input after user keydown
document.addEventListener("keydown", () => hidden.focus());
// start game after user keydown
hidden.addEventListener("input", startGame);

// restart a new game click resetButton change game
bt.addEventListener("click", RandomWord);

// Random Word
function RandomWord() {
  restart();
  // random word
  let randomObject = words[Math.floor(Math.random() * words.length)];
  let Q = randomObject.question;
  // get the word
  word = randomObject.word;
  // print the question
  Qes.innerText = Q;
  // print the numbers of guesses
  count.innerText = maxGuess;
  // creaet inputs
  let inputs = "";
  for (let i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled class ="square"></input>`;
  }
  inpArea.innerHTML = inputs;

}
RandomWord();

// start game
function startGame(e) {
  let char = e.target.value.toLowerCase();
  if (word.includes(char))
  {
    for (let i = 0; i < word.length; i++)
    {
      //  add char in poisiton and cheack poisiton is found or no
      if (word[i] === char && !inpArea.querySelectorAll("input")[i].value)
      {
        inpArea.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
    //console.log(countToWin)
  } else
  {
    maxGuess--;
  }
  count.innerText = maxGuess;
  hidden.value = "";

if(maxGuess == 6)
{
  document.getElementById("con").innerHTML = `Hey ! you have ` + maxGuess + ` attempts! Wake up`;
  omg.play();
}
if(maxGuess == 3)
{
  document.getElementById("con").innerHTML = `please concentrate` 
  meme.play();
}
if(maxGuess == 2)
{
  meme.pause();
}

if(maxGuess == 1)
{
  document.getElementById("con").innerHTML = `one attempt` 
  
  alertSound.play();
}

  // winner
  if (countToWin.length === word.length)
  {
    document.getElementById("con").innerHTML = `You Win` 
    win.play();
    countToWin = [];
    alertSound.pause();
  }

  // lose
    if (maxGuess == 0) {
      document.getElementById("con").innerHTML = `You Lose` 
      sad.play();
      alertSound.pause();
      for (let i = 0; i < word.length; i++) {
        inpArea.querySelectorAll("input")[i].value = word[i];
      }
    }
}

function restart() {
  maxGuess = 12;
  sad.pause();
  document.getElementById("con").innerHTML = `` 
  countToWin = [];
}
