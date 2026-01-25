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

async function addSneaker() {
  const name = document.getElementById('sneakerName').value;
  const brand = document.getElementById('brand').value;
  const price = document.getElementById('price').value;
  if (!name || !brand || !price) { alert('Fill all fields'); return; }

  const res = await fetch('/api/sneakers', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name, brand, price:Number(price)})
  });

  if(res.ok){
    document.getElementById('sneakerName').value='';
    document.getElementById('brand').value='';
    document.getElementById('price').value='';
    loadSneakers();
  } else {
    const err = await res.json();
    console.error(err);
    alert('Error adding sneaker');
  }
}

async function updateSneaker(id){
  await fetch(`/api/sneakers/${id}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name: document.getElementById('n'+id).value,
      brand: document.getElementById('b'+id).value,
      price: Number(document.getElementById('p'+id).value)
    })
  });
  loadSneakers();
}

async function deleteSneaker(id){
  await fetch(`/api/sneakers/${id}`, { method:'DELETE' });
  loadSneakers();
}

loadSneakers();
