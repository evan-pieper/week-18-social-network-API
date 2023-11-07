const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, removeThought } = require('../../controllers/thoughController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);

module.exports = router;
