const mapService = require("../services/maps.sevice");
const {validationResult} = require("express-validator");

exports.getMap = async(req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }


  const {address} = req.query;
  try{
    console.log("this is address in mapsController-> ",address);
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json(coordinates);

  }catch(err){
    console.log("yaha par error h ")
    res.status(500).json({message: "Internal server error"});
  }
}

exports.getDistance = async(req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {origin,destination} = req.query;

  try{
    const distanceTime = await mapService.getDistanceTime(origin,destination);
    res.status(200).json(distanceTime);

  }catch(err){
    console.log("yaha par error h ")
    res.status(500).json({message: "Internal server error"});
  }

}

exports.getSuggestion = async(req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {input}= req.query;

  try{
    const suggestions = await mapService.autoComplete(input);
    res.status(200).json(suggestions);
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
}