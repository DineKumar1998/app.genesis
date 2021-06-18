const router = require('express').Router()
const companyAboutHandler = require('../handlers/company_about')
let multer = require('multer');
const check_auth = require("../../../core/middleware/check-auth-admin");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './core/uploads/companyAbout')
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


router.post('/', check_auth, upload.single('about_img'), companyAboutHandler.addUpdate)

router.get('/', check_auth, companyAboutHandler.get)

module.exports = router