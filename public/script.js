async function loadSneakers(){
 const res = await fetch('/api/sneakers');
 const data = await res.json();
 const list = document.getElementById('list');
 list.innerHTML='';
 data.forEach(s=>{
  list.innerHTML+=`
  <div class="card">
   <input id="n${s._id}" value="${s.name}">
   <input id="b${s._id}" value="${s.brand}">
   <input id="p${s._id}" value="${s.price}">
   <button onclick="updateSneaker('${s._id}')">Update</button>
   <button onclick="deleteSneaker('${s._id}')">Delete</button>
  </div>`;
 });
}
async function addSneaker(){
 await fetch('/api/sneakers',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   name:sneakerName.value,
   brand:brand.value,
   price:Number(price.value)
  })
 });
 loadSneakers();
}
async function updateSneaker(id){
 await fetch('/api/sneakers/'+id,{
  method:'PUT',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
   name:document.getElementById('n'+id).value,
   brand:document.getElementById('b'+id).value,
   price:Number(document.getElementById('p'+id).value)
  })
 });
 loadSneakers();
}
async function deleteSneaker(id){
 await fetch('/api/sneakers/'+id,{method:'DELETE'});
 loadSneakers();
}
loadSneakers();