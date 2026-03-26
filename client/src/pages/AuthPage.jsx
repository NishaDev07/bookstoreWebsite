import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../state/AuthContext';

export default function AuthPage({ mode = 'login' }) {
  const [searchParams] = useSearchParams();
  const presetRole = searchParams.get('role') || 'customer';
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: presetRole
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
    const payload = mode === 'register' ? form : { email: form.email, password: form.password };
    const { data } = await api.post(endpoint, payload);
    login(data);
    navigate('/');
  };

  return (
    <section className="section">
      <div className="container narrow">
        <div className="auth-card">
          <h1>{mode === 'register' ? 'Create your account' : 'Welcome back'}</h1>
          <p className="muted">A bookstore portal with role based access and polished commerce flow.</p>

          <form className="form-grid" onSubmit={submit}>
            {mode === 'register' && (
              <>
                <label>
                  Name
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </label>

                <label>
                  Role
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="customer">Customer</option>
                    <option value="author">Author</option>
                  </select>
                </label>
              </>
            )}

            <label>
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </label>

            <label>
              Password
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </label>

            <button className="primary-btn" type="submit">
              {mode === 'register' ? 'Create account' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
