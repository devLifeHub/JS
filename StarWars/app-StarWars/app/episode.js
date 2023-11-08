import { objNum } from './app.js';

export function render(data) {

  const imageArr = ['img/bunner-4.jpeg', 'img/bunner-5.jpeg', 'img/bunner-6.jpeg', 'img/bunner-1.jpeg', 'img/bunner-2.jpeg', 'img/bunner-3.jpeg'];
  // ---------------------------------------------
  const container = document.createElement('div');
  container.classList.add('container', 'py-4');
  // ---------------------------------------------
  const content = document.createElement('div');
  content.classList.add('d-flex', 'justify-content-between');
  // ---------------------------------------------
  const contentDescr = document.createElement('div');
  contentDescr.classList.add('content-descr');
  // ---------------------------------------------
  let image = document.createElement('img');
  image.classList.add('image');
  image.src = imageArr[data.episode_id - 1];
  image.alt = 'Bunner ' + `${data.title}`;
  // ---------------------------------------------
  const title = document.createElement('h1');
  title.textContent = `${data.title} ` + `${objNum[data.episode_id]}`;
  // ---------------------------------------------
  const description = document.createElement('p');
  description.textContent = data.opening_crawl;
  // ---------------------------------------------
  function createItem(title, data) {
    const listContent = document.createElement('div');
    listContent.style.marginBottom = '20px';
    // ---------------------------------------------
    const titleItem = document.createElement('h5');
    titleItem.textContent = title;
    // ---------------------------------------------
    const list = document.createElement('ul');
    list.classList.add('list', 'list-flex');
    // ---------------------------------------------
    const promises = data.map(item => {
      return fetch(item)
      .then(response => response.json())
      .then(json => json.name);
    });
    // ---------------------------------------------
    Promise.all(promises)
    .then(names => {
      names.forEach(name => {
        const item = document.createElement('li');
        item.textContent = name + ' ';
        list.appendChild(item);
      });
    })
    // ---------------------------------------------
    listContent.append(titleItem);
    listContent.append(list);
    return listContent;
  }

  const listPlanets = createItem('Planets: ', data.planets);
  const listSpecies = createItem('Species: ', data.species);

  contentDescr.append(title);
  contentDescr.append(description);
  contentDescr.append(listPlanets);
  contentDescr.append(listSpecies);
  content.append(image);
  content.append(contentDescr);
  container.append(content);

  return container;
}

