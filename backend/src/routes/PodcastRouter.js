const express = require("express");
const router = express.Router();
const PodcastController = require('../controller/PodcastController');
const { podcastUpload } = require("../middleware/upload");


router.post('/create', podcastUpload, PodcastController.createPodcast)
router.put('/update/:id', podcastUpload, PodcastController.updatePodcast)
router.get('/get-details/:id', PodcastController.getDetailsPodcast)
router.delete('/delete/:id', PodcastController.deletePodcast)
router.get('/get-all', PodcastController.getAllPodcast)

module.exports = router