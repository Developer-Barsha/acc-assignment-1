const express = require("express");
const router = express.Router();
const userControllers = require('../controllers/user.controller.js');

router.get("/all", userControllers?.getAllUsers);
router.get('/random', userControllers?.getRandomUser);
router.post('/save', userControllers?.saveAUser);
router.patch('/update/:id', userControllers?.updateAUser);
router.patch("/bulk-update", userControllers.updateMultipleUsers);
router.delete('/delete/:id', userControllers?.deleteAUser);

module.exports = router;