import './index.html';
// ===================================
import { el, setChildren } from 'redom';
import creditCardType from 'credit-card-type';
import Inputmask from 'inputmask';
// ===================================
import mastercard from './assets/img/mastercard.png';
import mir from './assets/img/mir.png';
import visa from './assets/img/visa.png';
import noSystem from './assets/img/noSystem.png';
// ===================================
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// ===================================
const $app = document.getElementById('app');
$app.className = 'container';
// ===================================
const h1 = el('h1', 'Онлайн-оплата');
// ===================================
const form = el('form');
// ===================================
const btn = el('button', {
   type: "submit"
}, 'Оплатить');

btn.className = 'btn btn-primary';
btn.disabled = true;

btn.addEventListener('click', (event) => {
   event.preventDefault();
});

function done(block, input, isValid, text) {
   block.classList.remove('valid:false');
   block.classList.add('valid:true');
   // ===================================
   input.classList.add('is-valid');
   // ===================================
   isValid.classList.add('valid-feedback');
   isValid.textContent = text;
   // ===================================
   if (blockNum.classList.contains('valid:true') && 
      blockExp.classList.contains('valid:true') &&
      blockKey.classList.contains('valid:true') &&
      blockEmail.classList.contains('valid:true')) {
         btn.disabled = false;
   }
}

function undone(block, input, isValid, text) {
   block.classList.remove('valid:true');
   block.classList.add('valid:false');
   // ===================================
   input.classList.add('is-invalid');
   // ===================================
   isValid.classList.add('invalid-feedback');
   isValid.textContent = text;
   // ===================================
   if (blockNum.classList.contains('valid:false') || 
      blockExp.classList.contains('valid:false') ||
      blockKey.classList.contains('valid:false') ||
      blockEmail.classList.contains('valid:false')) {
         btn.disabled = true;
   }
}

// Номер карты
function inputNum(block) {
   console.log(block);
   const input = block.querySelector('input');
   const isValid = block.querySelector('div');

   input.setAttribute('style', 'width: 80%;');

   const img = el('img', {
      class: 'position-absolute',
      alt: 'Система оплаты',
   });

   img.setAttribute('style', 'right: 3%; top: 0;');
   img.style.display = 'none';
   input.insertAdjacentElement('afterend', img);

   // ===================================
   input.addEventListener('blur', () => {
      const inputValue = input.value;
      const sanitizedValue = inputValue.replace(/\s+/g, '');
      // ===================================
      if (sanitizedValue.length === 16) {
         console.log(sanitizedValue.length);
         done(block, input, isValid, 'Номер карты введен верно!');
      } else {
         undone(block, input, isValid, 'Введите корректный номер карты')
      }
   });
   // ===================================
   input.addEventListener('input', () => {
      const cardType = creditCardType(input.value)[0];
      if (input.value.length === 0) {
         return img.style.display = 'none';
      } else if (cardType === undefined) {
         img.style.display = 'block';
         return img.src = noSystem;
      } else {
         img.style.display = 'block';
         if (cardType.type === "visa") {
            img.src = visa;
         } else if (cardType.type === 'mastercard') {
            img.src = mastercard;
         } else if (cardType.type === 'mir') {
            img.src = mir;
         } else {
            img.src = noSystem;
         }
      }
   })
}

// Дата окончания
function inputExp(block) {
   const input = block.querySelector('input');
   const isValid = block.querySelector('div');
   // ===================================
   input.addEventListener('blur', () => {
      let inputValue = input.value;
      const sanitizedValue = inputValue.replace(/\s+/g, '').replace(/\//g, '');
      // ===================================
      if (sanitizedValue.length === 4) {
         const currentYear = new Date().getFullYear().toString().substr(-2);
         const currentMonth = (new Date().getMonth() + 1).toString();
         const inputMonth = parseInt(sanitizedValue.slice(0, 2));
         const inputYear = parseInt(sanitizedValue.slice(2, 4));
   
         if (
            (inputMonth >= 1 && inputMonth <= 12 && inputYear > parseInt(currentYear)) ||
            (inputMonth == currentMonth && inputYear == parseInt(currentYear))
         ) {
            inputValue = sanitizedValue.replace(/(\d{2})(\d{2})/, '$1/$2');
            done(block, input, isValid, 'Дата окончания введен верно!');
         } else {
            undone(block, input, isValid, 'Введите корректную дату окончания');
         }
      } else {
         undone(block, input, isValid, 'Введите корректную дату окончания');
      }
   });
}

// CVC/CVV
function inputKey(block) {
   const input = block.querySelector('input');
   const isValid = block.querySelector('div');
   // ===================================
   input.addEventListener('blur', () => {
      const inputValue = input.value;
      const sanitizedValue = inputValue.replace(/\s+/g, '');
      // ===================================
      if (sanitizedValue.length === 3) {
         done(block, input, isValid, 'Код CVC/CVV введен верно!');
      } else {
         undone(block, input, isValid, 'Введите корректный код CVC/CVV');
      }
   })
}

// Email
function inputEmail(block) {
   const input = block.querySelector('input');
   const isValid = block.querySelector('div');
   // ===================================
   input.addEventListener('blur', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const inputValue = input.value;
      const isEmailValid = emailRegex.test(inputValue);
      // ===================================
      if (isEmailValid) {
         done(block, input, isValid, 'Email введен верно!');
      } else {
         undone(block, input, isValid, 'Введите корректный Email');
      }
   })
}

function createBlock(title, cardName, mask, placeholder) {
   const block = el('div');
   block.className = 'position-relative';
   // ===================================
   const label = el('label', { for: cardName }, title);
   label.className = 'form-label';
   // ===================================
   const input = el('input', { type: "text", name: cardName, id: cardName });
   input.className = 'form-control';
   input.setAttribute('placeholder', placeholder);

   // ===================================
   const isValid = el('div');
   isValid.style.height = '30px';
   // ===================================
   Inputmask({
      mask: mask,
      placeholder: "",
      greedy: false
   }).mask(input);
   // ===================================
   input.addEventListener('input', () => {
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');

      isValid.classList.remove('valid-feedback');
      isValid.classList.remove('invalid-feedback');
      isValid.textContent = '';
   });
   // ===================================
   setChildren(block, [label, input, isValid]);
   // ===================================
   return block;
}

const blockNum = createBlock('Номер карты', "cardNumber", "9999 9999 9999 9999", "0000 0000 0000 0000");
const blockExp = createBlock('Дата окончания', "cardExpiryDate", "99/99", "мм/гг");
const blockKey = createBlock('CVC/CVV', "cardKey", "999", "000");
const blockEmail = createBlock('Email', "email", "", "exemple@mail.ru");
// ===================================
inputNum(blockNum);
inputExp(blockExp);
inputKey(blockKey);
inputEmail(blockEmail);
// ===================================
setChildren(form, [blockNum, blockExp, blockKey, blockEmail, btn]);
setChildren($app, h1, form);