// #__________________card content__________________
class CardContent {
   _open = false;
   _success = false;

   constructor(cardBlock, number, action) {
      this.card = document.createElement('div');
      this.card.classList.add('card');
      this.card.classList.add('card__bg');
      this.card.textContent = number;
      this.number = number;

      // #-------------------------------click card-------------------------------
      this.card.addEventListener('click', () => {
         if (this.open == false && this.success == false) {
            this.open = true;
            action(this);
         }
      });

      cardBlock.append(this.card);
   }

   // #-------------------------------get & set-------------------------------
   set open(value) {
      this._open = value
      value ? this.card.classList.add('open') : this.card.classList.remove('open')
   }

   get open() {
      return this._open
   }

   set success(value) {
      this._success = value
      value ? this.card.classList.add('success') : this.card.classList.remove('success')
   }

   get success() {
      return this._success
   }
}

