import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhrases, deletePhrase, toggleLearned } from '../features/phrases/phrasesSlice';

export default function PhraseList() {
  const dispatch = useDispatch();
  const { list: phrases, status, error } = useSelector(state => state.phrases);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchPhrases(search));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, search]);

  const handleDelete = (id) => {
    if (window.confirm('Видалити цю фразу?')) {
      dispatch(deletePhrase(id));
    }
  };

  const handleToggleLearned = (id) => {
    dispatch(toggleLearned(id));
  };

  // Завантажити у JSON файл
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(phrases, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "phrases.json");
    dlAnchor.click();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук фрази..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px', fontSize: '1rem' }}
      />
      <button onClick={downloadJSON} style={{ marginBottom: '15px' }}>
        Завантажити JSON
      </button>
      {status === 'loading' && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {phrases.length === 0 && status === 'succeeded' && <p>Фрази не знайдені</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {phrases.map(p => (
          <li key={p.id} style={{ marginBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
            <strong>{p.en}</strong> — {p.ua}{' '}
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10 }}>Видалити</button>
            <button onClick={() => handleToggleLearned(p.id)} style={{ marginLeft: 10 }}>
              {p.learned ? 'Вивчено ✅' : 'Вивчити'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


