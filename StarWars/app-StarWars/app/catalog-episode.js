import { objNum } from './app.js';

export function render(data) {

  const container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('app-container');
  // ---------------------------------------------
  const list = document.createElement('ul');
  list.classList.add('list');
  // ---------------------------------------------
  for (const episode of data.results) {
    const item = document.createElement('li');
    item.classList.add('container');
    item.classList.add('item');
    // ---------------------------------------------
    const details = document.createElement('a');
    details.classList.add('item-link', 'details-link');
    // ---------------------------------------------
    const title = document.createElement('h2');
    title.classList.add('title', 'flex-center');
    // ---------------------------------------------
    const textEpisode = document.createElement('p');
    textEpisode.classList.add('item-text', 'flex-center');
    textEpisode.innerHTML = 'Episode ' + `${objNum[episode.episode_id]}`;
    // ---------------------------------------------
    const textDate = document.createElement('p');
    textDate.classList.add('item-text', 'flex-center');
    textDate.innerHTML = "Release data:<br>";
    
    const date = document.createElement('time');
    date.setAttribute('datetime', `${episode.release_date}`);

    const dateObj = new Date(episode.release_date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('ru-RU', options);

    title.textContent = episode.title;
    date.textContent = formattedDate;

    container.append(list);
    list.append(item);
    item.append(details);
    textDate.append(date);
    details.append(textEpisode);
    details.append(title);
    details.append(textDate);
  }

  return container;
}



// export function clickDetails() {
//   const detailsLinks = document.querySelectorAll('.details-link');
//   detailsLinks.forEach(link => {
//     link.addEventListener('click', () => {
//       preventDefault();
//       console.log('12345');
//     });
//   });
// };
