const hamburgerBtn = document.querySelector('.nav__hamburger__btn')
const aside = document.querySelector('aside')
const container = document.querySelector('.container')
const logo = document.querySelector('.logo')

const incomeBtn = document.querySelector('.income')
const expenseBtn = document.querySelector('.expense')
const fileBtn = document.querySelector('.file__btn')
const editBtn = document.querySelector('.edit__btn')
const deleteBtn = document.querySelector('.delete__btn')

const modal = document.querySelector('.modal')
const popUp = document.querySelector('.pop-up')
const modalCloseBtn = document.querySelector('.modal__btn__close')
const popUpCloseBtn = document.querySelector('.pop-up__btn__close')
const modalColor = document.querySelectorAll('.modal__color')

const hideViewBtn = document.querySelector('.menu__btn--hide')

const input = document.querySelectorAll('input')

hamburgerBtn.addEventListener('click', function () {
  aside.classList.toggle('aside--start')
  container.classList.toggle('container--hide')
})

hideViewBtn.addEventListener('click', function () {
  alert('view')
})

//modal

function openModal(title) {
  modal.classList.add("modal--open")
  document.querySelector("body > div.modal.modal--close.modal--open > section > h1").innerHTML=`<h1> ${title} </h1>`
}

function openPopUp(){
  popUp.classList.add("pop-up--open")
}

function closeModal() {
  modal.classList.remove("modal--open")
  modal.classList.add("modal--close")
  modalColor.forEach(e => {e.classList.remove('modal__color--green', 'modal__color--red', 'modal__color--purple')})
  input.forEach(e => { e.value = ''})
}

function closePopUp() {
  popUp.classList.remove("pop-up--open")
  popUp.classList.add("pop-up--close")
}

// works only on transactions page:
if (incomeBtn || expenseBtn) {
  incomeBtn.addEventListener('click', function(e) {
    let title = 'Income'
    modalColor.forEach(e => {e.classList.add('modal__color--green')})
    openModal(title)
  })
  
  expenseBtn.addEventListener('click', function(e){
    let title = 'Expense'
    modalColor.forEach(e => {e.classList.add('modal__color--red')})
    openModal(title)
  })

  hideViewBtn.style.display = 'none'

  fileBtn.addEventListener('click', function () {
    alert('file')
  })

  editBtn.addEventListener('click', function(e){
    let title = 'Edit Transaction'
    modalColor.forEach(e => {e.classList.add('modal__color--purple')})
    openModal(title)
  })

  deleteBtn.addEventListener('click', function () {
    openPopUp()
  })

  modalCloseBtn.addEventListener('click', closeModal)
  popUpCloseBtn.addEventListener('click', closePopUp)
}

