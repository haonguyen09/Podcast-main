const express = require("express");
const router = express.Router();
const LikeController = require('../controller/LikeController')

router.post('/create', LikeController.createLike)
router.put('/update/:id', LikeController.updateLike)
router.get('/get-details/:id', LikeController.getDetailsLike)
router.delete('/delete/:id', LikeController.deleteLike)
router.get('/get-all', LikeController.getAllLike)

module.exports = router