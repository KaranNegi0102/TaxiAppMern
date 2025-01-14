const express = require("express");
const router = express.Router();
const {body} = require ("express-validator");
const {registerUser,loginUser,getProfile,logoutUser} = require("../controllers/userControllers");
const {authUser,authCaptain} = require("../middlewares/authMiddleware");

router.post('/register',
[
  body('email').isEmail().withMessage("Invalid email"),
  body('password').isLength({min:6}).withMessage("Password is required"),
  body('fullname.firstName').isLength({min:3}).withMessage("First name is required"),

],registerUser);

router.post('/login',
  [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Password is required"),
  ]
  ,loginUser);

router.get('/profile',authCaptain,getProfile);

router.get('/logout',authCaptain,logoutUser);




module.exports = router;