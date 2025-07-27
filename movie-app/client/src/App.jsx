// src/App.jsx
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import AddMovieForm from "./components/AddMovieForm";
import Header from "./components/Header";
import "./styles/themes.scss"; // Імпортуємо шапку

export default function App() {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <Router>
      <Header theme={theme} setTheme={setTheme} />

      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<AddMovieForm />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </main>
    </Router>
  );
}
