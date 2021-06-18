const offerController = require("../../../core/controllers/offer")

const getOffer = async(req,res,next)=>{
    try {
        if(req.repId) req.body.rep_id = req.repId;
        let offers = await offerController.getOffer(req.body)
        req.data = offers
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

const countOffer = async(req,res,next)=>{
    try {
        if(req.repId) req.body.rep_id = req.repId;
        let offerCount = await offerController.countOffer(req.body);
        req.data = offerCount
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {getOffer, countOffer}