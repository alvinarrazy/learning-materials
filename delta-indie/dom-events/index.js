// Click listener
const button = document.querySelector('#clickButton');
let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++;
  console.log(`Button clicked ${clickCount} times`);
});

// Keydown listener

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      console.log('Up arrow pressed');
      break;
    case 'ArrowDown':
      console.log('Down arrow pressed');
      break;
    case 'ArrowLeft':
      console.log('Left arrow pressed');
      break;
    case 'ArrowRight':
      console.log('Right arrow pressed');
      break;
  }
});

// Input listener
const inputField = document.querySelector('#textInput');
inputField.addEventListener('input', (event) => {
  console.log(`Current value: ${event.target.value}`);
});

// Event propagation
const outerDiv = document.querySelector('#outerDiv');
const innerDiv = document.querySelector('#innerDiv');

outerDiv.addEventListener('click', () => {
  console.log('Outer div clicked');
});

innerDiv.addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Inner div clicked');
});

// Debounce
let debounceTimeoutId;

const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input', () => {
  //   console.log(`Searching for: ${searchInput.value}`);

  clearTimeout(debounceTimeoutId);
  debounceTimeoutId = setTimeout(() => {
    console.log(`Searching for: ${searchInput.value}`);
  }, 2000);
});
