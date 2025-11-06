import React, {useState} from 'react';
import { apiUrl } from '../App';

export default function Admin(){
  const [form, setForm] = useState({name:'', price:0, description:'', stock:0});

  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(apiUrl + '/products', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({...form, price: Number(form.price), stock: Number(form.stock)})
    });
    if (res.ok) {
      alert('Product added — refresh products list');
    } else {
      const d = await res.json();
      alert(d.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Admin — Add Product</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handle} /><br/>
      <input name="price" placeholder="Price" value={form.price} onChange={handle} /><br/>
      <input name="stock" placeholder="Stock" value={form.stock} onChange={handle} /><br/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handle}></textarea><br/>
      <button onClick={submit}>Create Product</button>
    </div>
  );
}
