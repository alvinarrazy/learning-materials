async function onLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const data = await doLogin(username, password);
  const token = data.token;

  localStorage.setItem('token', token);
  window.location.href = '/';
}

async function doLogin(username, password) {
  // setLoading(true);
  try {
    let response = await fetch('https://delta-indie.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  } finally {
    // setLoading(false);
  }
}
