const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true }, // trim removes whitespace
    email: { type: String, unique: true, required: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },  // match checks for valid email address
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }], // ref tells User model which documents to search to find the right thoughts
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]  // ref tells User model which documents to search to find the right friends
}, {
    toJSON: {
        virtuals: true, // tells schema to include virtuals when sending json data
    },
    id: false, // tells schema to not include virtual id when sending json data, so that just the _id field is included
});

UserSchema.virtual('friendCount').get(function() { // virtual that returns the number of friends in a user's friends array
    return this.friends.length;
});

const User = model('User', UserSchema); // creates User model
module.exports = User; // exports User model