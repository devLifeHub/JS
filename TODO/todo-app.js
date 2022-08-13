// #____________________title___________________
const createTodoTitle = (title) => {
   let appTodoTitle = document.createElement('h2');
   appTodoTitle.innerHTML = title;
   return appTodoTitle;
}


// #____________________form___________________
const createTodoForm = () => {
   let form = document.createElement('form');
   let input = document.createElement('input');
   let wrapperBtn = document.createElement('div');
   let addBtn = document.createElement('button');
   //------------------------------------------------------------
   addBtn.disabled = !input.value.length;

   input.addEventListener('input', () => {
      addBtn.disabled = !input.value.length;
   });
   //------------------------------------------------------------
   form.classList.add('input-group', 'mb-3');

   input.classList.add('form-control');
   input.placeholder = 'Введите название дела';

   wrapperBtn.classList.add('input-group-append');

   addBtn.classList.add('btn', 'btn-primary');
   addBtn.textContent = 'Добавить дело';
   //------------------------------------------------------------
   wrapperBtn.append(addBtn);
   form.append(input);
   form.append(wrapperBtn);
   //------------------------------------------------------------
   return {
      form,
      input,
      addBtn,
   }
}

// #____________________list___________________
const createTodoList = () => {
   let list = document.createElement('ul');
   list.classList.add('list-group');
   return list;
}

// #____________________list-item___________________
const createTodoListItem = (name) => {
   let item = document.createElement('li');
   let wrapperBtn = document.createElement('div');
   let doneBtn = document.createElement('button');
   let deleteBtn = document.createElement('button');
   //------------------------------------------------------------
   const randomId = Math.random() * 34.67;
   item.id = randomId.toFixed(2);
   //------------------------------------------------------------
   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
   item.textContent = name;

   doneBtn.classList.add('btn', 'mr-3', 'btn-success');
   doneBtn.textContent = 'Готово';

   deleteBtn.classList.add('btn', 'btn-danger');
   deleteBtn.textContent = 'Удалить';
   //------------------------------------------------------------
   wrapperBtn.append(doneBtn, deleteBtn);
   item.append(wrapperBtn);
   //------------------------------------------------------------
   return {
      item,
      wrapperBtn,
      doneBtn,
      deleteBtn,
   }
}

// #____________________btn-done___________________
function actDoneBtn(btn, item) {
   btn.addEventListener('click', () => {
      item.classList.toggle('list-group-item-success');
      //------------------------------------------------------------
      arrayCase = JSON.parse(localStorage.getItem(key));
      changeItemDone(arrayCase, item);
      localStorage.setItem(key, JSON.stringify(arrayCase));
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
function actDeleteBtn(btn, item) {
   btn.addEventListener('click', () => {
      if (confirm('Вы действительно хотите удалить дело?')) {
         arrayCase = JSON.parse(localStorage.getItem(key));
         const newArrayCase = arrayCase.filter(object => object.id !== item.id);
         localStorage.setItem(key, JSON.stringify(newArrayCase));
         item.remove();
      }
   });
}

let arrayCase = [];

// #____________________collector - main func___________________
function createTodoApp(container, title, key) {
   const appTitle = createTodoTitle(title);
   const appForm = createTodoForm();
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

         actDoneBtn(todoItem.doneBtn, todoItem.item);
         actDeleteBtn(todoItem.deleteBtn, todoItem.item);

         appList.append(todoItem.item);
         todoItem.item.append(todoItem.wrapperBtn);

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
      actDoneBtn(todoItem.doneBtn, todoItem.item);
      actDeleteBtn(todoItem.deleteBtn, todoItem.item);
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
      appForm.addBtn.disabled = !appForm.addBtn.disabled;
   });
}
