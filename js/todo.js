const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"
let toDos = [];

function delToDo(event) {
  const button = event.target;
  const li = button.parentNode;
  toDoList.removeChild(li);
  const clearToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id)
  });
  toDos = clearToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delButton = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delButton.innerText = "X";
  delButton.addEventListener("click", delToDo);
  li.appendChild(span);
  li.appendChild(delButton);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    ToDo : text,
    id : newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.ToDo);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
