const express = require("express");
const router = express.Router();
const PlaylistController = require('../controller/PlaylistController');
const { playlistUpload } = require("../middleware/upload");



router.post('/create', playlistUpload, PlaylistController.createPlaylist)
router.put('/update/:id', playlistUpload, PlaylistController.updatePlaylist)
router.get('/get-details/:id', PlaylistController.getDetailsPlaylist)
router.delete('/delete/:id', PlaylistController.deletePlaylist)
router.get('/get-all', PlaylistController.getAllPlaylist)

module.exports = router