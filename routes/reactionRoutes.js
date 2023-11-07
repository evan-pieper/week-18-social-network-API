const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable merging of params so we can access params from parent router (thoughts)
const { addReaction, removeReaction } = require('../controllers/reactionController');
// Assuming the base URL coming into this router will be /thoughts/:thoughtId/reactions

router.post('/', addReaction);
router.delete('/:reactionId', removeReaction);

module.exports = router;