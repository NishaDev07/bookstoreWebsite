import { useState } from 'react';
import api from '../lib/api';

export default function AuthorDashboard() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    authorName: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    language: 'English',
    tags: '',
    sampleText: ''
  });
  const [cover, setCover] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const body = new FormData();

    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (cover) body.append('cover', cover);
    if (bookFile) body.append('bookFile', bookFile);

    const { data } = await api.post('/books', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setMessage(data.message);
  };

  return (
    <section className="section">
      <div className="container narrow">
        <div className="auth-card">
          <h1>Author desk</h1>
          <p className="muted">Submit a book with optional PDF upload and extracted content for retrieval.</p>

          <form className="form-grid" onSubmit={submit}>
            <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label>Subtitle<input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></label>
            <label>Author name<input value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} required /></label>
            <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></label>
            <label>Price<input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></label>
            <label>Stock<input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label>
            <label>Language<input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} /></label>
            <label>Tags<input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="fiction, mystery, cozy" /></label>
            <label className="full">Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label>
            <label className="full">Sample text<textarea value={form.sampleText} onChange={(e) => setForm({ ...form, sampleText: e.target.value })} /></label>
            <label>Cover image<input type="file" accept="image/*" onChange={(e) => setCover(e.target.files[0])} /></label>
            <label>Book file<input type="file" accept=".pdf,.epub" onChange={(e) => setBookFile(e.target.files[0])} /></label>
            <button className="primary-btn" type="submit">Submit book</button>
          </form>

          {message && <p className="success-text">{message}</p>}
        </div>
      </div>
    </section>
  );
}
