// import {createTodoAppLs} from '../todo-app'
import { createAppTitle, createTodoItemForm,  createTodoList } from './view.js';

let arrayCase = [];
// #____________________list-item___________________
function createTodoListItem (name) {

   const item = document.createElement('li');
   const buttonGroup = document.createElement('div');
   const doneButton = document.createElement('button');
   const deleteButton = document.createElement('button');
   //------------------------------------------------------------
   const randomId = Math.random() * 34.67;
   item.id = randomId.toFixed(2);
   //------------------------------------------------------------
   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
   item.textContent = name;

   doneButton.classList.add('btn', 'mr-3', 'btn-success');
   doneButton.textContent = 'Готово';

   deleteButton.classList.add('btn', 'btn-danger');
   deleteButton.textContent = 'Удалить';
   //------------------------------------------------------------
   buttonGroup.append(doneButton, deleteButton);
   item.append(buttonGroup);
   //------------------------------------------------------------
   return {
      item,
      buttonGroup,
      doneButton,
      deleteButton,
   }
}

// #____________________btn-done___________________
function actDoneBtn(doneButton, item, owner = 'Me') {
   doneButton.addEventListener('click', () => {
      item.classList.toggle('list-group-item-success');
      //------------------------------------------------------------
      arrayCase = JSON.parse(localStorage.getItem(owner));
      changeItemDone(arrayCase, item);
      localStorage.setItem(owner, JSON.stringify(arrayCase));
   });
}

// #____________________btn-done true/false___________________
function changeItemDone(array, item) {

   array.map(object => {
      if (object.id === item.id & object.done === false) {
         object.done = true;
      } else if (object.id === item.id & object.done === true) {
         object.done = false;
      }
   });
}

// #____________________btn-delete___________________
function actDeleteBtn(deleteButton, item, owner = 'Me') {
   deleteButton.addEventListener('click', () => {
      if (confirm('Вы действительно хотите удалить дело?')) {
         arrayCase = JSON.parse(localStorage.getItem(owner));
         const newArrayCase = arrayCase.filter(object => object.id !== item.id);
         localStorage.setItem(owner, JSON.stringify(newArrayCase));
         item.remove();
      }
   });
}


// #____________________collector - main func___________________
function createTodoAppLs(container, title, key = 'listCase-1') {

   const appTitle = createAppTitle(title);
   const appForm = createTodoItemForm();
   const appList = createTodoList();
   //------------------------------------------------------------
   container.append(appTitle, appForm.form, appList);
   //------------------------------------------------------------
   if (localStorage.getItem(key)) {
      arrayCase = JSON.parse(localStorage.getItem(key));

      for (const object of arrayCase) {
         const todoItem = createTodoListItem(appForm.input.value);

         todoItem.item.textContent = object.name;
         todoItem.item.id = object.id;

         if (object.done == true) {
            todoItem.item.classList.add('list-group-item-success');
         } else {
            todoItem.item.classList.remove('list-group-item-success');
         }

         actDoneBtn(todoItem.doneButton, todoItem.item);
         actDeleteBtn(todoItem.deleteButton, todoItem.item);

         appList.append(todoItem.item);
         todoItem.item.append(todoItem.buttonGroup);
      }
   }

   // #____________________form - submit___________________
   appForm.form.addEventListener('submit', e => {
      e.preventDefault();
      //------------------------------------------------------------
      const todoItem = createTodoListItem(appForm.input.value);
      //------------------------------------------------------------
      if (!appForm.input.value) {
         return;
      }
      //------------------------------------------------------------
      actDoneBtn(todoItem.doneButton, todoItem.item);
      actDeleteBtn(todoItem.deleteButton, todoItem.item);
      //------------------------------------------------------------
      const localStorageData = localStorage.getItem(key);
      if (localStorageData == null) {
         arrayCase = [];
      } else {
         arrayCase = JSON.parse(localStorageData);
      }
      //------------------------------------------------------------
      const createItemArray = (array) => {
         const itemArray = {};
         itemArray.name = appForm.input.value;
         itemArray.id = todoItem.item.id;
         itemArray.done = false;

         array.push(itemArray);
      }

      createItemArray(arrayCase);
      localStorage.setItem(key, JSON.stringify(arrayCase));
      //------------------------------------------------------------
      appList.append(todoItem.item);
      //------------------------------------------------------------
      appForm.input.value = '';
      //------------------------------------------------------------
   });
}

export default createTodoAppLs;