const h2 = document.createElement('h2');
const input = document.createElement('input');

h2.textContent = 'Текст';
input.placeholder = 'Введите текст'

document.body.style.cssText = `width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column`;
h2.style.cssText = `margin-bottom: 50px; width: 500px; height: 100px; font-size: 84px; text-align: center`;
input.style.cssText = `width: 500px; height: 50px; font-size: 32px; text-align: center`;

document.body.append(h2, input);

input.addEventListener('keydown', function () {

  function text() {
    h2.textContent = input.value;
  };

  setTimeout(text, 1000);
});
