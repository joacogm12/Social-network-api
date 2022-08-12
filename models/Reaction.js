const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    reactionId: {

    },

    reactionBody: {
        type: string,
        required: true,
        minLength: 1,
        maxLength: 280,
    },

    username: {
        type: string,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = reactionSchema;