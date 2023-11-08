export function createBG() {
  const appWrap = document.getElementById('app-wrap');
  appWrap.style.backgroundImage = 'url(img/starWars.jpeg)';
  appWrap.style.backgroundSize = 'cover';
  appWrap.style.backgroundPosition = 'center';
  appWrap.style.height = '100vh';

  return appWrap;
}

export function createLogo() {
  const logo = document.createElement('img');
  logo.src = 'img/logo.png';
  logo.alt = 'Star Wars';

  return logo;
}

export function createBackBtn() {
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.textContent = 'Back to episodes';
  backBtn.classList.add('back-btn');

  return backBtn;
}

export function wrap(createItem){
  const container = document.createElement('div');
  container.classList.add('container');
  // ---------------------------------------------
  const wrapItem = document.createElement('div');
  wrapItem.classList.add('wrap-item');
  // ---------------------------------------------
  let itemFunk = createItem;
  // ---------------------------------------------
  container.append(wrapItem);
  wrapItem.append(itemFunk);

  return container;
};

