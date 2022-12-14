const { Schema, model } = require('mongoose');

//schema for the reactions
const reactionSchema = Schema({
    reactionId: {

    },

    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = reactionSchema;