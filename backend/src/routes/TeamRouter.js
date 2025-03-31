const express = require("express");
const router = express.Router();
const TeamController = require('../controller/TeamController')

router.post('/create', TeamController.createTeam)
router.put('/update/:id', TeamController.updateTeam)
router.get('/get-details/:id', TeamController.getDetailsTeam)
router.delete('/delete/:id', TeamController.deleteTeam)
router.get('/get-all', TeamController.getAllTeam)

module.exports = router