const express = require("express");
const router = express.Router();
const SuggestFollowController = require('../controller/SuggestFollowController')

router.post('/create', SuggestFollowController.createSuggestFollow)
router.put('/update/:id', SuggestFollowController.updateSuggestFollow)
router.get('/get-details/:id', SuggestFollowController.getDetailsSuggestFollow)
router.delete('/delete/:id', SuggestFollowController.deleteSuggestFollow)
router.get('/get-all', SuggestFollowController.getAllSuggestFollow)

module.exports = router