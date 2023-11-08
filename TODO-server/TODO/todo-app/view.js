
function createAppTitle(title) {
   let appTitle = document.createElement('h2');
   appTitle.innerHTML = title;
   return appTitle;
}

function createTodoItemForm() {
   const form = document.createElement('form');
   const input = document.createElement('input');
   const buttonWrapper = document.createElement('div');
   const button = document.createElement('button');
   //------------------------------------------------------------
   form.classList.add('input-group', 'mb-3');
   input.classList.add('form-control');
   input.placeholder = 'Введите название нового дела';
   buttonWrapper.classList.add('input-group-append');
   button.classList.add('btn', 'btn-primary');
   button.textContent = 'Добавить новое дело';
   //------------------------------------------------------------
   
   button.disabled = true;
   input.addEventListener('input', () => button.disabled = input.value === '' ? true : false);

   buttonWrapper.append(button);
   form.append(input);
   form.append(buttonWrapper);

   return {
      form,
      input,
      button,
   }
}

function createTodoList() {
   let list = document.createElement('ul');
   list.classList.add('list-group');
   return list;
}

export { createAppTitle, createTodoItemForm,  createTodoList};