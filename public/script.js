async function loadSneakers(sortBy) {
  const brand = document.getElementById('searchBrand').value;
  let url = '/api/sneakers';

  if (brand) url += `?brand=${brand}`;
  if (sortBy) url += (brand ? '&' : '?') + `sortBy=${sortBy}`;

  const res = await fetch(url);
  const sneakers = await res.json();

  const list = document.getElementById('list');
  list.innerHTML = '';

  sneakers.forEach(s => {
    list.innerHTML += `
      <div class="card">
        <h3>${s.name}</h3>
        <div class="brand">${s.brand}</div>
        <div>Size: ${s.size}</div>
        <div>Color: ${s.color}</div>
        <div>Category: ${s.category}</div>
        <div class="price">$${s.price}</div>

        <input id="n${s._id}" value="${s.name}">
        <input id="b${s._id}" value="${s.brand}">
        <input id="p${s._id}" type="number" value="${s.price}">

        <div class="actions">
          <button class="update" onclick="updateSneaker('${s._id}')">Update</button>
          <button class="delete" onclick="deleteSneaker('${s._id}')">Delete</button>
        </div>
      </div>
    `;
  });
}

async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  });

  alert(res.ok ? 'Logged in' : 'Invalid credentials');
}

async function addSneaker() {
  const name = document.getElementById('sneakerName').value;
  const brand = document.getElementById('brand').value;
  const price = document.getElementById('price').value;
  const size = document.getElementById('size').value;
  const color = document.getElementById('color').value;
  const category = document.getElementById('category').value;

  if (!name || !brand || !price || !size || !color || !category) {
    alert('Fill all fields');
    return;
  }

  const res = await fetch('/api/sneakers', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      brand,
      price: Number(price),
      size: Number(size),
      color,
      category
    })
  });

  if (res.status === 401) {
    alert('Please login first');
    return;
  }

  if (!res.ok) {
    alert('Error adding sneaker');
    return;
  }

  document.getElementById('sneakerName').value = '';
  document.getElementById('brand').value = '';
  document.getElementById('price').value = '';
  document.getElementById('size').value = '';
  document.getElementById('color').value = '';
  document.getElementById('category').value = '';

  loadSneakers();
}

async function updateSneaker(id) {
  const res = await fetch(`/api/sneakers/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('n' + id).value,
      brand: document.getElementById('b' + id).value,
      price: Number(document.getElementById('p' + id).value)
    })
  });

  if (res.status === 401) {
    alert('Please login first');
    return;
  }

  loadSneakers();
}

async function deleteSneaker(id) {
  const res = await fetch(`/api/sneakers/${id}`, { 
    method: 'DELETE', credentials: 'include' });

  if (res.status === 401) {
    alert('Please login first');
    return;
  }

  loadSneakers();
}

loadSneakers();