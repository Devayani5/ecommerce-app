import React, {useEffect, useState} from 'react';
import { apiUrl } from '../App';

export default function Cart({user}){
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(apiUrl + '/users/me', { headers:{'Authorization':'Bearer '+token} });
    if (res.ok) {
      const u = await res.json();
      setCart(u.cart || []);
    }
  };

  useEffect(()=> { fetchCart(); }, [user]);

  const remove = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(apiUrl + '/users/cart/' + id, { method:'DELETE', headers:{'Authorization':'Bearer '+token} });
    if (res.ok) fetchCart();
  };

  const checkout = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(apiUrl + '/orders/checkout', { method:'POST', headers:{'Authorization':'Bearer '+token} });
    if (res.ok) {
      alert('Order placed');
      fetchCart();
    } else {
      const d=await res.json();
      alert(d.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length===0 ? <p>No items</p> : (
        <div>
          {cart.map(ci=>(
            <div key={ci.product._id} style={{borderBottom:'1px solid #eee', padding:6}}>
              <b>{ci.product.name}</b> x {ci.quantity} — ₹{ci.product.price * ci.quantity}
              <button style={{marginLeft:8}} onClick={()=>remove(ci.product._id)}>Remove</button>
            </div>
          ))}
          <button onClick={checkout} style={{marginTop:10}}>Checkout</button>
        </div>
      )}
    </div>
  );
}
