// #__________________shirts card__________________
class Card extends CardContent {
   constructor(cardBlock, number, action) {
      super (cardBlock, number, action);

      this.bgCardOne = document.getElementById('bgCard-1');
      this.bgCardTwo = document.getElementById('bgCard-2');
      this.bgCardTrue = document.getElementById('bgCard-3');
      this.bgCardFour = document.getElementById('bgCard-4');


      this.bgCardOne.addEventListener ('click',  () => {
         this.card.classList.remove ('card__bg__img-2', 'card__bg__img-3', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-1');

         cardBlock.classList.remove ('bgTest-2', 'bgTest-3', 'bgTest-4');
         cardBlock.classList.add('bgTest-1');
      });
   
      this.bgCardTwo.addEventListener ('click', () => {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-3', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-2');

         cardBlock.classList.remove ('bgTest-1', 'bgTest-3', 'bgTest-4');
         cardBlock.classList.add('bgTest-2');
      });
   
      this.bgCardTrue.addEventListener ('click', () => {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-2', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-3');

         cardBlock.classList.remove ('bgTest-1', 'bgTest-2', 'bgTest-4');
         cardBlock.classList.add('bgTest-3');
      });
   
      this.bgCardFour.addEventListener ('click', () =>  {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-2', 'card__bg__img-3');
         this.card.classList.add('card__bg__img-4');

         cardBlock.classList.remove ('bgTest-1', 'bgTest-2', 'bgTest-3');
         cardBlock.classList.add('bgTest-4');
      });

      if (cardBlock.classList.contains('bgTest-1')) {
         this.card.classList.remove ('card__bg__img-2', 'card__bg__img-3', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-1');
      } else if (cardBlock.classList.contains('bgTest-2')) {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-3', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-2');
      } else if (cardBlock.classList.contains('bgTest-3')) {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-2', 'card__bg__img-4');
         this.card.classList.add('card__bg__img-3');
      } else if (cardBlock.classList.contains('bgTest-4')) {
         this.card.classList.remove ('card__bg__img-1', 'card__bg__img-2', 'card__bg__img-3');
         this.card.classList.add('card__bg__img-4');
      } else {
         this.card.classList.add('card__bg__img-1');
      }
   }
}