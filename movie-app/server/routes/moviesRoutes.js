const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

router.get('/', controller.getMovies);
router.get('/:id', controller.getMovie);
router.post('/', controller.addMovie);
router.put('/:id', controller.updateMovie);
router.delete('/:id', controller.deleteMovie);
router.post('/:id/rate', controller.addRating);


module.exports = router;

