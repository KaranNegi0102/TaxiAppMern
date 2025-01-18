const express = require("express");
const router = express.Router();
const {getMap,getDistance,getSuggestion} = require("../controllers/mapsControllers");
const {authUser} = require("../middlewares/authMiddleware");

const {query} = require("express-validator");


router.get('/get-Coordinates',
  query('address').isLength({min:3}).withMessage("Address is required"),
  authUser,getMap);

router.get('/get-distance-time',
  query('origin').isLength({min:3}).withMessage("Origin is required"),
  query('destination').isLength({min:3}).withMessage("Destination is required"),
  authUser,getDistance
)

router.get('/get-suggestions',
  query('input').isString().isLength({min:3}).withMessage("Input is required"),
  authUser,getSuggestion
)

module.exports = router;