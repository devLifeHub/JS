// #-------------------------------container-------------------------------
const container = document.querySelector('.container');

// #-------------------------------container « game-------------------------------
const game = document.createElement('div');
game.classList.add('game');
game.classList.add('bg');
container.append(game);

// #-------------------------------game « cardsWrapper-------------------------------
const cardsWrapper = document.createElement('div');
cardsWrapper.classList.add('cards__wrapper');
game.append(cardsWrapper);

// #-------------------------------cardsWrapper « cardBlock-------------------------------
const cardBlock = document.createElement('div');
cardBlock.classList.add('card__block');
cardsWrapper.append(cardBlock);

// #-------------------------------game « btnWrapper-------------------------------
const btnWrapper = document.createElement('div');
btnWrapper.classList.add('btn__wrapper');
game.append(btnWrapper);

// #-------------------------------btnWrapper « btnGroup-------------------------------
const btnGroup = document.createElement('div');
btnGroup.classList.add('btn__group');
btnWrapper.append(btnGroup);

// #-------------------------------btnGroup « btnPlay & btnRestart------------------------------- 
const btnPlay = document.createElement('button');
const btnRestart = document.createElement('button');
btnPlay.classList.add('btn-play');
btnRestart.classList.add('btn-restart');
btnRestart.classList.add('op-0');
btnPlay.textContent = 'Play';
btnRestart.textContent = 'Restart';
btnGroup.append(btnPlay, btnRestart);

// #-------------------------------cardBlock - disabled-------------------------------
cardBlock.classList.add('card-disabled');

let interval;
let cardsCount = 6;

const timer = document.getElementById('timer');
timer.textContent = 20;

// #-------------------------------function call-------------------------------
background();
resetArray();
resetCardNull();
newGame(cardsCount);

//# -------------------------------Reset-------------------------------
function resetCardNull() {
   firstCard = null;
   secondCard = null;
}

function resetArray() {
   cardsNumArray = [];
   cardsArray = [];
}

function resetArrayDom() {
   while (cardBlock.firstChild) {
      cardBlock.removeChild(cardBlock.firstChild);
   }
}

function newGameReset() {
   if (cardsNumArray.length == 6) {
      resetArray();
      resetArrayDom();
      newGame(6);
   } else if (cardsNumArray.length == 8) {
      resetArray();
      resetArrayDom();
      newGame(8);
   } else if (cardsNumArray.length == 12) {
      resetArray();
      resetArrayDom();
      newGame(12);
   }
}

// #-------------------------------Game-------------------------------
function newGame(cardsCount) {
   for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumArray.push(i);
      cardsNumArray.push(i);
   }

   cardsNumArray = cardsNumArray.sort(() => Math.random() - 0.5);

   for (const cardNum of cardsNumArray) {
      cardsArray.push(new Card(cardBlock, cardNum, flip));
   }

   function flip(card) {
      if (firstCard !== null && secondCard !== null) {
         if (firstCard.number != secondCard.number) {

            firstCard.open = false;
            secondCard.open = false;

            resetCardNull();
         }
      }

      if (firstCard == null) {
         firstCard = card;
      } else {
         if (secondCard == null) {
            secondCard = card;
         }
      }

      if (firstCard !== null && secondCard !== null) {
         if (firstCard.number == secondCard.number) {

            firstCard.success = true;
            secondCard.success = true;

            resetCardNull();
         }
      }

      if (document.querySelectorAll('.card.success').length == cardsNumArray.length) {
         clearInterval(interval);
         cardBlock.classList.add('op-0');
         cardsWrapper.classList.add('game-win');
         btnPlay.classList.remove('op-0');
         btnRestart.classList.add('op-0');

         newGameReset();
      }
   }
}

// #-------------------------------timer start & stop-------------------------------
function timerStartGame() {
   interval = setInterval(timerGame, 1000);
   timer.textContent = 20;

   function timerGame() {
      timer.innerHTML--;
      timer.value = timer.innerHTML;

      if (timer.value <= 5) {
         timer.classList.add('timer-red');
      }

      if (timer.value == 0) {
         clearInterval(interval);
         cardBlock.classList.add('op-0');
         cardsWrapper.classList.add('game-over');
         btnPlay.classList.remove('op-0');
         btnRestart.classList.add('op-0');
      }
   }
}

function timerStopGame() {
   clearInterval(interval);
   timer.innerHTML = 20;
}

// #-------------------------------btnPlay & btnReset - click-------------------------------
btnPlay.addEventListener('click', () => {
   cardBlock.classList.remove('card-disabled');
   cardBlock.classList.remove('op-0');
   cardsWrapper.classList.remove('game-over');
   cardsWrapper.classList.remove('game-win');
   btnPlay.classList.add('op-0');
   btnRestart.classList.remove('op-0');
   timer.classList.remove('timer-red');

   timerStartGame();
   newGameReset();
});

btnRestart.addEventListener('click', () => {
   cardBlock.classList.add('card-disabled');
   btnPlay.classList.remove('op-0');
   btnRestart.classList.add('op-0');
   timer.classList.remove('timer-red');

   timerStopGame();
   newGameReset();
});


