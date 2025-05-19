import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhrases, deletePhrase } from '../features/phrases/phrasesSlice';

export default function PhraseList() {
  const dispatch = useDispatch();
  const phrases = useSelector((state) => state.phrases);
  const isArray = Array.isArray(phrases); // ✅ Сюди вставляємо
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPhrases(search));
  }, [dispatch, search]);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(phrases, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'phrases.json';
    link.click();
  };

  return (
    <div>
      <h2>Список фраз</h2>
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={downloadJSON}>⬇️ Завантажити JSON</button>
      
      <ul>
        {isArray ? (
          phrases.map((p) => (
            <li key={p.id}>
              <strong>{p.en}</strong> — {p.ua}
              <button onClick={() => dispatch(deletePhrase(p.id))}>Видалити</button>
            </li>
          ))
        ) : (
          <li>❌ Помилка: дані не є масивом</li>
        )}
      </ul>
    </div>
  );
}
