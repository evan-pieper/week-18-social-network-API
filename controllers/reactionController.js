const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

module.exports = {
    async createReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
            if (!reaction) {return res.status(404).json({ message: 'No user with that ID' });}
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};