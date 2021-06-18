//import model
const model = require("../../models/offers");
const mongoose = require("mongoose");

//save a offer
module.exports = async (Offer) => {
  Offer._id = new mongoose.Types.ObjectId();
  console.log("Offer", Offer)

    
  return (await new model(Offer).save()).toObject();  
}