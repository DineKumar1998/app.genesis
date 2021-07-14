const model = require("../../models/company_order");

module.exports = async(filters) => {
    // const regex = new RegExp(escapeRegex(filters), 'gi');

    return await model.find(filters).populate("rep_id").exec()

    // return await model.find({ $or: [{
    //     [field]: regex }] }).exec()
}

// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

