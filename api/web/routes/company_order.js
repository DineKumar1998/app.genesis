const router = require('express').Router()
const orderHandler = require('../handlers/company_order');
const check_auth = require("../../../core/middleware/check-auth-admin");


router.post('/add',check_auth, orderHandler.addOrder)

router.post('/get',check_auth, orderHandler.getOrder)

router.post('/count',check_auth, orderHandler.countOrder)

router.delete('/:Id',check_auth, orderHandler.deleteOrder)

module.exports = router