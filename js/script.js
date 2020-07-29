const todoList = []
let inputForm, todoMain, tabButton, sortMenu

function createTodoHtmlString(todo){
  let htmlString = ""
  const editType = todo.isEdit ? "exitFixed" : "edit"
  const editButtonLabel = todo.isEdit ? "編集完了" : "編集"
  const doneType = todo.isDone ? "inbox" : "done"
  const doneButtonLabel = todo.isDone ? "未完了" : "完了"
  let todoTextCell = ""
  let priorityCell = ""
  if (todo.isEdit){
    todoTextCell = '<td class="cell-text"><input class="input-edit" type="text" value=' + todo.text + " /></td>"
    priorityCell = '<td class="cell-priority"><input class="input-priority" type="number" value=' + todo.priority + " /></td>"
  }else{
    todoTextCell = '<td class="cell-text">' + todo.text + "</td>"
    priorityCell = '<td class="cell-priority">' + todo.priority + "</td>"
  }
  htmlString += '<tr id="' + todo.id + '">'
  htmlString += '<td class="cell-edit-button"><button data-type="' + editType + '">' + editButtonLabel + "</button></td>"
  htmlString += todoTextCell
  htmlString += '<td class="cell-created-at">' + todo.createdAt + "</td>"
  htmlString += priorityCell
  htmlString += '<td class="cell-done">'
  htmlString += '<button data-type="' + doneType + '">'
  htmlString += doneButtonLabel
  htmlString += "</button></td>"
  htmlString += "</tr>"
  return htmlString
}

function updateTodoList(){
  let htmlStrings = ""
  todoList.forEach(todo => {
    htmlStrings += createTodoHtmlString(todo)
    todoMain.innerHTML = htmlStrings
  })
  todoMain.innerHTML = htmlStrings
}

function addTodo(todoObj){
  todoObj.id = "todo-" + (todoList.length + 1)
  todoObj.createdAt = new Date().toLoceleString()
  todoObj.priority = 3
  todoObj.isDone = false
  todoObj.isEdit = false
  todoList.unshift(todoObj)
  updateTodoList()
  clearInputForm()
}

function handleSubmit(event){
  event.preventDefault()
  const todoObj = {
    text: inputForm["input-text"].value
  }
  addTodo(todoObj)
}

function registerDOM(){
  inputForm = document.querySelector("#input-form")
  todoMain = document.querySelector("#todo-main")
  tabButton = document.querySelector("#tab").querySelectorAll("button")
  sortMenu = document.querySelector("#sort-menu")
}

function bindEvents(){
  inputForm.addEventListener("submit", () => handleSubmit())
}

function initialize(){
  registerDOM()
  bindEvents()
  updateTodoList()
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))
