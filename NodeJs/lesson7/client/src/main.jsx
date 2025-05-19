import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Це шукається в src/App.js
import { Provider } from 'react-redux';
import store from './store'; // ✅ Це шукається в src/store.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
