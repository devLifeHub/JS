import { createAppTitle, createTodoItemForm,  createTodoList } from './view.js';
function createTodoItemElement(todoItem, { onDone, onDelete }) {
   const doneClass = 'list-group-item-success';

   const item = document.createElement('li');
   const buttonGroup = document.createElement('div');
   const doneButton = document.createElement('button');
   const deleteButton = document.createElement('button');
   //------------------------------------------------------------
   doneButton.classList.add('btn', 'mr-3', 'btn-success');
   doneButton.textContent = 'Готово';
   
   deleteButton.classList.add('btn', 'btn-danger');
   deleteButton.textContent = 'Удалить';
   //------------------------------------------------------------
   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
   if (todoItem.done) {
      item.classList.add(doneClass);
   }
   item.textContent = todoItem.name;

   doneButton.addEventListener('click', () => {
      onDone({ todoItem, element: item });
      item.classList.toggle(doneClass, todoItem.done);
   });
   
   deleteButton.addEventListener('click', () => {
      onDelete({ todoItem, element: item });
   });
   //------------------------------------------------------------
   buttonGroup.append(doneButton, deleteButton);
   item.append(buttonGroup);
   //------------------------------------------------------------
   return item;
}

async function createTodoApp(container, { 
   title,
   owner,
   todoItemList = [],
   onCreateFormSubmit, 
   onDoneClick, 
   onDeleteClick }) {

   const todoAppTitle = createAppTitle(title);
   const todoItemForm = createTodoItemForm();
   const todoList = createTodoList();
   const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

   container.append(todoAppTitle);
   container.append(todoItemForm.form);
   container.append(todoList);

   todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
   });

   todoItemForm.form.addEventListener('submit', async e => {
      e.preventDefault();

      if (!todoItemForm.input.value) {
         return;
      }

      const todoItem = await onCreateFormSubmit({
         owner,
         name: todoItemForm.input.value.trim(),
      });
 
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
      todoItemForm.input.value = '';
   });
}

export { createTodoApp };