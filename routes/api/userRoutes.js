const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUser);

module.exports = router;