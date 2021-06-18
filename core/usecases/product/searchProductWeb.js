//import model
const model = require("../../models/product");

//get product  
module.exports = async(filters) => {
        let data = Object.values(filters.data)[0]
        let field = Object.keys(filters.data)[0];
        const regex = new RegExp(escapeRegex(data), 'gi');
        return await model.find({ $or: [{
                [field]: regex }] }).populate("division_id").populate("type_id").populate("category_id").exec()
    }
    //$or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//{ $text: { $search: filters,$caseSensitive:false, } }