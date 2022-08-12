const mongoose = require('mongoose');
const { reactionSchema } = require('./Reaction')

const thoughtSchema = mongoose.Schema({
    thoughtText: {
        type: string,
        required: true,
        minLength: 1,
        maxLength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    username: {
        type: string,
        required: true
    },

    reactions: [reactionSchema]
})

thoughtSchema.virtual('reactionsCount')
    .get(function () {
        return this.reactions.length
    })

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;