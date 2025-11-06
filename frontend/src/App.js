import React, {useEffect, useState} from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Admin from './components/Admin';
import Auth from './components/Auth';

const API = process.env.REACT_APP_API || 'http://localhost:5000/api';

export const apiUrl = API;

function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (token && !user) {
      // optionally fetch profile
    }
  }, []);

  const onLogin = (u, token) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('token', token);
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>Simple E-commerce</h1>
      <Auth onLogin={onLogin} onLogout={onLogout} user={user} />
      <hr />
      <ProductList user={user} />
      <hr />
      <Cart user={user} />
      <hr />
      {user && user.role === 'admin' && <Admin />}
    </div>
  );
}

export default App;
