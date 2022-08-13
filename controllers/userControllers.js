const { user, thought } = require('../models');

const userControllers = {
    //get all users
    getAllUsers(req, res) {
        user.find()
            .then((users) => res.staus(200).json(users))
            .catch((err) => res.status(500).json(err))
    }
}

module.exports = userControllers;