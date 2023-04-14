const hamburgerBtn = document.querySelector('.nav__hamburger__btn')
const aside = document.querySelector('aside')
const container = document.querySelector('.container')
const logo = document.querySelector('.logo')

const incomeBtn = document.querySelector('.income')
const expenseBtn = document.querySelector('.expense')

hamburgerBtn.addEventListener('click', function () {
  console.log('hello')
  aside.classList.toggle('aside--start')
  container.classList.toggle('container--hide')
})

incomeBtn.addEventListener('click', function () {
  alert('income')
})

expenseBtn.addEventListener('click', function () {
  alert('expense')
})

