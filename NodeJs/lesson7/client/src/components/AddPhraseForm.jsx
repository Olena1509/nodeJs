import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhrase } from '../features/phrases/phrasesSlice';
import { useNavigate } from 'react-router-dom';

export default function AddPhraseForm() {
  const [en, setEn] = useState('');
  const [ua, setUa] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!en.trim() || !ua.trim()) {
      alert('Будь ласка, заповніть обидва поля');
      return;
    }

    try {
      await dispatch(addPhrase({ en, ua })).unwrap();
      navigate('/');
    } catch (err) {
      alert('Помилка при додаванні фрази');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
      <label>
        Англійська фраза:
        <input
          type="text"
          value={en}
          onChange={e => setEn(e.target.value)}
          style={{ width: '100%', marginBottom: 15, padding: 8, fontSize: '1rem' }}
        />
      </label>
      <label>
        Переклад:
        <input
          type="text"
          value={ua}
          onChange={e => setUa(e.target.value)}
          style={{ width: '100%', marginBottom: 15, padding: 8, fontSize: '1rem' }}
        />
      </label>
      <button type="submit" style={{ padding: '10px', fontSize: '1rem' }}>Додати фразу</button>
    </form>
  );
}
