import api from './utils/axiosInstance';

export const fetchMovies = (params = {}) => {
    return api.get('/movies', { params }).then(res => res.data);
};

export const fetchMovieById = (id) => {
    return api.get(`/movies/${id}`).then(res => res.data);
};

export const addMovie = (movieData) => {
    return api.post('/movies', movieData).then(res => res.data);
};

export const rateMovie = (id, rating) => {
    return api.post(`/movies/${id}/rate`, { rating }).then(res => res.data);
};
