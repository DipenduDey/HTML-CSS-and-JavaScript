/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,
  roundScore,
  activePlayer,
  dice,
  gamePlaying,
  tempDice = 0,
  winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1.Random Number
    dice = Math.floor(Math.random() * 6) + 1;

    //2.Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3.Update the round score IF the rolled number was NOT a 1

    if (tempDice + dice == 12) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice > 1) {
      //Add Score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;

      document.querySelector(".btn-roll").style.color = "black";
    } else {
      nextPlayer();
    }
    tempDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    let input = document.querySelector(".final-score").value;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  //For update the score in browser
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  dice === 1
    ? (document.querySelector(".btn-roll").style.color = "red")
    : tempDice === 6 && dice === 6
    ? (document.querySelector(".btn-roll").style.color = "blue")
    : (document.querySelector(".btn-roll").style.color = "black");

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

//For new game button

///////////Instead of doing this we can directly call init function in the second argument

// document.getElementsByClassName("btn-new").addEventListener("click", function () {
//  init();
// });

document.querySelector(".btn-new").addEventListener("click", init); //Like this

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".btn-roll").style.color = "black";
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// //for setting the value
// document.querySelector("#current-" + activePlayer).textContent = dice;
// //document.querySelector("#current-" + activePlayer).innerHTML ="<em>" + dice + "</em>";

// //for getting the value
// var x = document.querySelector("#score-0").textContent;
// console.log(x);
