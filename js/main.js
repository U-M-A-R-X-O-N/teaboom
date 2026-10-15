(() => {
  'use strict';

  const WEIGHTS = [
    { id: '100',  label: '100 г',  sku: '01306', price: 326.4,  oldPrice: 349.2 },
    { id: '500',  label: '500 г',  sku: '01307', price: 1432,   oldPrice: 1646 },
    { id: '1000', label: '1000 г', sku: '01308', price: 2064,   oldPrice: 2592 },
    { id: '5000', label: '5000 г', sku: '01309', price: 6320,   oldPrice: 8710 },
  ];

  const el = {
    list: document.getElementById('weights'),
    sku: document.getElementById('sku'),
    price: document.getElementById('price-current'),
    old: document.getElementById('price-old'),
    badge: document.getElementById('price-badge'),
    btn: document.getElementById('add-to-cart'),
    status: document.getElementById('status'),
  };

  const fmt = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const money = (n) => `${fmt.format(n)}\u00A0₽`;

  function render(item) {
    el.sku.textContent = item.sku;
    el.price.textContent = money(item.price);
    const hasDiscount = item.oldPrice && item.oldPrice > item.price;
    el.old.hidden = el.badge.hidden = !hasDiscount;
    if (hasDiscount) {
      el.old.textContent = money(item.oldPrice);
      el.badge.textContent = `−${Math.round((1 - item.price / item.oldPrice) * 100)}%`;
    }
    el.status.textContent = '';
  }

  el.list.innerHTML = WEIGHTS.map((w, i) => `
    <label class="weight">
      <input type="radio" name="weight" value="${w.id}"${i === 0 ? ' checked' : ''}>
      <span>${w.label}</span>
    </label>`).join('');

  el.list.addEventListener('change', (e) => {
    const item = WEIGHTS.find((w) => w.id === e.target.value);
    if (item) render(item);
  });

  el.btn.addEventListener('click', () => {
    const item = WEIGHTS.find((w) => w.id === el.list.querySelector('input:checked').value);
    el.status.textContent = `Добавлено в корзину: ${item.label}, арт. ${item.sku}`;
  });

  render(WEIGHTS[0]);
})();
