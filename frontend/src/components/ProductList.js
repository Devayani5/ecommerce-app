import React, {useEffect, useState} from 'react';
import { apiUrl } from '../App';

export default function ProductList({user}){
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    fetch(apiUrl + '/products')
      .then(r=>r.json()).then(setProducts);
  }, []);

  const addToCart = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login');
    const res = await fetch(apiUrl + '/users/cart', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({productId:id, quantity:1})
    });
    if (res.ok) alert('Added to cart');
    else {
      const d = await res.json();
      alert(d.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
        {products.map(p=>(
          <div key={p._id} style={{border:'1px solid #ddd', padding:10}}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹ {p.price} | Stock: {p.stock}</p>
            <button onClick={()=>addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
