import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER = 'http://localhost:3001';

function App() {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('title');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${SERVER}/products`);
    setProducts(res.data);
  };

  const sortProducts = async () => {
    const res = await axios.post(`${SERVER}/products/sort`, {
      key: sortKey,
      order
    });
    setProducts(res.data);
  };

  const buyProduct = async (id) => {
    const quantity = 1;
    try {
      const res = await axios.post(`${SERVER}/purchase`, { id, quantity });
      alert(res.data.message);
      fetchProducts();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Список продуктів</h1>
      <div>
        <select onChange={e => setSortKey(e.target.value)}>
          <option value="title">Назва</option>
          <option value="price">Ціна</option>
        </select>
        <select onChange={e => setOrder(e.target.value)}>
          <option value="asc">↑ Зростання</option>
          <option value="desc">↓ Спадання</option>
        </select>
        <button onClick={sortProducts}>Сортувати</button>
      </div>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong> - ${p.price} | Stock: {p.stock}
            <button onClick={() => buyProduct(p.id)}>Купити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
