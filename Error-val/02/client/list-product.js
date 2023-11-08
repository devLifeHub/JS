export function render(data) {

  const listCard = document.createElement('ul');
  listCard.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px; padding:0;';
  for (const card of data) {
    const itemCard = document.createElement('li');
    itemCard.classList.add('card');
    const imgCard = document.createElement('img');
    imgCard.src = card.image;
    imgCard.classList.add('card-img-top');
    const bodyCard = document.createElement('div');
    bodyCard.classList.add('card-body');
    const titleCard = document.createElement('h2');
    titleCard.textContent = card.name;
    titleCard.classList.add('card-img-top');
    const priceCard = document.createElement('span');
    priceCard.textContent = card.price;

    itemCard.append(imgCard);
    itemCard.append(bodyCard);
    bodyCard.append(titleCard);
    bodyCard.append(priceCard);

    listCard.append(itemCard);
  }

  return listCard;
}


