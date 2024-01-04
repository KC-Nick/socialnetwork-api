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
    .route('/thoughts')
    .get(getThoughts)
    .post(getSingleThought);

// /api/:thought
router
    .route('/:thoughtId')
    .get(createThought)
    .delete(deleteThought);

// /api/:thought/reactions
router
    .route('/:id/reactions')
    .post(addReaction);

// /api/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;