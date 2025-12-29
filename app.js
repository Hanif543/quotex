let balance = 10000;
let lastPrice = 0;

const priceEl = document.getElementById("price");
const balanceEl = document.getElementById("balance");
const analysisText = document.getElementById("analysisText");
const assetSelect = document.getElementById("asset");

// Live crypto price (Binance – GitHub safe)
async function fetchPrice() {
  const asset = assetSelect.value;
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${asset}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    lastPrice = parseFloat(data.price);
    priceEl.innerText = lastPrice.toFixed(2);
    runAnalysis();
  } catch {
    priceEl.innerText = "Error";
  }
}

function runAnalysis() {
  const rsi = Math.floor(Math.random() * 100);
  let signal = "WAIT";

  if (rsi < 40) signal = "CALL 📈";
  if (rsi > 60) signal = "PUT 📉";

  analysisText.innerHTML = `
    RSI: ${rsi}<br>
    Signal: <strong>${signal}</strong>
  `;
}

function trade(type) {
  const win = Math.random() > 0.5;
  const amount = 100;

  if (win) {
    balance += amount;
    alert(type + " WIN ✅");
  } else {
    balance -= amount;
    alert(type + " LOSS ❌");
  }

  balanceEl.innerText = balance.toFixed(2);
}

setInterval(fetchPrice, 3000);
fetchPrice();
