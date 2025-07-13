import React, { useEffect, useState } from 'react';

function TournamentList({ tournaments }) {
  return (
    <div>
      <h2>Список турнірів</h2>
      <table border="1" cellPadding="5">
        <thead>  
          <tr>
            <th>Назва</th>
            <th>Місто</th>
            <th>Організатор</th>
            <th>Призовий фонд</th>
            <th>Гравці</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.city}</td>
              <td>{t.organizer}</td>
              <td>{t.prize_pool}</td>
              <td>{t.players_registered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CityList({ cities }) {
  return (
    <div>
      <h2>Унікальні міста</h2>
      <ul>
        {cities.map(city => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
}

function Statistics({ stats }) {
  return (
    <div>
      <h2>Статистика</h2>
      <p>Загальна кількість турнірів: {stats.totalTournaments}</p>
      <p>Середній призовий фонд: {stats.averagePrizePool}</p>
      <p>Загальна кількість гравців: {stats.totalPlayers}</p>
    </div>
  );
}

export default function App() {
  const [tournaments, setTournaments] = useState([]);
  const [cities, setCities] = useState([]);
  const [stats, setStats] = useState({});
  const [filteredTournaments, setFilteredTournaments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tournaments').then(res => res.json()).then(setTournaments);
    fetch('http://localhost:3001/api/cities').then(res => res.json()).then(setCities);
    fetch('http://localhost:3001/api/statistics').then(res => res.json()).then(setStats);
  }, []);

  const loadTop = () => {
    fetch('http://localhost:3001/api/top').then(res => res.json()).then(setFilteredTournaments);
  };

  const loadAboveAverage = () => {
    fetch('http://localhost:3001/api/above-average').then(res => res.json()).then(setFilteredTournaments);
  };

  return (
    <div style={{ padding: 20 }}>
      <Statistics stats={stats} />
      <CityList cities={cities} />
      <TournamentList tournaments={filteredTournaments.length ? filteredTournaments : tournaments} />
      <button onClick={loadTop} style={{ marginRight: 10 }}>Топ 5 турнірів</button>
      <button onClick={loadAboveAverage}>Показати дорогі турніри</button>
    </div>
  );
}