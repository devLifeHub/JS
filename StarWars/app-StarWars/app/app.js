import { createBG } from './wrap.js';
import { createLogo, createBackBtn } from './wrap.js';

export const objNum = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI' };
const cssPromises = {};

createBG();

function loadResource(src) {

  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }

  return fetch(src).then(res => res.json());
}

const appWrap = document.getElementById('app-wrap');
const appContainer = document.getElementById('app');

const SWITCH_STORAGE_KEY = 'isFlag';

if (!localStorage.getItem(SWITCH_STORAGE_KEY)) {
  localStorage.setItem(SWITCH_STORAGE_KEY, 'false');
}

let isLocalStorageFlag = localStorage.getItem(SWITCH_STORAGE_KEY) === 'true';

function renderPage(moduleWrap, moduleName, apiURL, cssBS, css, func) {
  Promise.all([moduleWrap, moduleName, apiURL, cssBS, css].map(src => loadResource(src)))
    .then(([moduleWrap, pageModule, data]) => {
      appContainer.innerHTML = '';
      if (isLocalStorageFlag) {
        appWrap.insertBefore(moduleWrap.wrap(createBackBtn()), appContainer);
      } else {
        appWrap.insertBefore(moduleWrap.wrap(createLogo()), appContainer);
      }
      appContainer.append(pageModule.render(data));
    })
    .then(() => func());
}


let setIndex;

const indexFromLocalStorage = localStorage.getItem('episode');
if (indexFromLocalStorage !== null) {
  setIndex = parseInt(indexFromLocalStorage);
}

if (isLocalStorageFlag) {
  renderPage(
    './wrap.js',
    './episode.js',
    `https://swapi.dev/api/films/${setIndex}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    './style.css',
    clickBackBtn
  );
} else {
  renderPage(
    './wrap.js',
    './catalog-episode.js',
    `https://swapi.dev/api/films`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    './style.css',
    clickDetailsLink
  );
}

function clickDetailsLink(setIndex) {
  const detailsLinks = document.querySelectorAll('.details-link');
  detailsLinks.forEach((element, index) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();

      setIndex = index + 1;
      localStorage.setItem('episode', setIndex);
      localStorage.setItem(SWITCH_STORAGE_KEY, 'true');

      location.reload();
    });
  });
}

function clickBackBtn() {
  const backBtn2 = document.querySelector('.back-btn');
  backBtn2.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.removeItem('episode');
    localStorage.setItem(SWITCH_STORAGE_KEY, 'false');

    location.reload();
  });
}
