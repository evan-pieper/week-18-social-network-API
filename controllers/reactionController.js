const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

module.exports = {
    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate( // Find thought by ID and update it by pushing a reaction to the reactions array
              req.params.thoughtId,
              { $push: { reactions: req.body } },
              { new: true, runValidators: true } // Return the updated thought
            );
            if (!thought) {return res.status(404).json({ message: 'No thought found with this id!' });} // If no thought with that ID, return 404

            res.status(200).json(thought); // Otherwise, return updated thought
          } catch (error) {
            res.status(500).json({ message: 'Error adding reaction', error: error });
          }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate( // Find thought by ID and update it by pulling a reaction from the reactions array
              req.params.thoughtId,
              { $pull: { reactions: { _id: req.params.reactionId } } },
              { new: true }
            );    
            if (!thought) {return res.status(404).json({ message: 'No thought found with this id!' });} // If no thought with that ID, return 404
    
            res.status(200).json(thought); // Otherwise, return updated thought (without the deleted reaction)
          } catch (error) {
            res.status(500).json({ message: 'Error removing reaction', error: error });
          }
    }
};