const toDoForm = document.querySelector('#todo_form');
const toDoList = document.querySelector('#todo_list');
const toDoInput = document.querySelector('#todo_form input');

const TODOS_KEY = 'todos'

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos))
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function listUpdate(newToDo) {
    const li = document.createElement('li');
    li.id = newToDo.id;
    const span = document.createElement('span');
    span.innerText = newToDo.text;
    const button1 = document.createElement('button');
    button1.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    button1.addEventListener('click',deleteToDo);
    li.appendChild(span);
    li.appendChild(button1);
    toDoList.appendChild(li);
}

function onToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = " ";
    const newToDoObj = {
        text : newToDo,
        id : Date.now(),
    }
    toDos.push(newToDoObj);
    listUpdate(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener('submit', onToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(listUpdate);
}