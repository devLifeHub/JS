// Задание 1
m = -5;
n = 100;

let count = [];

for (let i = 1; i < 70; ++i) {
  let max = Math.max(m, n);
  let min = Math.min(m, n);
  let range = max - min;
  let random = Math.round(Math.random() * range) + min;
  count.push(random);
}

console.log(count);

// Задание 2
let str = "Привет, Мир!";
let strRev = "";

for (i = str.length - 1; i >= 0; i--) {
  strRev = strRev + str[i];
}

console.log(strRev);

// Задание 3
let roadMines = [true, false, false, false, false, false, false, false, false, true];
let mine = true;

for (let i = 0; i < roadMines.length; i++) {
  console.log(`танк переместился на ${parseInt(i) + 1}`);
  if (roadMines[i] === false) {
  } else if (mine === true) {
    console.log('танк повреждён');
    mine = false;
  } else {
    console.log('танк уничтожен');
    break;
  }
}

// Задание 4
let startDay = 1;
let daysWeek = ['вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье', 'понедельник'];

for (let i = 0; i < 31; i++) {
  let dayMonth = startDay + i;
  let daysMonth = daysWeek[(i) % daysWeek.length];
  console.log(`${dayMonth} января,${daysMonth}`);
}
