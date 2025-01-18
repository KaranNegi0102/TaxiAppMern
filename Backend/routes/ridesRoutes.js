const express = require("express");
const router = express.Router();
const {createRide} = require("../controllers/rideController");
const {body}= require("express-validator");
const {authUser} = require("../middlewares/authMiddleware");

router.post('/create',
  authUser,
[   
  body('pickup').isString().isLength({min:3}).withMessage("Origin is required"),
  body('destination').isString().isLength({min:3}).withMessage("Destination is required"),
  body('vehicleType').isString().isIn(['Bike','Car','Auto']).withMessage('Type is required'),
],createRide);


module.exports = router;