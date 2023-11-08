export function createError(errorText) {
  const blockError = document.createElement('div');
  blockError.classList.add('alert', 'alert-info');
  blockError.style.width = '30rem';
  blockError.style.cssText = 'position: absolute; bottom: 0; right: 20px; width: 30rem;';

  const animError = gsap.fromTo(blockError, {opacity: 0,transform: 'translateY(20%)'}, {opacity: 1, transform: 'translateY(0)', duration: 1});

  const titleError = document.createElement('h3');
  titleError.classList.add('text-center', 'mb-4');
  titleError.textContent = errorText;

  const bodyBtnError = document.createElement('div');
  bodyBtnError.classList.add('d-flex', 'justify-content-around');

  const updateBtnError = document.createElement('button');
  updateBtnError.classList.add('btn', 'btn-primary');
  updateBtnError.textContent = 'Обновить';
  updateBtnError.onclick = () => location.reload();

  const closeBtnError = document.createElement('button');
  closeBtnError.classList.add('btn', 'btn-danger');
  closeBtnError.textContent = 'Закрыть';
  closeBtnError.onclick = () => animError.reverse();

  blockError.append(titleError);
  blockError.append(bodyBtnError);
  bodyBtnError.append(updateBtnError, closeBtnError);

  return blockError;
}
