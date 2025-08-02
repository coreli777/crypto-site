document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.read-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const moreText = this.previousElementSibling;
      if (moreText && moreText.classList.contains('more-text')) {
        moreText.style.display = 'inline';
        this.style.display = 'none';
      }
    });
  });
});

function fetchCryptoRates() {
  const ids = [
    "bitcoin", "ethereum", "tether", "binancecoin", "solana",
    "usd-coin", "ripple", "dogecoin", "cardano", "tron"
  ];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('cryptoList');
      if (!list) return;
      list.innerHTML = '';
      ids.forEach(id => {
        const name = id.charAt(0).toUpperCase() + id.slice(1);
        const price = data[id]?.usd ? data[id].usd.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '—';
        list.innerHTML += `<li><strong>${name}:</strong> $${price}</li>`;
      });
    })
    .catch(() => {
      const list = document.getElementById('cryptoList');
      if (list) list.innerHTML = '<li>Ошибка загрузки данных</li>';
    });
}
// Запуск при загрузке страницы и обновление каждые 60 секунд
window.addEventListener('DOMContentLoaded', () => {
  fetchCryptoRates();
  setInterval(fetchCryptoRates, 60000);
});
// ...existing code...

function fetchForexRates() {
  const pairs = [
    { base: "EUR", quote: "USD" },
    { base: "USD", quote: "JPY" },
    { base: "GBP", quote: "USD" },
   ];

  const list = document.getElementById('forexList');
  if (!list) return;

  list.innerHTML = '<li>Загрузка...</li>';

  // Собираем все уникальные валюты
  const bases = [...new Set(pairs.map(p => p.base))];
  const quotes = [...new Set(pairs.map(p => p.quote))];
  const symbols = quotes.join(',');

  // Для каждой уникальной base делаем запрос
  Promise.all(
    bases.map(base =>
      fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
        .then(res => res.json())
        .then(data => ({ base, rates: data.rates }))
        .catch(() => ({ base, rates: {} }))
    )
  ).then(results => {
    // Собираем все курсы в объект
    const ratesByBase = {};
    results.forEach(r => { ratesByBase[r.base] = r.rates; });

    list.innerHTML = '';
    pairs.forEach(pair => {
      const rate = ratesByBase[pair.base]?.[pair.quote];
      list.innerHTML += `<li><strong>${pair.base}/${pair.quote}:</strong> ${rate ? rate : 'Ошибка'}</li>`;
    });
  });
}

// Запуск при загрузке страницы и обновление каждые 60 секунд
window.addEventListener('DOMContentLoaded', () => {
  fetchForexRates();
  setInterval(fetchForexRates, 60000);
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.news-date[data-date]').forEach(function(span) {
    const pubDate = new Date(span.getAttribute('data-date'));
    const now = new Date();
    // Обнуляем время для корректного подсчёта дней
    pubDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diff = Math.floor((now - pubDate) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      span.textContent = 'сегодня';
    } else if (diff === 1) {
      span.textContent = '1 день назад';
    } else if (diff > 1) {
      span.textContent = `${diff} дней назад`;
    } else {
      span.textContent = '';
    }
  });
});

