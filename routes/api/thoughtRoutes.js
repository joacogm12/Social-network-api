const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

//routes for all the thought of the users
router.route('/')
    .get(getAllThought)
    .post(createThought);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reaction')
    .post(addReaction)

router.route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction);

module.exports = router;