import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhrases = createAsyncThunk(
  'phrases/fetchPhrases',
  async (search = '') => {
    const res = await axios.get(`${API_URL}/phrases?search=${encodeURIComponent(search)}`);
    return res.data;
  }
);

export const addPhrase = createAsyncThunk(
  'phrases/addPhrase',
  async (newPhrase) => {
    const res = await axios.post(`${API_URL}/phrases`, newPhrase);
    return res.data;
  }
);

export const deletePhrase = createAsyncThunk(
  'phrases/deletePhrase',
  async (id) => {
    await axios.delete(`${API_URL}/phrases/${id}`);
    return id;
  }
);

export const toggleLearned = createAsyncThunk(
  'phrases/toggleLearned',
  async (id) => {
    const res = await axios.put(`${API_URL}/phrases/${id}`);
    return res.data;
  }
);

const phrasesSlice = createSlice({
  name: 'phrases',
  initialState: {
    list: JSON.parse(localStorage.getItem('phrases')) || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhrases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        localStorage.setItem('phrases', JSON.stringify(state.list)); // кешування
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPhrase.fulfilled, (state, action) => {
        state.list.push(action.payload);
        localStorage.setItem('phrases', JSON.stringify(state.list));
      })
      .addCase(deletePhrase.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
        localStorage.setItem('phrases', JSON.stringify(state.list));
      })
      .addCase(toggleLearned.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          localStorage.setItem('phrases', JSON.stringify(state.list));
        }
      });
  },
});

export const { setList } = phrasesSlice.actions;
export default phrasesSlice.reducer;

