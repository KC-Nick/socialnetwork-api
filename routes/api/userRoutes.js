const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userControllers');

// /api/users
router
    .route('/users')
    .get(getUsers)
    .post(createUser);

// /api/users/:user
router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser);

// /api/users/:user/friends
router
    .route('/:userId/friends')
    .post(addFriend);

// /api/users/:user/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend);

module.exports = router;