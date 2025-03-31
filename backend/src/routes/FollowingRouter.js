const express = require("express");
const router = express.Router();
const FollowingController = require('../controller/FollowingController')

router.post('/create', FollowingController.createFollowing)
router.put('/update/:id', FollowingController.updateFollowing)
router.get('/get-details/:id', FollowingController.getDetailsFollowing)
router.delete('/delete/:id', FollowingController.deleteFollowing)
router.get('/get-all', FollowingController.getAllFollowing)

module.exports = router