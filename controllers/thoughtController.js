const { response } = require('express');
const { User, Thought, Reaction } = require('../models');
const userControllers = require('./userController');

const thoughtControllers = {
    getAllThought(req, res) {
        Thought.find()
            .then((response) => { res.status(200).json(response) })
            .catch((err) => { res.status(404).json(err) })
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((response) => {
                if (!response) {
                    res.status(404).json({ message: 'No thought found with that ID' });
                }
                res.status(200).send(response);
            })
            .catch((err) => { res.status(500).json(err) });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then((response) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: response._id } },
                    { runValidators: true, new: true }
                )
            })
            .then((response) => {
                !response
                    ? res.status(404).json({ message: 'no user found with that id' })
                    : res.status(200).json(response)
            })
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText } },
            { runValidators: true, new: true }
        )
            .then((response) => {
                !response
                    ? res.status(400).json({ message: 'No thought found with that ID' })
                    : res.status(200).json(response)
            })
            .catch((err) => { res.status(500).json(err) });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((response) => {
                if (!response) {
                    return res.status(400).json({ message: 'No thought found with that ID' })
                }
                return User.findOneAndUpdate(
                    { username: response.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { runValidators: true, new: true }
                )
            })
            .then((response) => {
                if (!response) {
                    res.status(404).json({ message: 'no user found with that id' });
                    return;
                }
                res.status(200).json(response)
            })
            .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((response) => { res.status(200).json(response) })
            .catch((err) => { res.status(500).json(err) });
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((response) => { res.status(200).json(response) })
            .catch((err) => { res.status(500).json(err) });
    },
}

module.exports = thoughtControllers;