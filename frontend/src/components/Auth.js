import React, {useState} from 'react';
import { apiUrl } from '../App';

export default function Auth({onLogin, onLogout, user}){
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({name:'', email:'', password:''});
  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async () => {
    const url = mode === 'login' ? '/auth/login' : '/auth/signup';
    const res = await fetch(apiUrl + url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      onLogin(data.user, data.token);
    } else alert(data.message || 'Error');
  };

  if (user) {
    return <div>
      <b>Signed in as:</b> {user.name} ({user.role}) <button onClick={onLogout}>Logout</button>
    </div>;
  }

  return (
    <div>
      <button onClick={()=>setMode('login')}>Login</button>
      <button onClick={()=>setMode('signup')}>Signup</button>
      <div style={{marginTop:10}}>
        {mode==='signup' && <input name="name" placeholder="Name" value={form.name} onChange={handle} />}
        <input name="email" placeholder="Email" value={form.email} onChange={handle} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} />
        <button onClick={submit}>{mode==='login' ? 'Login' : 'Signup'}</button>
      </div>
    </div>
  );
}
