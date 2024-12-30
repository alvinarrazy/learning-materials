let type = null;
const transactions = [];

const placeholderEl = document.getElementById('placeholder');
const clearEl = document.getElementById('clear');
const submitEl = document.getElementById('submit');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const typeEl = document.getElementById('type');
const balanceEl = document.getElementById('balance');
const transactionListEl = document.getElementById('transaction-list');

const numbers = new Array(10).fill(null).map((_, i) => i);
const numbersEl = document.getElementById('numbers');
// Number Buttons
numbers.forEach((n) => {
  const numberButton = document.createElement('button');
  numberButton.style.margin = '20px';
  numberButton.style.padding = '20px';
  numberButton.innerText = n;

  numberButton.addEventListener('click', () => {
    placeholderEl.innerText += n;
  });
  numbersEl.appendChild(numberButton);
});

// Clear Button
clearEl.addEventListener('click', () => {
  placeholderEl.innerText = '';
  typeEl.innerText = '';
  type = null;
});

// Income Button
incomeEl.addEventListener('click', () => {
  type = 'income';
  typeEl.innerText = '+';
});

// Expense Button
expenseEl.addEventListener('click', () => {
  type = 'expense';
  typeEl.innerText = '-';
});

function renderTransactionList() {
  transactionListEl.innerHTML = '';
  let balance = 0;
  transactions.forEach((t) => {
    balance += t;
    const transactionEl = document.createElement('li');
    transactionEl.innerText = `${t < 0 ? '- ' : ''}Rp ${Math.abs(t)}`;
    transactionEl.style.color = t >= 0 ? 'green' : 'red';
    transactionListEl.appendChild(transactionEl);
  });

  balanceEl.innerText = `${balance < 0 ? '- ' : ''}Rp ${Math.abs(balance)}`;
}

// Submit Button
submitEl.addEventListener('click', () => {
  if (!type || !placeholderEl.innerText) {
    return;
  }

  transactions.push(
    type === 'income' ? +placeholderEl.innerText : -placeholderEl.innerText,
  );
  renderTransactionList();
});
