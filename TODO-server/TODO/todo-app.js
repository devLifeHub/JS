let {default: createTodoAppLs} = await import('./todo-app/app-ls.js');
let {createTodoApp} = await import('./todo-app/app-api.js');
let {getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem} = await import('./todo-app/api.js');


const owner = 'Me';

const switchBtn = document.getElementById('switch-btn');

const SWITCH_STORAGE_KEY = 'isLocalStorageUsed';

let isLocalStorageUsed = localStorage.getItem(SWITCH_STORAGE_KEY) === 'true';


if (isLocalStorageUsed) {
   switchBtn.textContent = 'Перейти на серверное хранилище';
   
   createTodoAppLs(document.getElementById('todo-app'), 'Мои дела', owner );
} else {

   switchBtn.textContent = 'Перейти на локальное хранилище';

   (async () => {
      const todoItemList = await getTodoList(owner);
      createTodoApp(document.getElementById('todo-app'), { title: 'Мои дела', owner, todoItemList, onCreateFormSubmit: createTodoItem, onDoneClick: switchTodoItemDone, onDeleteClick: deleteTodoItem });
   })();
}

switchBtn.addEventListener('click', () => {
   isLocalStorageUsed = !isLocalStorageUsed;
   localStorage.setItem(SWITCH_STORAGE_KEY, isLocalStorageUsed);
   location.reload();
});
