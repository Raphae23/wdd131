// Populates the Product Name select field using the shared products array.
// Display text = product name, option value = product id.
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('product');

  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
});
