// Create a new element

function modify() {
  const length = document.querySelectorAll('.remove-me')?.length || 0;
  const newDiv = document.createElement('div');
  newDiv.textContent = `New Div ${length}`;
  newDiv.className = 'remove-me';

  // Append to parent
  const container = document.querySelector('.container');
  container.appendChild(newDiv);
}

function remove() {
  // Remove an element
  const removeDiv = document.querySelector('.remove-me');
  removeDiv.remove();
}

document.getElementById('modify')?.addEventListener('click', modify);
document.getElementById('remove')?.addEventListener('click', remove);
