import { render } from './list-product.js';
import { createError } from './error.js';

window.addEventListener('load', () => {

  const appListProduct = document.getElementById('app');
  appListProduct.classList.add('container');

  (() => {
    // loader
    function createLoader() {
      const loaderDiv = document.createElement('div');
      loaderDiv.style.cssText = 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto;';
      loaderDiv.classList.add('spinner-border', 'text-primary');
      loaderDiv.setAttribute('role', 'status');

      const loaderSpan = document.createElement('span');
      loaderSpan.classList.add('visually-hidden');
      loaderSpan.textContent = 'Loading...';

      loaderDiv.appendChild(loaderSpan);

      return loaderDiv;
    }

    // ================================
    function createNavStatus(status) {
      const blockNav = document.createElement('div');
      blockNav.classList.add('alert', 'alert-info');
      blockNav.style.width = '30rem';
      blockNav.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 100; width: 30rem;';

      const titleNav = document.createElement('h3');
      titleNav.classList.add('text-center');
      titleNav.textContent = 'Сетевой статус: ' + status;

      blockNav.append(titleNav);

      return blockNav;
    }

    // ================================
    function startStatus(stat) {
      const navStatus = createNavStatus(stat);
      const navAnimation = gsap.fromTo(navStatus, { opacity: 0, transform: 'translateY(-20%)' }, { opacity: 1, transform: 'translateY(0)', duration: 1 });
      appListProduct.appendChild(navStatus);
      setTimeout(() => {
        navAnimation.reverse();
      }, 3000);
    }

    if (navigator.onLine) {
      startStatus('online');
    } else {
      startStatus('offline');
    }

    // ================================
    const loader = createLoader();
    appListProduct.append(loader);
    const productsPromise = fetch('http://localhost:3000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status || response.name);
        }
        return response.json();
      })
      .then(data => data.products)
      .catch(error => {
        loader.remove();
        if (error.message === '500' || error instanceof SyntaxError) {
          const error = createError('Произошла ошибка, попробуйте обновить страницу позже');
          appListProduct.appendChild(error);
        } else if (error.message === '404') {
          const error = createError('Список товаров пуст');
          appListProduct.appendChild(error);
        }
      });

    return Promise.all([productsPromise])
      .then(([products]) => {
        loader.remove();
        console.log([products]);
        const productList = render(products);
        appListProduct.append(productList);
      });
  })();
});
