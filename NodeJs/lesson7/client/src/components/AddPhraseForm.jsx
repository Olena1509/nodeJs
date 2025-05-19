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
    if (!en || !ua) return;
    await dispatch(addPhrase({ en, ua }));
    setEn('');
    setUa('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Додати фразу</h2>
      <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="🇬🇧 Англійська" />
      <input value={ua} onChange={(e) => setUa(e.target.value)} placeholder="🇺🇦 Переклад" />
      <button type="submit">Додати</button>
    </form>
  );
}

