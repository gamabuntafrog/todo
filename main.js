const headInput = document.querySelector('#create-todo__head');
const descInput = document.querySelector('#create-todo__desc');
const submitButton = document.querySelector('#create-todo__submit');
const contentContainer = document.querySelector('.content__container');
const body = document.querySelector('body')

let todoList = []
if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'))
  todoList.forEach((item) => {
    contentContainer.insertAdjacentHTML('beforeend', `<div class="content__item">
  <h1 class="content__header">${item.head}</h1>
  <p class="content__desc">${item.desc}</p>
  <button id="content__delete">Удалить</button>
  <button id="content__change">Изменить</button>
  </div>`)
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
  }
  
  todoList.push(newToDo)
  localStorage.setItem('todo', JSON.stringify(todoList));

   headInput.value = ''
   descInput.value = ''

  displayMessage(newToDo)
}

contentContainer.addEventListener('click', deleteItem)
contentContainer.addEventListener('click', changeItem)

function deleteItem(e) {
  if (e.target.id != 'content__delete') {
    return
  }

  todoList.forEach((item, i) => {
    if (item.head == e.target.parentNode.children[0].textContent) {
      todoList.splice(i, 1)
      localStorage.setItem('todo', JSON.stringify(todoList));
      e.target.parentNode.remove()
    }
  })

}

function changeItem(e) {
  if (e.target.id != 'content__change') {
    return
  }
  createModal(e)
}

function createModal(e) {
  body.insertAdjacentHTML('beforeend', `<div id="backdrop"><div id="modal-wrapper">
  <h1>Изменить</h1>
  <input id="modal__change-head" placeholder="Заголовок..."/>
  <textarea id="modal__change-desc" name="" value="" placeholder="Подробности..."></textarea>
  <button id="modal__change-submit">Изменить</button>
  </div</div>`)

  displayChangedMessage(e)
  deleteModal(e)
}

function displayChangedMessage(e) {
  let head = e.target.parentNode.children[0].textContent;

  const modalChangeHead = document.querySelector('#modal__change-head');
  const modalChangeDesc = document.querySelector('#modal__change-desc');
  const modalChangeButton = document.querySelector('#modal__change-submit');

  modalChangeHead.value = e.target.parentNode.children[0].textContent
  modalChangeDesc.value = e.target.parentNode.children[1].textContent
  modalChangeButton.addEventListener('click', (e) => {
  if (modalChangeHead.value == '') {
    return
  }
  todoList.forEach((item, i) => {
    if (head == item.head) {
      contentContainer.children[i].children[0].textContent = modalChangeHead.value
      contentContainer.children[i].children[1].textContent = modalChangeDesc.value

      item.head = modalChangeHead.value;
      item.desc = modalChangeDesc.value;
      localStorage.setItem('todo', JSON.stringify(todoList));

      
    }
  })

  e.target.parentNode.parentNode.remove()

  })
   
}

function deleteModal(e) {
    const backdrop = document.querySelector('#backdrop');
    backdrop.addEventListener('click', (e) => {
    
    if (e.target.id == 'backdrop') {
      e.target.remove()
    }
  })
}




function displayMessage(newToDo) {
  contentContainer.insertAdjacentHTML('beforeend', `<div class="content__item">
  <h1 class="content__header" >${newToDo.head}</h1>
  <p class="content__desc">${newToDo.desc}</p>
  <button id="content__delete">Удалить</button>
  <button id="content__change">Изменить</button>
  </div>`)
}



