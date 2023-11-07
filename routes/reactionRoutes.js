const express = require('express');
const { createReaction, deleteReaction } = require('../controllers/reactionController');
const router = express.Router({ mergeParams: true }); // Enable merging of params so we can access params from parent router (thoughts)
// Assuming the base URL coming into this router will be /thoughts/:thoughtId/reactions

router.post('/', createReaction);
router.delete('/:reactionId', deleteReaction);

module.exports = router;