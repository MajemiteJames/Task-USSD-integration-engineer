
const express = require("express");
const router = express.Router();
const sms = require("../controllers/smsController");


router.route("/").get(sms);

module.exports = router;