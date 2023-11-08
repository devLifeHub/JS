import {list} from './main.js';

export class Card {
   _open = false;
   _success = false;
   _cardNumber;
   _img;

   constructor(cardNumber, action) {
      this.card = document.createElement('li');
      this.card.classList.add('card');
      this.number = cardNumber;
      
      this.card.addEventListener('click', () => {
         if (this.open == false && this.success == false) {
            this.open = true;
            action(this);
         }
      })

      list.append(this.card);
   }

   set cardNumber(value) {
      this._cardNumber = value;
   }
   
   get cardNumber() {
      return this._cardNumber;
   }
   
   set open(value) {
      this._open = value;
      value ? this.card.append(this._img) : this._img.remove();
      value ? this.card.classList.add('open') : this.card.classList.remove('open');
   }
 
   get open() {
     return this._open;
   }
 
   set success(value) {
     this._success = value;
     value ? this._img.remove() : this.card.append(this._img);
     value ? this.card.classList.add('success') : this.card.classList.remove('success');
   }
 
   get success() {
     return this._success;
   }
}
