const express = require("express");
const router = express.Router();
const FollowerController = require('../controller/FollowerController')

router.post('/create', FollowerController.createFollower)
router.put('/update/:id', FollowerController.updateFollower)
router.get('/get-details/:id', FollowerController.getDetailsFollower)
router.delete('/delete/:id', FollowerController.deleteFollower)
router.get('/get-all', FollowerController.getAllFollower)

module.exports = router