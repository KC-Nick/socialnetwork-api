const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsControllers');

// /api/thoughts
router
    .route('/')
    .post(createThought)
    .get(getThoughts);

// /api/thoughts/:id
router
    .route('/:_id')
    .put(updateThought)
    .get(getSingleThought)
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