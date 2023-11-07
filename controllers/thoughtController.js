const Thought = require('../models/Thought');

module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate({ path: 'reactions', select: '-__v' });
            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate({ path: 'reactions', select: '-__v' });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        const { thoughtId } = req.params;
        const { body } = req.body;
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                thoughtId,
                { $set: { body } },
                { runValidators: true, new: true }
            );
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete(req.params.thoughtId);
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};