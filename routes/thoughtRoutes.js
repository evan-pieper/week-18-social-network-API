const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, removeThought } = require('../../controllers/thoughController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);

module.exports = router;
