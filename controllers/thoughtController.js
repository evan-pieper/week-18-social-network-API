const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate({path: 'reactions', select: '-__v'});//.populate({path:"users", select: '-__v'});
            res.status(200).json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate("users"); // Find thought by ID and populate users
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate( // Find user by ID and update it by pushing a thought to the thoughts array
                { _id: req.body.authorId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        const { thoughtId } = req.params;
        const { body } = req.body;
        try {
            const updatedThought = await Thought.findOneAndUpdate( // Find thought by ID and update it
                thoughtId,
                { $set: { body } },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with that ID' }); // If no thought with that ID, return 404
            }
            res.status(200).json(updatedThought); // Otherwise, return updated thought
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete(req.params.thoughtId); // Find thought by ID and delete it
            res.status(200).json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};