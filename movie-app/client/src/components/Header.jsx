import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = ({ theme, setTheme }) => {
  return (
    <header className={styles.header}>
      {/* Логотип */}
      <Link to="/" className={styles.logo}>
        🎬 Movie App
      </Link>

      {/* Посилання праворуч */}
      <Link to="/add" className={styles.addLink}>
        ➕ Додати фільм
      </Link>
      <button
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  style={{
    padding: "6px 10px",
    borderRadius: "6px",
    backgroundColor: "var(--primary-color)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }}
>
  {theme === "light" ? "🌙 Темна" : "☀️ Світла"}
</button>
    </header>
  );
};

export default Header;

