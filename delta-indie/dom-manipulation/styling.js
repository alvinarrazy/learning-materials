function modify() {
  // Inline styles
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    box.style.backgroundColor = 'blue';
    box.style.padding = '10px';

    // Add or remove CSS classes
    box.classList.add('active');
  });
}

document.getElementById('modify')?.addEventListener('click', modify);
