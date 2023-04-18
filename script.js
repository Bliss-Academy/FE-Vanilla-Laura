const hamburgerBtn = document.querySelector('.nav__hamburger__btn')
const aside = document.querySelector('aside')
const container = document.querySelector('.container')
const logo = document.querySelector('.logo')

const incomeBtn = document.querySelector('.income')
const expenseBtn = document.querySelector('.expense')
const fileBtn = document.querySelector('.file__btn')
const editBtn = document.querySelector('.edit__btn')
const deleteBtn = document.querySelector('.delete__btn')
const value = document.querySelectorAll('article .value')
const valueHidden = document.querySelectorAll('article .value--hidden')

const modal = document.querySelector('.modal')
const popUp = document.querySelector('.pop-up')
const modalCloseBtn = document.querySelector('.modal__btn__close')
const popUpCloseBtn = document.querySelector('.pop-up__btn__close')
const modalColor = document.querySelectorAll('.modal__color')

const hideViewBtn = document.querySelector('.eye--open')

const input = document.querySelectorAll('input')

hamburgerBtn.addEventListener('click', function () {
  aside.classList.toggle('aside--start')
  container.classList.toggle('container--hide')
})

hideViewBtn.addEventListener('click', function () {
  hideViewBtn.innerHTML= `<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.1692 13.2051L12.8321 20.795C11.8896 19.82 11.3096 18.485 11.3096 17C11.3096 14.03 13.6296 11.6301 16.5006 11.6301C17.9362 11.6301 19.2267 12.2301 20.1692 13.2051Z" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.9393 7.65497C22.4018 5.67497 19.5017 4.59497 16.5001 4.59497C11.3815 4.59497 6.61087 7.71497 3.29029 13.115C1.98527 15.23 1.98527 18.785 3.29029 20.9C4.43582 22.76 5.76985 24.365 7.21988 25.655" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.3096 28.2952C12.9626 29.0152 14.7171 29.4052 16.5006 29.4052C21.6192 29.4052 26.3898 26.2852 29.7104 20.8852C31.0154 18.7702 31.0154 15.2152 29.7104 13.1001C29.2319 12.3201 28.7099 11.5851 28.1734 10.8951" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.5896 18.05C21.2126 20.165 19.545 21.89 17.5005 22.28" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.8317 20.795L2 32" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M31.0002 2L20.1685 13.205" stroke="#7600D2" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  hideViewBtn.classList.toggle('eye--open')
  hideViewBtn.classList.toggle('eye--closed')

  if (hideViewBtn.classList.contains('eye--closed')){
    value.forEach(function(e){
      e.classList.add('value--hide')
    })

    valueHidden.forEach(function(e){
      e.classList.remove('value--hide')
    })

  } else if (hideViewBtn.classList.contains('eye--open')) {
    hideViewBtn.innerHTML = `<svg
    width="31"
    height="26"
    viewBox="0 0 31 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.3815 13.0073C20.3815 15.8786 18.0613 18.1988 15.19 18.1988C12.3187 18.1988 9.99854 15.8786 9.99854 13.0073C9.99854 10.136 12.3187 7.8158 15.19 7.8158C18.0613 7.8158 20.3815 10.136 20.3815 13.0073Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.1897 25C20.3088 25 25.0798 21.9837 28.4006 16.7632C29.7057 14.7184 29.7057 11.2816 28.4006 9.23684C25.0798 4.01631 20.3088 1 15.1897 1C10.0707 1 5.29969 4.01631 1.97885 9.23684C0.673717 11.2816 0.673717 14.7184 1.97885 16.7632C5.29969 21.9837 10.0707 25 15.1897 25Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`
  value.forEach(e => {e.classList.remove('value--hide') })
  valueHidden.forEach(e => {e.classList.add('value--hide') })
  }
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

