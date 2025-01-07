function loadStylesheet(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.crossOrigin = 'anonymous';

  // Append to the head element
  document.head.appendChild(link);

  // Optional: Listen for load event
  link.onload = () => console.log('Stylesheet loaded successfully');
  link.onerror = () => console.error('Failed to load stylesheet');
}

function loadScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.defer = true;

  document.head.appendChild(script);
  script.onload = () => console.log('Script loaded successfully');
  script.onerror = () => console.error('Failed to load script');
}
const stylesheets = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
];
stylesheets.forEach((url) => loadStylesheet(url));

const scripts = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://kit.fontawesome.com/8708c9b117.js',
];
scripts.forEach((url) => loadScript(url));

// function checkToken() {
//   const token = localStorage.getItem('token');
//   if (!token && window.location.href === 'http://localhost:3000/login') {
//     window.location.href = '/login.html';
//   }
// }

// checkToken();
