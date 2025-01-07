async function loadComponent(productName, productPrice) {
  const resp = await fetch('./components/Feed/index.html');
  const html = await resp.text();

  const div = document.createElement('div');
  div.innerHTML = html;
  div.className = 'shopee_ic';

  const productNameEl = div.getElementsByClassName('product-name')[0];
  productNameEl.innerHTML = productName;

  const productPriceEl = div.getElementsByClassName('product-price')[0];
  productPriceEl.innerHTML = productPrice;

  const productContainerEl = document.getElementById('product-container');
  productContainerEl.appendChild(div);
}

async function loadData() {
  const token = localStorage.getItem('token');
  const resp = await fetch(
    'https://delta-indie.vercel.app/api/jsonplaceholder.typicode.com/comments',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const json = await resp.json();
  return json;
}

async function loadPage() {
  const data = await loadData();

  const slicedData = data.slice(0, 12);

  slicedData.forEach(async (d) => {
    const productName = d.name;
    const productPrice = (d.body?.length || 1) * 1000;
    await loadComponent(productName, productPrice);
  });
}

loadPage();
