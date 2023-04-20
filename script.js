const hamburgerBtn = document.querySelector('.nav__hamburger__btn')

const incomeBtn = document.querySelector('.income')
const expenseBtn = document.querySelector('.expense')
const fileBtn = document.querySelector('.file__btn')
const valueHidden = document.querySelectorAll('article .value--hidden')

const modal = document.querySelector('.modal')
const popUp = document.querySelector('.pop-up')
const modalColor = document.querySelectorAll('.modal__color')

const hideViewBtn = document.querySelector('.eye--open')

const input = document.querySelectorAll('input')

hamburgerBtn.addEventListener('click', function () {
  document.querySelector('aside').classList.toggle('aside--start')
  document.querySelector('.container').classList.toggle('container--hide')
})

if (hideViewBtn) {
  const value = document.querySelectorAll('article .value')

  hideViewBtn.addEventListener('click', function () {
    hideViewBtn.innerHTML = `<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    if (hideViewBtn.classList.contains('eye--closed')) {
      value.forEach(function (e) {
        e.classList.add('value--hide')
      })

      valueHidden.forEach(function (e) {
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
      value.forEach((e) => {
        e.classList.remove('value--hide')
      })
      valueHidden.forEach((e) => {
        e.classList.add('value--hide')
      })
    }
  })
}

// works only on transactions page:
if (incomeBtn || expenseBtn) {
  hideViewBtn.style.display = 'none'

  fileBtn.addEventListener('click', function () {
    alert('file')
  })
}

//modal
function openModal(title, color) {
  modal.classList.add('modal--open')
  modalColor.forEach((e) => {
    e.classList.add(`modal__color--${color}`)
  })
  document.querySelector(
    'body > div.modal.modal--close.modal--open > section > h1'
  ).innerHTML = `<h1> ${title} </h1>`
}

function openPopUp() {
  popUp.classList.add('pop-up--open')
}

function closeModal() {
  modal.classList.remove('modal--open')
  modal.classList.add('modal--close')
  modalColor.forEach((e) => {
    e.classList.remove(
      'modal__color--green',
      'modal__color--red',
      'modal__color--purple'
    )
  })
  input.forEach((e) => {
    e.value = ''
  })
}

function closePopUp() {
  popUp.classList.remove('pop-up--open')
  popUp.classList.add('pop-up--close')
}

async function fetchAsync(url) {
  let response = await fetch(url)
  let data = await response.json()
  return data
}

function getGeneralInfo() {
  const url = 'http://localhost:3000/transactions'

  let totalExpenses = 0
  let totalIncome = 0
  let finalBalance

  fetchAsync(url)
    .then((data) => {
      data.forEach((item) => {
        if (item.isIncome) {
          totalIncome += item.value
        } else {
          totalExpenses += item.value
        }
      })
      finalBalance = totalIncome - totalExpenses

      function fixNumber(number) {
        return number.toFixed(2).toString().replace('.', ',')
      }

      const incomes = document.querySelector('.incomes .value span')
      incomes.textContent = fixNumber(totalIncome)
      const expenses = document.querySelector('.expenses .value span')
      expenses.textContent = fixNumber(totalExpenses)
      const balance = document.querySelector('.balance .value span')
      balance.textContent = fixNumber(finalBalance)
    })
    .catch((error) => console.log(error))
}

function getLastTransactions() {
  const url = 'http://localhost:3000/transactions'

  fetchAsync(url)
    .then((data) => {
      let latestData = data.reverse()
      let lastThreeTransactions = []

      for (let i = 0; i < 3; i++) {
        lastThreeTransactions.push(latestData[i])
      }

      lastThreeTransactions.forEach((transaction) => {
        const transactionsSection = document.querySelector('.transactions')

        const newArticle = document.createElement('article')
        const divImg = document.createElement('div')
        divImg.classList.add('img')
        const divInfo = document.createElement('div')
        divInfo.classList.add('info')
        const divDateValue = document.createElement('div')
        divDateValue.classList.add('date-value')

        if(transaction.isIncome){
          divImg.innerHTML = `              <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM27.06 20.06C26.76 20.36 26.38 20.5 26 20.5C25.62 20.5 25.24 20.36 24.94 20.06L21.5 16.62V27C21.5 27.82 20.82 28.5 20 28.5C19.18 28.5 18.5 27.82 18.5 27V16.62L15.06 20.06C14.48 20.64 13.52 20.64 12.94 20.06C12.36 19.48 12.36 18.52 12.94 17.94L18.94 11.94C19.52 11.36 20.48 11.36 21.06 11.94L27.06 17.94C27.64 18.52 27.64 19.48 27.06 20.06Z"
            fill="#41D158"
          />
        </svg>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="5" fill="#D9D9D9" />
          <path
            d="M39.4999 31.4406L34.6727 20.1515C33.7937 18.0849 32.4828 16.9128 30.9868 16.8357C29.5063 16.7586 28.072 17.7919 26.977 19.7659L24.0468 25.025C23.4299 26.1354 22.5508 26.7985 21.5947 26.8756C20.623 26.9682 19.6514 26.4592 18.8649 25.4568L18.5256 25.025C17.4306 23.6524 16.0734 22.9892 14.6854 23.128C13.2974 23.2668 12.1099 24.223 11.3234 25.7807L8.65533 31.1013C7.69915 33.0291 7.79168 35.2654 8.91751 37.0852C10.0433 38.905 12.002 40 14.1457 40H33.8245C35.8911 40 37.8189 38.9667 38.9601 37.2394C40.1322 35.5121 40.3173 33.3376 39.4999 31.4406Z"
            fill="#292D32"
          />
          <path
            d="M16.2913 18.4255C19.1703 18.4255 21.504 16.0917 21.504 13.2127C21.504 10.3338 19.1703 8 16.2913 8C13.4124 8 11.0786 10.3338 11.0786 13.2127C11.0786 16.0917 13.4124 18.4255 16.2913 18.4255Z"
            fill="#292D32"
          />
        </svg>`
        } else {
          divImg.innerHTML = ` <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40ZM12.94 19.94C13.24 19.64 13.62 19.5 14 19.5C14.38 19.5 14.76 19.64 15.06 19.94L18.5 23.38V13C18.5 12.18 19.18 11.5 20 11.5C20.82 11.5 21.5 12.18 21.5 13V23.38L24.94 19.94C25.52 19.36 26.48 19.36 27.06 19.94C27.64 20.52 27.64 21.48 27.06 22.06L21.06 28.06C20.48 28.64 19.52 28.64 18.94 28.06L12.94 22.06C12.36 21.48 12.36 20.52 12.94 19.94Z"
            fill="#FB6C6C"
          />
        </svg>
  
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="5" fill="#D9D9D9" />
          <path
            d="M39.4999 31.4406L34.6727 20.1515C33.7937 18.0849 32.4828 16.9128 30.9868 16.8357C29.5063 16.7586 28.072 17.7919 26.977 19.7659L24.0468 25.025C23.4299 26.1354 22.5508 26.7985 21.5947 26.8756C20.623 26.9682 19.6514 26.4592 18.8649 25.4568L18.5256 25.025C17.4306 23.6524 16.0734 22.9892 14.6854 23.128C13.2974 23.2668 12.1099 24.223 11.3234 25.7807L8.65533 31.1013C7.69915 33.0291 7.79168 35.2654 8.91751 37.0852C10.0433 38.905 12.002 40 14.1457 40H33.8245C35.8911 40 37.8189 38.9667 38.9601 37.2394C40.1322 35.5121 40.3173 33.3376 39.4999 31.4406Z"
            fill="#292D32"
          />
          <path
            d="M16.2913 18.4255C19.1703 18.4255 21.504 16.0917 21.504 13.2127C21.504 10.3338 19.1703 8 16.2913 8C13.4124 8 11.0786 10.3338 11.0786 13.2127C11.0786 16.0917 13.4124 18.4255 16.2913 18.4255Z"
            fill="#292D32"
          />
        </svg>`
        }



        const title = document.createElement('h3')
        title.textContent = transaction.title
        divInfo.appendChild(title)
        
        const description = document.createElement('p')
        description.textContent = transaction.description
        divInfo.appendChild(description)

        const date = document.createElement('p')
        date.textContent = transaction.date
        divDateValue.appendChild(date)

        const valueCurency = document.createElement('p')
        valueCurency.innerHTML = `€ <span>${(transaction.value).toFixed(2).toString().replace('.', ',')
      }</span>`
        divDateValue.appendChild(valueCurency)

        transactionsSection.appendChild(newArticle)
        newArticle.appendChild(divImg)
        newArticle.appendChild(divInfo)
        newArticle.appendChild(divDateValue)
      })
    })
    .catch((error) => console.log(error))
}

getGeneralInfo()

getLastTransactions()
