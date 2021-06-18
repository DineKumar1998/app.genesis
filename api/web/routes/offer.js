const router = require('express').Router()
const offerHandler = require('../handlers/offer')
let multer = require('multer');
const check_auth = require("../../../core/middleware/check-auth-admin");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './core/uploads/offers')
    },
    filename: function (req, file, cb) {
      let tmp = file.originalname.split("."); 
      let fileExtension = tmp[tmp.length - 1];
      let fileName = "";
      for(let i=0 ; i<(tmp.length-1);i++){
        fileName = fileName+tmp[i];
      } 
      cb(null,(((fileName).replace(/ /g,'_').toLowerCase())+"_"+((new Date()).getTime())+"."+fileExtension))
    }
  })
  
let upload = multer({ storage: storage })


router.post('/add', check_auth, upload.single('image'), offerHandler.addOffer)

router.post('/get', check_auth, offerHandler.getOffer)

router.get('/count', check_auth, offerHandler.countOffer);

router.post('/update', check_auth, upload.single('image'), offerHandler.updateOffer)

router.get('/delete/:Id', check_auth, offerHandler.deleteOffer)

module.exports = router