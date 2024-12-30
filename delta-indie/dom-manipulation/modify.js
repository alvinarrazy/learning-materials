function modify() {
  // Change text content
  const title = document.getElementById('title');
  title.textContent = 'New Title';

  // Change inner HTML
  const container = document.querySelector('.container');
  container.innerHTML = '<p>New paragraph</p>';

  // Modify attributes
  const link = document.querySelector('a');
  link.setAttribute('href', 'https://example.com');
}

document.getElementById('modify')?.addEventListener('click', modify);
