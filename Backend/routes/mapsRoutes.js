const express = require("express");
const router = express.Router();
const {mapsController} = require("../controllers/mapsControllers");
const {authUser} = require("../middlewares/authMiddleware");

const {query} = require("express-validator");


router.get('/get-Coordinates',
  query('address').isLength({min:3}).withMessage("Address is required"),
  authUser,mapsController);

module.exports = router;