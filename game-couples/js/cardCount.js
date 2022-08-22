const cardSix = document.getElementById ('gameCardSix');
const cardEight = document.getElementById ('gameCardEight');
const cardTwelve = document.getElementById ('gameCardTwelve');

// #-------------------------------Reset-------------------------------
function resetCard () {
   cardBlock.classList.add ('card-disabled');
   timer.classList.remove('timer-red');
   cardsWrapper.classList.remove('game-over');
   cardsWrapper.classList.remove('game-win');
   cardBlock.classList.remove('op-0');
   btnPlay.classList.remove ('op-0');
   btnRestart.classList.add ('op-0');
   resetArray ();
   resetArrayDom (); 
   timerStopGame ();
}

// #-------------------------------card click 6,8,12-------------------------------
cardSix.addEventListener ('click', () => {
   resetCard ();
   newGame(6);
});

cardEight.addEventListener ('click', () =>{
   resetCard ();
   newGame(8);
});

cardTwelve.addEventListener ('click', () =>{
   resetCard ();
   newGame(12);
});


