const FEATURE_LABELS = {
  'durability': 'Durability',
  'ease-of-use': 'Ease of Use',
  'performance': 'Performance',
  'design': 'Design'
};

function getProductName(id) {
  const match = products.find((p) => p.id === id);
  return match ? match.name : id;
}

function formatDate(isoDate) {
  if (!isoDate) return null;
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${month}/${day}/${year}`;
}

function starDisplay(rating) {
  const n = parseInt(rating, 10);
  if (!n) return null;
  return '\u2605'.repeat(n) + '\u2606'.repeat(5 - n) + `  (${n}/5)`;
}

function addRow(dl, label, value) {
  const row = document.createElement('div');
  row.className = 'summary-row';

  const dt = document.createElement('dt');
  dt.textContent = label;

  const dd = document.createElement('dd');
  dd.textContent = value;

  row.appendChild(dt);
  row.appendChild(dd);
  dl.appendChild(row);
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const summaryList = document.getElementById('summary-list');

  const productId = params.get('product');
  const rating = params.get('rating');
  const installDate = params.get('installDate');
  const features = params.getAll('features');
  const review = params.get('review');
  const username = params.get('username');

  if (productId) {
    addRow(summaryList, 'Product', getProductName(productId));
  }
  if (rating) {
    addRow(summaryList, 'Rating', starDisplay(rating));
  }
  if (installDate) {
    addRow(summaryList, 'Installed', formatDate(installDate));
  }

  const featureText = features.length
    ? features.map((f) => FEATURE_LABELS[f] || f).join(', ')
    : 'None selected';
  addRow(summaryList, 'Features', featureText);

  addRow(summaryList, 'Reviewer', username && username.trim() ? username.trim() : 'Anonymous');
  addRow(summaryList, 'Written Review', review && review.trim() ? review.trim() : '(No written review provided)');

  const STORAGE_KEY = 'reviewCount';
  const previousCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  const newCount = previousCount + 1;
  localStorage.setItem(STORAGE_KEY, newCount);

  document.getElementById('inspection-no').textContent = `Inspection No. ${String(newCount).padStart(4, '0')}`;
  document.getElementById('counter-note').textContent =
    `This is review #${newCount} filed on this device.`;
});
