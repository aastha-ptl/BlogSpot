const express = require('express');
const { registerUser, loginUser,getUserProfile,updateUserProfile,changePassword} = require('../controller/authcontroller');
const auth = require('../Middleware/authmiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',auth, getUserProfile);
router.put('/update-profile', auth, updateUserProfile);
router.put('/change-password', auth, changePassword);
module.exports = router;
