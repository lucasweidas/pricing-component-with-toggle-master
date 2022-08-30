const toggle = document.querySelector('[data-toggle]');
const labelToggle = document.querySelector('[data-label-toggle]');

toggle.addEventListener('change', ({ target }) => {
  if (target.checked) {
    labelToggle.setAttribute('aria-labelledby', 'label-month');
    return setPriceElementValue(0);
  }

  labelToggle.setAttribute('aria-labelledby', 'label-year');
  setPriceElementValue(1);
});

function setPriceElementValue(index) {
  const priceElements = document.querySelectorAll('[data-price]');

  priceElements.forEach(element => {
    const value = JSON.parse(element.dataset.price)[index];
    element.firstElementChild.innerText = value;
  });
}
