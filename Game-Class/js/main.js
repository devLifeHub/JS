import { AmazingCard } from './AmazingCard.js';

let interval;

// =============== app ====================
const $app = document.getElementById('app');
$app.style.backgroundColor = color(100, 255);
$app.classList.add('app-container');

function rendInt(min, max) {
   let rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

function color(a,b) {
   return `rgb(${rendInt(a, b)}, ${rendInt(a, b)}, ${rendInt(a, b)})`;
}

// =============== title ====================
const createTitle = () => {
   const title = document.createElement('h1');
   title.classList.add('title');
   title.textContent = 'Star Game';
   return title;
}

// =============== list ====================
const createList = () => {
   const list = document.createElement('ul');
   list.classList.add('list', 'noClick');
   return list;
}

// =============== svg ====================
const createSVG = (w, h, f, s, name = 'start', fz = '11px', ff = '#2effcd') => {
   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   svg.setAttribute('width', w);
   svg.setAttribute('height', h);
   svg.setAttribute('viewBox', '0 0 96 91');  // 96 91

   const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   path.setAttribute('d', 'M48 2.77558L63.7837 27.3491L64.0995 27.8409L64.6648 27.9893L92.9131 35.4068L74.4197 58.0117L74.0496 58.464L74.0831 59.0475L75.7578 88.2054L48.5446 77.6023L48 77.3902L47.4554 77.6023L20.2422 88.2054L21.9169 59.0475L21.9504 58.464L21.5803 58.0117L3.08691 35.4068L31.3352 27.9893L31.9005 27.8409L32.2163 27.3491L48 2.77558Z');
   path.setAttribute('fill', f);
   path.setAttribute('stroke', s);
   path.setAttribute('stroke-width', '3');

   const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
   text.setAttribute('id', 'text-svg');
   text.setAttribute('x', '48');
   text.setAttribute('y', '48');
   text.setAttribute('text-anchor', 'middle');
   text.setAttribute('dominant-baseline', 'middle');
   text.setAttribute('fill', ff);
   text.setAttribute('font-size', fz);
   text.textContent = name; 

   svg.appendChild(path);
   svg.appendChild(text);
   return svg;
}

// =============== btn ====================
const createBtn = (svg, classCenter = null) => {
   const btn = document.createElement('button');
   btn.classList.add('btn-reset', classCenter);
   btn.append(svg);
   return btn;
}

// =============== btn start ====================
const btnStart = () => {
   const btn = (createBtn(createSVG('126', '121', 'black', '#2EFFCD', 'start', '18px'), 'btn-center'));
   btn.addEventListener('click', (event) => {
      event.preventDefault();
      const textSvg = document.getElementById('text-svg');
      if (list.classList.contains('noClick')) {
         list.classList.toggle('noClick');
         timerStartGame(textSvg);
      } else {

         const classToCountMap = {'sex': 6, 'eight': 8, 'ten': 10, 'twelve': 12 };
         
         const className = list.classList[1];
         const countArg = classToCountMap[className] || 12;

         zeroing(countArg, className);
      }
   });
   return btn;
}

// ================= zeroing ===========================
function zeroing(num = 12, card = 'twelve') {
   const textSvg = document.getElementById('text-svg');

   list.innerHTML = '';

   list.classList.remove('sex', 'eight', 'ten', 'twelve');
   list.classList.add(card);

   list.classList.add('noClick');

   clearInterval(interval);

   textSvg.innerHTML = 'start';

   count(num);
}

// =============== btn group ====================
const createGroupBtn = (n1, n2, n3, n4) => {
   const blockBtn = document.createElement('div');
   blockBtn.classList.add('btn-block');

   const sexCards = createBtn(createSVG('106', '101', '#ff9090', '#2effcd', n1));
   const eightCards = createBtn(createSVG('106', '101', '#ff6969', '#2effcd', n2));
   const tenCards = createBtn(createSVG('106', '101', '#ff2d27', '#2effcd', n3));
   const twelveCards = createBtn(createSVG('106', '101', '#ff0000', '#2effcd', n4));
   
   sexCards.addEventListener('click', () => zeroing(6, 'sex'));
   eightCards.addEventListener('click', () => zeroing(8, 'eight'));
   tenCards.addEventListener('click', () => zeroing(10, 'ten'));
   twelveCards.addEventListener('click', () => zeroing(12, 'twelve'));

   blockBtn.append(sexCards);
   blockBtn.append(eightCards);
   blockBtn.append(tenCards);
   blockBtn.append(twelveCards);

   return blockBtn;
}

// =============== timer ====================
function timerStartGame(textSvg) {

   interval = setInterval(timerGame, 1000);
   textSvg.innerHTML = 20;
   
   function timerGame() {
      textSvg.innerHTML--;
      textSvg.value = textSvg.innerHTML;
      
      if (textSvg.value == 0) {
         result('../img/gameOver.png', '#ff0000');
      }
   }
   
   return textSvg;
}

export const list = createList();

$app.append(createTitle());
$app.append(list);
$app.append(btnStart());
$app.append(createGroupBtn('6 cards', '8 cards', '10 cards', '12 cards'));

// =============== count ====================
function count(num) {
   let arr = [];
   for (let i = 0; i < num/2; i++) arr.push(i);
   let arrSort = arr.concat(arr).sort(() => Math.random() - 0.5);

   function flipWrapper(card) {
      flip(card, num);
   }

   for (let elem of arrSort) {
      new AmazingCard(elem, flipWrapper);
   }
}

// =============== flip ====================
let firstCard = null;
let secondCard = null;

function flip(card, num) {
   
   if (firstCard !== null && secondCard !== null) {
      firstCard.number != secondCard.number ? (firstCard.open = false, secondCard.open = false, firstCard = null, secondCard = null) : null;
   }
   
   firstCard == null ? firstCard = card : secondCard == null ? secondCard = card : null;

   if (firstCard !== null && secondCard !== null) {
      firstCard.number == secondCard.number ? (firstCard.success = true, secondCard.success = true, firstCard = null, secondCard = null) : null;
   }

   if (document.querySelectorAll('.card.success').length == num) result('../img/win.png', '#28c800');
}

// =============== result ====================
function result(path, btnColor) {
   const block = document.createElement('div');
   block.classList.add('block-result');

   const img = document.createElement('img');
   img.src = path;
   img.classList.add('img-result');

   const btn = createBtn(createSVG('156', '151', 'black', btnColor, 'Restart', '14px', btnColor));
   btn.classList.add('btn-result');
   btn.addEventListener('click', (event) => {
      event.preventDefault();
      block.remove();
   });
   
   zeroing();

   block.append(img);
   block.append(btn);
   $app.append(block);
}

count(12);