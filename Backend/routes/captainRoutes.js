const express = require("express");
const router = express.Router();
const {body} = require ("express-validator");

const {registerCaptain,loginCaptain,getProfile,logoutCaptain} = require("../controllers/captainController");
const {authCaptain} = require("../middlewares/authMiddleware");


router.post('/register',
  [
    body('fullname.firstName').isLength({min:3}).withMessage("First name is required"),
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:3}).withMessage("Password is required"),
    body('vehicle.color').isLength({min:3}).withMessage("Color is required"),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate is required'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity is required'),
    body('vehicle.vehicleType').isIn(['Bike','Car','Auto']).withMessage('Type is required')],
  registerCaptain) ;


router.post('/login',
  [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Password is required"),
  ]
,loginCaptain);


router.get('/profile',authCaptain,getProfile);

router.get('/logout',authCaptain,logoutCaptain);

module.exports = router;