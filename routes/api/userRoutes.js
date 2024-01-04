const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    updateUser,
} = require('../../controllers/userControllers');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:user
router
    .route('/:_id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:user/friends
router
    .route('/:_id/friends')
    .post(addFriend);

// /api/users/:user/friends/:friendId
router
    .route('/:_id/friends/:friendId')
    .delete(removeFriend);

module.exports = router;