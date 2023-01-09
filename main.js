// Querying elements from the DOM
// Input Elements
const nameInput = document.querySelector('#holdername');
const numberInput = document.querySelector('#number');
const expMonthInput = document.querySelector('[name="exp-month"]');
const expYearInput = document.querySelector('[name="exp-year"]');
const cvcInput = document.querySelector('#cvc');

// Form Element
const formEl = document.querySelector('form');

// Output Elements
const cardNumEls = document.querySelectorAll('.card-num');
const cardholderNameEl = document.querySelector('#cardholder-name');
const cardExpMonthEl = document.querySelector('#card-exp-month');
const cardExpYearEl = document.querySelector('#card-exp-year');
const cardCvcEl = document.querySelector('#card-cvc');

// Error Elements
const nameErrorEl = document.querySelector('#name-error');
const numberErrorEl = document.querySelector('#number-error');
const expMonthErrorEl = document.querySelector('#exp-month-error');
const expYearErrorEl = document.querySelector('#exp-year-error');
const cvcErrorEl = document.querySelector('#cvc-error');

// Functions
function checkError(input, inputEl, errorEl, freq = 0) {
  removeError(inputEl, errorEl);

  if (!input) {
    renderError(inputEl, errorEl, "Can't be blank");
    return false;
  }

  if (freq) {
    if (input.length != freq) {
      renderError(inputEl, errorEl, `Must be ${freq} digits`);
      return false;
    }

    if (!new RegExp(`[0-9]{${freq}}`, 'g').test(input)) {
      renderError(inputEl, errorEl, 'Wrong Format, numbers only');
      return false;
    }
  }

  return true;
}

function renderError(inputEl, errorEl, msg) {
  inputEl.classList.add('border-error', 'focus:border-error');
  errorEl.textContent = msg;
  errorEl.classList.remove('invisible');
}

function removeError(inputEl, errorEl) {
  inputEl.classList.remove('border-error', 'focus:border-error');
  errorEl.textContent = '';
  errorEl.classList.add('invisible');
}

function renderInput(input, el, defaultText) {
  if (!input) {
    el.textContent = defaultText;
    return;
  }
  el.textContent = input;
}

function renderSuccess() {
  const markup = `
          <div class="flex flex-col gap-y-2 items-center">
              <img class="w-20 mb-6" src="/images/icon-complete.svg">
              <h1 class="text-2xl uppercase text-dark-violet tracking-widest">Thank you!</h1>
              <p class="text-sm text-dark-gray">We've added your card details</p>
              <button type="button" class="mt-6 w-full bg-dark-violet rounded-md py-3 text-white text-lg">Continue</button>
          </div>
      `;

  formEl.innerHTML = '';
  formEl.insertAdjacentHTML('afterbegin', markup);

  document.querySelector('button[type="button"]').addEventListener('click', function () {
    location.reload();
  });
}

// Event Listeners
nameInput.addEventListener('input', function (e) {
  renderInput(e.target.value, cardholderNameEl, 'cardholder name');
});

numberInput.addEventListener('input', function (e) {
  if (!e.target.value) {
    cardNumEls.forEach((el) => (el.textContent = '0'));
    return;
  }

  const numArr = [...e.target.value];
  cardNumEls.forEach((el, i) => (el.textContent = numArr[i]));
});

expMonthInput.addEventListener('input', function (e) {
  renderInput(e.target.value, cardExpMonthEl, '00');
});

expYearInput.addEventListener('input', function (e) {
  renderInput(e.target.value, cardExpYearEl, '00');
});

cvcInput.addEventListener('input', function (e) {
  renderInput(e.target.value, cardCvcEl, '000');
});

// Form Submission Event
formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameErrorStatus = checkError(nameInput.value, nameInput, nameErrorEl);
  const numberErrorStatus = checkError(numberInput.value, numberInput, numberErrorEl, 16);
  const expMonthErrorStatus = checkError(expMonthInput.value, expMonthInput, expMonthErrorEl, 2);
  const expYearErrorStatus = checkError(expYearInput.value, expYearInput, expYearErrorEl, 2);
  const cvcErrorStatus = checkError(cvcInput.value, cvcInput, cvcErrorEl, 3);

  if (nameErrorStatus && numberErrorStatus && expMonthErrorStatus && expYearErrorStatus && cvcErrorStatus) {
    renderSuccess();
  }

  const formData = new FormData();
  formData.append('cardholderName', nameInput.value);
  formData.append('cardNumber', numberInput.value);
  formData.append('cardExpMonth', expMonthInput.value);
  formData.append('cardExpYear', expYearInput.value);
  formData.append('cardCvc', cvcInput.value);
});
