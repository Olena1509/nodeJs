const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const moviesRoutes = require('./routes/moviesRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
