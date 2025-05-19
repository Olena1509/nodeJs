import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhrases = createAsyncThunk('phrases/fetchPhrases', async (search = '') => {
  const res = await axios.get(`${API_URL}/api/phrases?search=${search}`);
  return res.data;
});

export const addPhrase = createAsyncThunk('phrases/addPhrase', async (phrase) => {
  const res = await axios.post(`${API_URL}/api/phrases`, phrase);
  return res.data;
});

export const deletePhrase = createAsyncThunk('phrases/deletePhrase', async (id) => {
  await axios.delete(`${API_URL}/api/phrases/${id}`);
  return id;
});

export const toggleLearned = createAsyncThunk('phrases/toggleLearned', async (id) => {
  const res = await axios.put(`${API_URL}/api/phrases/${id}`);
  return res.data;
});

const phrasesSlice = createSlice({
  name: 'phrases',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhrases.fulfilled, (_, action) => action.payload)
      .addCase(addPhrase.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deletePhrase.fulfilled, (state, action) =>
        state.filter(p => p.id !== action.payload)
      )
      .addCase(toggleLearned.fulfilled, (state, action) => {
        const index = state.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      });
  },
});

export default phrasesSlice.reducer;
