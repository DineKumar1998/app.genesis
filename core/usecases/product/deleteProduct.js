//import model
const model = require("../../models/product");

//delete a Product  (setting product status to false)
module.exports = async (productId) => {
    let updateResponse = await model.deleteOne({ _id: productId }).exec() 
    if(updateResponse.ok == 1){
    return {Message:"Product deleted!!!"}
   }
   else{
       return {Error: "Something went wrong!!!"}
   }
}