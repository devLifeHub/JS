// #__________________background game__________________
function background() {
   const bgOne = document.getElementById('bg-1');
   const bgTwo = document.getElementById('bg-2');
   const bgTrue = document.getElementById('bg-3');
   const bgFour = document.getElementById('bg-4');

   bgOne.addEventListener('click', function () {
      container.classList.remove('bg-neon', 'bg-space', 'bg-wall');
      container.classList.add('bg-wood');
   });

   bgTwo.addEventListener('click', function () {
      container.classList.remove('bg-wood', 'bg-neon', 'bg-wall');
      container.classList.add('bg-space');
   });

   bgTrue.addEventListener('click', function () {
      container.classList.remove('bg-wood', 'bg-space', 'bg-neon');
      container.classList.add('bg-wall');
   });

   bgFour.addEventListener('click', function () {
      container.classList.remove('bg-wood', 'bg-space', 'bg-wall');
      container.classList.add('bg-neon');
   });
}