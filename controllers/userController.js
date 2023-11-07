const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {  // Get a single user by ID
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');
            if (!user) {return res.status(404).json({ message: 'No user with that ID' });}
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {   // Create a user based on request body
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {   // Update a user
        const { userId } = req.params;
        const { username, email , friends} = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email , friends},
                { new: true, runValidators: true }
            );
            if (!updatedUser) {return res.status(404).json({ message: 'No user with that ID' });} // If no user with that ID, return 404
            res.json(updatedUser); // Otherwise, return updated user
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {     // Delete a user and associated apps
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {return res.status(404).json({ message: 'No user with that ID' });}
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};