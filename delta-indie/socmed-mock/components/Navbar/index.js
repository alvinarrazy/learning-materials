async function loadComponent() {
  const resp = await fetch('./components/Navbar/index.html');
  const html = await resp.text();

  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

loadComponent();
