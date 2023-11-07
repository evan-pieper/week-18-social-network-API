const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
import ReactionSchema from './Reaction.js';

const ThoughtSchema = new Schema({
	thoughtText: {type: String, required: true, minlength: 1, maxlength: 280 }, // tells the schema to only allow 1-280 characters per thought
	createdAt: {type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp)},
	username: {type: String, required: true},
	reactions: [ReactionSchema] // use ReactionSchema to validate data for a reaction
}, {
	toJSON: {
		getters: true, // tells the schema to use getter functions specified in the schema when data is requested
		virtuals: true // tells the schema to include virtuals when json data is sent
	},
	id: false
});

ThoughtSchema.virtual('reactionCount').get(function() { // virtual that returns the number of reactions in a thought's reactions array
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;