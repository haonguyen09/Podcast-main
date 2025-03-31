const express = require("express");
const router = express.Router();
const RateController = require('../controller/RateController')

router.post('/create', RateController.createRate)
router.put('/update/:id', RateController.updateRate)
router.get('/get-details/:id', RateController.getDetailsRate)
router.delete('/delete/:id', RateController.deleteRate)
router.get('/get-all', RateController.getAllRate)

module.exports = router