import { useState } from 'react';
import api from '../lib/api';

export default function ChatbotPanel({ bookId = null }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const { data } = await api.post('/chatbot/ask', { question, bookId });
      setAnswer(data.answer);
    } catch (error) {
      setAnswer(error.response?.data?.message || 'Something went wrong while asking the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-panel">
      <div className="section-head">
        <div>
          <h3>Ask the bookstore assistant</h3>
          <p>Get grounded answers from indexed book content and catalog descriptions.</p>
        </div>
      </div>

      <form className="chat-form" onSubmit={ask}>
        <textarea
          placeholder="Ask about themes, summary, tone, suitability, or related books..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="primary-btn" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {answer && (
        <div className="answer-box">
          <h4>Assistant</h4>
          <p>{answer}</p>
        </div>
      )}
    </section>
  );
}
