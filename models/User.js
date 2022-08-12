const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: string,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: string,
            unique: true,
            required: true,
            match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },

        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],

        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    });

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = mongoose.model('User', userSchema);

module.exports = User;