const express = require('express');
const router = express.Router();

const { create_user, get_all_users, get_users_by_name } = require('../Controllers/User_controller.js');

router.post('/create-user', create_user);
router.get('/get-users', get_all_users);
router.get('/get-users-by-name', get_users_by_name);

module.exports = router;
