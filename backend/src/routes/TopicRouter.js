const express = require("express");
const router = express.Router();
const TopicController = require('../controller/TopicController');
const { topicUpload } = require("../middleware/upload");



router.post('/create', topicUpload, TopicController.createTopic)
router.put('/update/:id', topicUpload, TopicController.updateTopic)
router.get('/get-details/:id', TopicController.getDetailsTopic)
router.delete('/delete/:id', TopicController.deleteTopic)
router.get('/get-all', TopicController.getAllTopic)

module.exports = router