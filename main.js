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


