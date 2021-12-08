const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);

router.get("/register", userController.registerGetUser);

router.post("/login", userController.loginUser);

router.get("/login", userController.loginGetUser);

router.post("/verify", userController.verifyPostUser)

router.get("/verify", userController.verifyGetUser);

router.get("/auth", userController.authUser);

router.get("/logout", userController.logOut);


module.exports = router;
