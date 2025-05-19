// src/components/AddPhraseForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhrase } from '../features/phrases/phrasesSlice';
import { useNavigate } from 'react-router-dom';

export default function AddPhraseForm() {
  const [en, setEn] = useState('');
  const [ua, setUa] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPhrase({ en, ua }));
    setEn('');
    setUa('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Додати нову фразу</h2>
      <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="Англійська фраза" />
      <input value={ua} onChange={(e) => setUa(e.target.value)} placeholder="Переклад" />
      <button type="submit">Додати</button>
    </form>
  );
}