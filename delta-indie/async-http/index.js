function setLoading(isLoading) {
  const loadingContainerEl = document.getElementById('loading-container');
  if (isLoading) {
    loadingContainerEl.innerText = 'Loading...';
  } else {
    loadingContainerEl.innerText = '';
  }
}

async function fetchPostData() {
  setLoading(true);
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  } finally {
    setLoading(false);
  }
}

async function renderPosts(name) {
  const posts = await fetchPostData();
  const postContainerEl = document.getElementById('post-container');

  const nameEl = document.createElement('div');
  nameEl.innerText = 'Hi ' + name;
  postContainerEl.appendChild(nameEl);

  if (posts?.length) {
    posts.forEach(async (post) => {
      const postEl = document.createElement('div');
      const nameEl = document.createElement('span');
      const titleEl = document.createElement('h3');
      const bodyEl = document.createElement('p');

      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users?id=${post.userId}`,
      );
      const user = await userResponse.json();
      nameEl.innerText = user?.[0]?.name;
      titleEl.innerText = post.title + ' - ';
      bodyEl.innerText = post.body;

      titleEl.appendChild(nameEl);

      postEl.appendChild(titleEl);
      postEl.appendChild(bodyEl);

      postContainerEl.appendChild(postEl);
    });
  }
}

async function login() {
  const input = document.getElementById('username').value;
  setLoading(true);
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${input}`,
    );
    let data = await response.json();
    if (!data?.length) {
      throw new Error('Username tidak ditemukan');
    }

    await renderPosts(data[0]?.name);
  } catch (error) {
    console.log('Error:', error);
  } finally {
    setLoading(false);
  }
}

// renderPosts();
