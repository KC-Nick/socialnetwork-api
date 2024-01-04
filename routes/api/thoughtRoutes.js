const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsControllers');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(getSingleThought);

// /api/:thought
router
    .route('/:_id')
    .get(createThought)
    .delete(deleteThought);

// /api/:thought/reactions
router
    .route('/:_id/reactions')
    .post(addReaction);

// /api/:thoughtId/reactions/:reactionId
router
    .route('/:_id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;