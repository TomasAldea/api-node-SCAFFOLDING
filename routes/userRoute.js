const express = require('express')
const router = express.Router()
// Controllers
const userController = require("../controllers/userController")


// Define routes
router.post("/register-user", userController.registerUser)
router.post('/login', userController.loginUser);
router.patch('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

// export router
module.exports = router