const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

// Schema for reactions (subdocument of Thought model)
const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()}, // Default function generates a new unique identifier for each reaction
    reactionBody: {type: String, required: true, maxlength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp)}
}, {
    toJSON: {
        getters: true // Applies the getter function to the data when it's requested
    }
});

// Since this isn't a model but a subdocument schema for the Thought model, we don't need to initialize an instance of the model. Instead, we export the schema directly.
module.exports = reactionSchema;