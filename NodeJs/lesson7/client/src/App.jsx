import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PhraseList from './components/PhraseList';
import AddPhraseForm from './components/AddPhraseForm';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">📋 Список</Link>
        <Link to="/add">➕ Додати</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PhraseList />} />
        <Route path="/add" element={<AddPhraseForm />} />
      </Routes>
    </Router>
  );
}

export default App;

