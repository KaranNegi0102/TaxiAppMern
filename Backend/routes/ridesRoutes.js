const express = require("express");
const router = express.Router();
const {createRide,getFare} = require("../controllers/rideController");
const {query}= require("express-validator");
const {authUser} = require("../middlewares/authMiddleware");



router.post('/create',
  authUser,
[   
  query('pickup').isString().isLength({min:3}).withMessage("Origin is required"),
  query('destination').isString().isLength({min:3}).withMessage("Destination is required"),
  query('vehicleType').isString().isIn(['Bike','Car','Auto']).withMessage('Type is required'),
],createRide);

router.get('/get-fare',authUser,
  [
    query('pickup').isString().isLength({min:3}).withMessage("Origin is required"),
    query('destination').isString().isLength({min:3}).withMessage("Destination is required")
  ],
  getFare
)


module.exports = router;