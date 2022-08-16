const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

//routes for the users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friend/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
