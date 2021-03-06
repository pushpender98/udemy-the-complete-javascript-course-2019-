/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var activePlayer, roundScore, Scores, gamePlaying, previousRoll, newRoll, finalScoreValue, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){ 

    if(gamePlaying){
        // Random Number
        var dice_1 = Math.floor((Math.random() * 6) + 1);
        var dice_2 = Math.floor((Math.random() * 6) + 1);

        // Change the Dice Image
        var diceDOM = document.querySelector('.dice-1');
        var diceDOM_2 = document.querySelector('.dice-2');
        diceDOM_2.style.display = "block";
        diceDOM.style.display = "block";
        diceDOM.src = "dice-"+ dice_1 +".png";
        diceDOM_2.src = "dice-" + dice_2 + ".png";

        // // Update the round score If the rolled number was not a 1
        if(dice_1 != 1 && dice_2 != 1){
            // Add score
            roundScore = dice_1 + dice_2;
            document.querySelector("#current-"+ activePlayer).textContent = roundScore;
        }
        else {
            // Next player
        nextPlayer();
        }

        // if(dice_1 === 6 && previousRoll === 6){
        //     Scores[activePlayer] = [0 ,0];
        //     document.querySelector("#score-" + activePlayer).textContent = '0';
        //     nextPlayer();
        // }
        // else if (dice_1 != 1)
        // {
        //     // Add score
        //     roundScore = dice_1 + dice_2;
        //     document.querySelector("#current-"+ activePlayer).textContent = roundScore;
        // }
        // else {
        //     // Next player
        //     nextPlayer();
        // }
        
        // //Storing the previous roll value
        // previousRoll = dice_1;
    }
    
});

document.querySelector(".btn-hold").addEventListener("click", function(){ 
    
    if(gamePlaying) {
        // Add Current Score to Global Score
        Scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = Scores[activePlayer];
    
        // Getting the final score value
        finalScoreValue = document.querySelector('.finalScore').value;
        
        if(!finalScoreValue){
            winningScore = 100;
        } else {
            winningScore = finalScoreValue;
        }
        // Check If player won the game
        if(Scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'winner';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
     
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
    // Next player
    activePlayer === 0  ? activePlayer= 1 :  activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0'; 
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = "none";
    document.querySelector('.dice-2').style.display = "none";
}

function init() {

    // Code to Run for new game
    Scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice-1').style.display = "none";
    document.querySelector('.dice-2').style.display = "none";

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.finalScore').value = '';
}