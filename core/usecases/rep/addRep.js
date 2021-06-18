//import model
const model = require("../../models/rep");
const mongoose = require("mongoose");
const getReps = require("./getReps");
//save a Rep
module.exports = async (rep) => {
  rep._id = new mongoose.Types.ObjectId();
  let repRecords = await getReps({email:rep.email});
  if(repRecords.length>0){
     throw new Error("Distributor/MR already Exists!!!");
  }
    
  return (await new model(rep).save()).toObject();  
}