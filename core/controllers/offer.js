//import use cases
const addOffer = require("../usecases/offers/addOffer");
const getOffer = require("../usecases/offers/getOffers");
const countOffer = require("../usecases/offers/countOffer");
const updateOffer = require("../usecases/offers/updateOffer");
const deleteOffer = require("../usecases/offers/deleteOffer");
//import moment for date formatting
const moment = require("moment");


//Add Offer
exports.addOffer = async(offerImage, offer) => {

    if(offer.reps){
        offer.reps = (offer.reps).split(",");
    }
    
    if (!offer.title) throw new Error('offer title is Required');
    if (!offer.description) throw new Error('offer description is Required');
    if (!offer.valid_upto) throw new Error('offer valid_upto is Required');

    offer.image = null;

    if (offerImage)
        offer.image = offerImage.path;

    let newoffer = {
        title: offer.title,
        description: offer.description,
        valid_upto: offer.valid_upto,
        image: offer.image,
        reps: offer.reps ? Array.isArray(offer.reps) ? offer.reps : [] : [],
        created_on: new Date(Date.now())
    }
    let savedoffer = await addOffer(newoffer);

    delete savedoffer.__v
    delete savedoffer.created_on

    //notification module
    if (process.env.NOTIFICATION_STATUS) {
        const sendNotification = require("../../firebase_notification")
        let message = offer.title + " is uploaded. Offer is valid upto " + moment(offer.valid_upto).format("YYYY/MM/DD");
        let notificationResponse = await sendNotification({ title: "New Offer Arrived", message: message }, "Distributor")
    }
    return savedoffer;
}

//get offers
exports.getOffer = async(offerprops) => {
    let filter = {}
    // if (offerprops.id) filter._id = offerprops.id;
    // if(offerprops.rep_id) filter.rep_id = offerprops.rep_id;
    let offerRecords = await getOffer(filter);


    if (offerRecords.length == 1 && offerprops.id) {
        let reps = offerRecords[0].reps ? (offerRecords[0].reps).map(it=>{
            return {
                id: it._id,
                name: it.name
            }
        })  : [];
        return {
            id: offerRecords[0]._id,
            title: offerRecords[0].title,
            description: offerRecords[0].description,
            image: offerRecords[0].image ? `${process.env.BASE_URL}/${ offerRecords[0].image}` : `${process.env.BASE_URL}/assets/images/offer.png`,
            reps: reps,
            created_on: moment(offerRecords[0].created_on).format("YYYY/MM/DD"),
            valid_upto: moment(offerRecords[0].valid_upto).format("YYYY/MM/DD")
        }
    } else {
        offerRecords = offerRecords.map(it => {
            let reps = it.reps ? (it.reps).map(iit=>{
                return {
                    id: iit._id,
                    name: iit.name
                }
            })  : [];
            return {
                id: it._id,
                title: it.title,
                description: it.description,
                reps: reps,
                image: (it.image) ? `${process.env.BASE_URL}/${it.image}` : `${process.env.BASE_URL}/assets/images/offer.png`,
                created_on: moment(it.created_on).format("YYYY/MM/DD"),
                valid_upto: moment(it.valid_upto).format("YYYY/MM/DD")
            }
        })
    }


    return offerRecords;
}

//count offers
exports.countOffer = async(props) => {

    let filter = {};

    // if(props.rep_id) filter.rep_id = props.rep_id;

    let offerCount = await countOffer(filter);

    return { count: offerCount };
}



//update offer
exports.updateOffer = async(offerImage, offerprops) => {
        let offerId = offerprops.id;
        if(offerprops.reps){
            offerprops.reps = (offerprops.reps).split(",");
        }
        if (!offerprops.id) throw new Error("Please provide Offer Id");
        let filter = {}
        if (offerprops.title) filter.title = offerprops.title;
        if (offerprops.description) filter.description = offerprops.description;
        if (offerprops.valid_upto) filter.valid_upto = offerprops.valid_upto;
        if (offerImage) filter.image = offerImage.path;
        if(offerprops.reps)
        if (Array.isArray(offerprops.reps)) filter.reps = offerprops.reps
        let OfferRecords = await updateOffer(offerId, filter);

        return OfferRecords;
    }
    //delete offer
exports.deleteOffer = async(offerId) => {
    if (!offerId) throw new Error("Please provide Offer Id");

    let Response = await deleteOffer(offerId);
    return Response;
}