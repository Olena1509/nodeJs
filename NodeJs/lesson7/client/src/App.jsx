import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PhraseList from './components/PhraseList';
import AddPhraseForm from './components/AddPhraseForm';

export default function App() {
  // Темна/світла тема (збереження в localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="app-container" style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
        <header style={{ marginBottom: 20 }}>
          <h1>Словник фраз (PhraseBook)</h1>
          <nav>
            <Link to="/" style={{ marginRight: 10 }}>Список</Link>
            <Link to="/add">Додати нову фразу</Link>
          </nav>
          <button onClick={() => setDarkMode(!darkMode)} style={{ marginTop: 10 }}>
            {darkMode ? 'Світла тема' : 'Темна тема'}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<PhraseList />} />
          <Route path="/add" element={<AddPhraseForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
