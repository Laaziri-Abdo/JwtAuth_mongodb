const express = require('express');
const router = express.Router();


// requiring Controllers
const Users = require('../controllers/Users');

// routes
router
.route('/login')
.get( Users.loadLoginPage )
.post( Users.handleLogin );

router
.route('/register')
.get( Users.loadRegisterPage )
.post( Users.handleRegister );



module.exports = router;