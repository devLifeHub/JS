import { Card } from './Card.js';

export class AmazingCard extends Card {

   constructor(cardNumber, action) {
      super(cardNumber, action);
      this.cardNumber = cardNumber;
   }

   set cardNumber(value) {
      const cardsImgArray = ['../img/front/front-1.png', '../img/front/front-2.png', '../img/front/front-3.png', '../img/front/front-4.png', '../img/front/front-5.png', '../img/front/front-6.png'];
      this._img = document.createElement('img');
      this._img.src = `${cardsImgArray[value]}`;
      this._img.onerror = () => {
         this._img.src = '../img/default.png';
      };
   }

   get cardNumber() {
      return this._img;
   }
}