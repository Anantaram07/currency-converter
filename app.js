const apiKey = '5eed9062d7f341934c3c1af7'; // Replace 'YOUR_API_KEY' with your actual API key
const currencyApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertedAmountInput = document.getElementById('convertedAmount');
const convertBtn = document.getElementById('convertBtn');

// Fetch currency rates from API
async function fetchCurrencyRates() {
  try {
    const response = await fetch(currencyApiUrl);
    const data = await response.json();
    const rates = data.conversion_rates;
    populateCurrencyOptions(rates);
  } catch (error) {
    console.error('Error fetching currency rates:', error);
  }
}

// Populate currency select options
function populateCurrencyOptions(rates) {
  for (const currency in rates) {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    fromCurrencySelect.appendChild(option1);
    toCurrencySelect.appendChild(option2);
  }
}

// Convert currency based on selected options
function convertCurrency() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);
  
  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  if (fromCurrency === toCurrency) {
    convertedAmountInput.value = amount;
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        convertedAmountInput.value = data.conversion_result;
      } else {
        alert('Error converting currency. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error converting currency:', error);
      alert('Error converting currency. Please try again later.');
    });
}

// Event listener for convert button
convertBtn.addEventListener('click', convertCurrency);

// Fetch currency rates and populate select options on page load
window.addEventListener('load', () => {
  fetchCurrencyRates();
});
