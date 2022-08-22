let inputNumber = document.querySelector('.number__input');
let startNumber = document.querySelector('.number__start');

let btnStart = document.querySelector('.btn__start');
let btnStop = document.querySelector('.btn__stop');

let interval;

startNumber.innerHTML = 0;

btnStart.addEventListener('click', function () {
  btnStop.classList.remove('dn');
  startNumber.innerHTML = inputNumber.value;
  interval = setInterval(numNum, 1000);
});

btnStop.addEventListener('click', function () {
  btnStop.classList.add('dn');
  clearInterval(interval);
});

function numNum() {
  if (inputNumber.value > 0) {
    startNumber.innerHTML--;
    inputNumber.value--;
    if (inputNumber.value < 0 || inputNumber.value == 0 || startNumber.innerHTML == 0) {
      btnStop.classList.add('dn');
      startNumber.innerHTML = 0;
      inputNumber.value = 0;
      clearInterval(interval);
    }
  } else {
    btnStop.classList.add('dn');
    startNumber.innerHTML = 0;
    inputNumber.value = 0;
    clearInterval(interval);
  }
}
