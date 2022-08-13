const { User, Thought } = require('../models');

const userControllers = {

    //get all users
    getAllUsers(req, res) {
        User.find()
            .then((response) => { res.status(200).json(response) })
            .catch((err) => { res.status(404).json(err) })
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((response) => {
                if (!response) {
                    res.status(404).json({ message: 'No user found with that ID' });
                }
                res.status(200).send(response);
            })
            .catch((err) => { res.status(500).json(err) });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((response) => { res.status(200).json(response) })
            .catch((err) => { res.status(400).json(err) });
    },

    updateUser(req, res) {
        User.findOneAndUpdate
            (
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            .then((response) => {
                !response
                    ? res.status(400).json({ message: 'No user found with that ID' })
                    : res.status(200).json(response)
            })
            .catch((err) => { res.status(500).json(err) });
    },

    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.userId })
            .then((response) => {
                !response
                    ? res.status(400).json({ message: 'No user found with that ID' })
                    : Thought.deleteMany({ _id: { $in: response.thoughts } })
            })
            .then(() => res.status(200).json({ message: 'user and associated thoughts deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate
            (
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            )
            .then((response) => {
                console.log(response);
                !response
                    ? res.status(400).json({ message: 'no user found with that id' })
                    : res.status(200).json({ message: 'friend succesfully added' });
            })
            .catch((err) => { res.status(500).json(err) });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate
            (
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            )
            .then((response) => {
                !response
                    ? res.status(400).json({ message: 'no user found with that id' })
                    : res.status(200).json({ message: 'friend removed' })
            })
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = userControllers;