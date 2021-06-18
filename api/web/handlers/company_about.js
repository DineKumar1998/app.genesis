const aboutController = require("../../../core/controllers/company_about")

const addUpdate =async (req, res, next)=>{

    try {
        if(req.file) req.body.image = req.file.path;
        else req.body.image = undefined;
        let rs = await aboutController.addUpdateFile(req.body);
        req.data = rs;
        next();
    }
    catch (e) {
        req.status = 400;
        next(e);
    }
}


const get = async(req,res,next)=>{
    try {
        let rs = await aboutController.get()
        req.data = rs
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}



module.exports = { addUpdate, get}