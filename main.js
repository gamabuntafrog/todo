const headInput = document.querySelector('#head');
const descInput = document.querySelector('#desc');
const submitButton = document.querySelector('#submit');
const contentContainer = document.querySelector('.content__container');
const body = document.querySelector('body')

let todoList = []
if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'))
  todoList.forEach((item) => {
    contentContainer.insertAdjacentHTML('beforeend', `<div class="todo-item">
  <h1 class="todo-h1">${item.head}</h1>
  <p class="todo-p">${item.desc}</p>
  <button id="todo-delete">Удалить</button>
  <button id="todo-change">Изменить</button>
  </div>`)
  })
}

contentContainer.addEventListener('click', deleteItem)
contentContainer.addEventListener('click', changeItem)

function deleteItem(e) {
  if (e.target.id != 'todo-delete') {
    return
  }

  todoList.forEach((item, i) => {
    if (item.head == e.target.parentNode.children[0].textContent) {
      todoList.splice(i, 1)
      localStorage.setItem('todo', JSON.stringify(todoList));
      e.target.parentNode.remove()
    }
  })

  JSON.parse(localStorage.getItem('todo')).forEach((item, i) => {
    if (e.target.parentNode.children[0].textContent == item.head) {
    }
  })
}

function changeItem(e) {
  if (e.target.id != 'todo-change') {
    return
  }
  
  todoList.forEach((item, i) => {
    if (item.head == e.target.parentNode.children[0].textContent) {
      
    }
  })
  JSON.parse(localStorage.getItem('todo')).forEach((item, i) => {
    if (e.target.parentNode.children[0].textContent == item.head) {
      
    }
  })
  createModal(e)
}

function createModal(e) {
  body.insertAdjacentHTML('beforeend', `<div id="backdrop"><div id="modal-wrapper">
  <h1>Изменить</h1>
  <input id="modal__change-head" placeholder="Заголовок..."/>
  <input id="modal__change-desc" placeholder="Подробности..."/>
  <button id="modal__change-submit">Изменить</button>
  </div</div>`)

  displayChangedMessage(e)
  deleteModalListener(e)
}

function displayChangedMessage(e) {
  let head = e.target.parentNode.children[0].textContent;
  let desc = e.target.parentNode.children[1].textContent;

  const modalChangeHead = document.querySelector('#modal__change-head');
  const modalChangeDesc = document.querySelector('#modal__change-desc');
  const modalChangeButton = document.querySelector('#modal__change-submit');

  modalChangeHead.value = e.target.parentNode.children[0].textContent
  modalChangeDesc.value = e.target.parentNode.children[1].textContent

  modalChangeButton.addEventListener('click', (e) => {
    todoList.forEach((item, i) => {
      if (head == item.head) {
        contentContainer.children[i].children[0].textContent = modalChangeHead.value
        contentContainer.children[i].children[1].textContent = modalChangeDesc.value

        item.head = modalChangeHead.value;
        item.desc = modalChangeDesc.value;
        localStorage.setItem('todo', JSON.stringify(todoList));

       
      }
     })
  })

   
}

function deleteModalListener(e) {
    const backdrop = document.querySelector('#backdrop');
  backdrop.addEventListener('click', (e) => {
    
    if (e.target.id == 'backdrop') {
      e.target.remove()
    }
  })
}


submitButton.addEventListener('click', createToDo)

function createToDo() {
  if (headInput.value == '') {
    return
  }
  
  let newToDo = {
    head: `${headInput.
    value}`,
    desc: `${descInput.value}`,
    complete: 'false'
  }
  
  todoList.push(newToDo)
  localStorage.setItem('todo', JSON.stringify(todoList));

   headInput.value = ''
   descInput.value = ''

  displayMessage(newToDo)
}

function displayMessage(newToDo) {
  contentContainer.insertAdjacentHTML('beforeend', `<div class="todo-item">
  <h1 class="todo-h1" >${newToDo.head}</h1>
  <p class="todo-p">${newToDo.desc}</p>
  <button id="todo-delete">Удалить</button>
  <button id="todo-change">Изменить</button>
  </div>`)
}



