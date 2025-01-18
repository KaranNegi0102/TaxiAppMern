const express = require("express");
const router = express.Router();

const {body}= require("express-validator");

router.post('/create',
[
  body('userId').isString().withMessage("User id is required"),
  body('pickup').isLength({min:3}).withMessage("Origin is required"),
  body('destination').isLength({min:3}).withMessage("Destination is required"),
  
],)


module.exports = router;