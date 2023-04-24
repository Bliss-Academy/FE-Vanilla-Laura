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


//modal


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

  fetchAsync(url)
    .then((data) => {
      let latestData = data.reverse()
      latestData.forEach((item) => {
        const tableBody = document.querySelector('tbody')

        const newTableRow = document.createElement('tr')

        const tableDate = document.createElement('td')
        tableDate.classList.add('table__date')

        const date = document.createElement('p')
        tableDate.appendChild(date)
        date.textContent = item.date

        const tableDescription = document.createElement('td')
        tableDescription.classList.add('table__description')
        tableDescription.innerHTML = `<div>
        <p>
          <b>${item.title} - </b>
          ${item.description}.
        </p>
      </div>`

        const tableValue = document.createElement('td')
        tableValue.classList.add('table__value')
        const tableSVG = document.createElement('div')
        if (item.isIncome) {
          tableSVG.innerHTML = `
        <svg
          width="15"
          height="15"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM27.06 20.06C26.76 20.36 26.38 20.5 26 20.5C25.62 20.5 25.24 20.36 24.94 20.06L21.5 16.62V27C21.5 27.82 20.82 28.5 20 28.5C19.18 28.5 18.5 27.82 18.5 27V16.62L15.06 20.06C14.48 20.64 13.52 20.64 12.94 20.06C12.36 19.48 12.36 18.52 12.94 17.94L18.94 11.94C19.52 11.36 20.48 11.36 21.06 11.94L27.06 17.94C27.64 18.52 27.64 19.48 27.06 20.06Z"
            fill="#41D158"
          />
        </svg>
        `
        } else {
          tableSVG.innerHTML = `<svg
        width="15"
        height="15"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40ZM12.94 19.94C13.24 19.64 13.62 19.5 14 19.5C14.38 19.5 14.76 19.64 15.06 19.94L18.5 23.38V13C18.5 12.18 19.18 11.5 20 11.5C20.82 11.5 21.5 12.18 21.5 13V23.38L24.94 19.94C25.52 19.36 26.48 19.36 27.06 19.94C27.64 20.52 27.64 21.48 27.06 22.06L21.06 28.06C20.48 28.64 19.52 28.64 18.94 28.06L12.94 22.06C12.36 21.48 12.36 20.52 12.94 19.94Z"
          fill="#FB6C6C"
        />
      </svg>`
        }
        const tableValueP = document.createElement('p')
                const itemValueFormatted = `€ ${item.value.toFixed(2).toString().replace('.', ',')}`        
        tableValueP.textContent = itemValueFormatted
        tableValue.appendChild(tableSVG)
        tableValue.appendChild(tableValueP)

        const tableAction = document.createElement('td')
        tableAction.classList.add('table__action')
        tableAction.innerHTML = ` <button class="file__btn">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9.816V11.4C1 15.4 2.6 17 6.6 17H11.4C15.4 17 17 15.4 17 11.4V6.6C17 2.6 15.4 1 11.4 1H6.6C2.6 1 1 2.6 1 6.6"
            stroke="currentColor"
            stroke-width="1.1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.16072 8.84L8.03264 9.968C7.40864 10.592 7.40864 11.608 8.03264 12.232C8.65664 12.856 9.67264 12.856 10.2966 12.232L12.0727 10.456C13.3207 9.208 13.3207 7.18399 12.0727 5.92799C10.8247 4.67999 8.80064 4.67999 7.54464 5.92799L5.60869 7.864C4.53669 8.936 4.53669 10.672 5.60869 11.744"
            stroke="currentColor"
            stroke-width="1.1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button class="edit__btn" onclick="openModal('Edit Transaction', 'purple')">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.114 16.0003H5.70062C1.70651 16.0003 0 14.2938 0 10.2997V5.88631C0 1.89219 1.70651 0.185684 5.70062 0.185684H7.17175C7.47333 0.185684 7.72343 0.435776 7.72343 0.737357C7.72343 1.03894 7.47333 1.28903 7.17175 1.28903H5.70062C2.30967 1.28903 1.10335 2.49536 1.10335 5.88631V10.2997C1.10335 13.6906 2.30967 14.897 5.70062 14.897H10.114C13.505 14.897 14.7113 13.6906 14.7113 10.2997V8.82857C14.7113 8.52698 14.9614 8.27689 15.263 8.27689C15.5645 8.27689 15.8146 8.52698 15.8146 8.82857V10.2997C15.8146 14.2938 14.1081 16.0003 10.114 16.0003Z"
            fill="currentColor"
          />
          <path
            d="M5.33252 12.2784C4.88382 12.2784 4.47191 12.1166 4.17033 11.8224C3.8099 11.462 3.65543 10.9397 3.73634 10.388L4.05264 8.17399C4.11148 7.74736 4.391 7.19569 4.69258 6.89411L10.4888 1.09783C11.9526 -0.365943 13.4384 -0.365943 14.9022 1.09783C15.7039 1.8996 16.0644 2.71607 15.9908 3.53255C15.9246 4.19456 15.5715 4.84185 14.9022 5.50386L9.10593 11.3001C8.80435 11.6017 8.25267 11.8812 7.82605 11.9401L5.61203 12.2564C5.51641 12.2784 5.42079 12.2784 5.33252 12.2784ZM11.2685 1.87753L5.47228 7.6738C5.33252 7.81356 5.17069 8.13721 5.14127 8.32846L4.82498 10.5425C4.79556 10.7558 4.83969 10.9324 4.95003 11.0427C5.06036 11.153 5.2369 11.1972 5.45021 11.1677L7.66422 10.8514C7.85547 10.822 8.18647 10.6602 8.31887 10.5204L14.1151 4.72416C14.5932 4.24605 14.8433 3.81942 14.8801 3.42221C14.9242 2.9441 14.6741 2.43656 14.1151 1.87017C12.9382 0.69327 12.1291 1.02427 11.2685 1.87753Z"
            fill="currentColor"
          />
          <path
            d="M13.681 6.49667C13.6296 6.49667 13.5781 6.48931 13.5339 6.4746C11.5994 5.93029 10.0621 4.39296 9.51776 2.45842C9.43684 2.1642 9.60602 1.86262 9.90025 1.77435C10.1945 1.69344 10.4961 1.86262 10.577 2.15684C11.0183 3.72359 12.2614 4.9667 13.8282 5.40804C14.1224 5.48895 14.2916 5.79788 14.2107 6.09211C14.1445 6.3422 13.9238 6.49667 13.681 6.49667Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button class="delete__btn" onclick="openPopUp()">
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3898 4.49704C15.3734 4.49704 15.3488 4.49704 15.3241 4.49704C10.983 4.0621 6.65007 3.89798 2.35815 4.33291L0.68406 4.49704C0.339395 4.52986 0.0357612 4.28367 0.00293596 3.93901C-0.0298893 3.59434 0.2163 3.29892 0.552759 3.26609L2.22685 3.10196C6.59263 2.65882 11.0158 2.83116 15.4472 3.26609C15.7837 3.29892 16.0299 3.60255 15.9971 3.93901C15.9724 4.25905 15.7016 4.49704 15.3898 4.49704Z"
            fill="currentColor"
          />
          <path
            d="M5.13268 3.66822C5.09986 3.66822 5.06703 3.66822 5.026 3.66002C4.69775 3.60257 4.46797 3.28253 4.52542 2.95427L4.70596 1.87925C4.83726 1.09144 5.0178 0 6.92983 0H9.07989C11.0002 0 11.1807 1.13247 11.3038 1.88745L11.4843 2.95427C11.5418 3.29073 11.312 3.61078 10.9838 3.66002C10.6473 3.71746 10.3272 3.48768 10.278 3.15943L10.0975 2.09261C9.98258 1.37866 9.95796 1.23915 9.08809 1.23915H6.93804C6.0682 1.23915 6.05179 1.35404 5.9287 2.0844L5.73995 3.15122C5.69071 3.45486 5.42811 3.66822 5.13268 3.66822Z"
            fill="currentColor"
          />
          <path
            d="M10.6387 17.6437H5.37028C2.50628 17.6437 2.39139 16.0598 2.30112 14.7797L1.76771 6.51588C1.74309 6.17942 2.0057 5.884 2.34215 5.85938C2.68682 5.84297 2.97404 6.09736 2.99866 6.43382L3.53207 14.6976C3.62234 15.945 3.65516 16.4127 5.37028 16.4127H10.6387C12.3621 16.4127 12.3949 15.945 12.477 14.6976L13.0104 6.43382C13.035 6.09736 13.3304 5.84297 13.6669 5.85938C14.0033 5.884 14.2659 6.17121 14.2413 6.51588L13.7079 14.7797C13.6176 16.0598 13.5027 17.6437 10.6387 17.6437Z"
            fill="currentColor"
          />
          <path
            d="M9.36675 13.1301H6.63404C6.29757 13.1301 6.01855 12.8511 6.01855 12.5146C6.01855 12.1782 6.29757 11.8992 6.63404 11.8992H9.36675C9.70321 11.8992 9.98222 12.1782 9.98222 12.5146C9.98222 12.8511 9.70321 13.1301 9.36675 13.1301Z"
            fill="currentColor"
          />
          <path
            d="M10.056 9.84757H5.95288C5.61642 9.84757 5.3374 9.56856 5.3374 9.2321C5.3374 8.89564 5.61642 8.61662 5.95288 8.61662H10.056C10.3925 8.61662 10.6715 8.89564 10.6715 9.2321C10.6715 9.56856 10.3925 9.84757 10.056 9.84757Z"
            fill="currentColor"
          />
        </svg>
      </button>`

        tableBody.appendChild(newTableRow)
        newTableRow.appendChild(tableDate)
        newTableRow.appendChild(tableDescription)
        newTableRow.appendChild(tableValue)
        newTableRow.appendChild(tableAction)
      })
    })
    .catch((error) => console.log(error))
}

function getLastTransactions() {
  const url = 'http://localhost:3000/transactions'
  fetchAsync(url)
    .then((data) => {
      let latestData = data.reverse()
      let lastThreeTransactions = []

      //substituir por slice
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

        if (transaction.isIncome) {
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
        valueCurency.innerHTML = `€ <span>${transaction.value
          .toFixed(2)
          .toString()
          .replace('.', ',')}</span>`
        divDateValue.appendChild(valueCurency)

        transactionsSection.appendChild(newArticle)
        newArticle.appendChild(divImg)
        newArticle.appendChild(divInfo)
        newArticle.appendChild(divDateValue)
      })
    })
    .catch((error) => console.log(error))
}

async function postNewTransaction(data) {
  const rawResponse = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const content = await rawResponse.json()

  console.log(content)
}

function addTransaction() {
  const inputValue = document.querySelector(
    '.modal__content input[name=value]'
  ).value
  const inputDate = document.querySelector(
    '.modal__content input[name=date]'
  ).value
  const inputTitle = document.querySelector(
    '.modal__content input[name=title]'
  ).value
  const inputDescription = document.querySelector(
    '.modal__content textarea[name=description]'
  ).value

  let date = new Date(inputDate)
  let formatedDate =
    date.getDate() + 1 + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

  const modalColor = document.querySelector('.modal__color')

  let isIncome

  if (modalColor.classList.contains('modal__color--green')) {
    isIncome = true
  } else if (modalColor.classList.contains('modal__color--red')) {
    isIncome = false
  }

  let data = {
    isIncome: isIncome,
    title: inputTitle,
    description: inputDescription,
    value: Number(inputValue),
    date: formatedDate
  }

  postNewTransaction(data)
}

getGeneralInfo()

getLastTransactions()

if (incomeBtn || expenseBtn) {
  hideViewBtn.style.display = 'none'

  fileBtn.addEventListener('click', function () {
    alert('file')
  })
}

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
// https://firebase.google.com/pricing
