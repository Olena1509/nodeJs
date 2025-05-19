// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import phrasesReducer from './features/phrases/phrasesSlice.js';


export const store = configureStore({
  reducer: {
    phrases: phrasesReducer
  }
});

export default store;