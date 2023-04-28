const express = require("express");
const controllers = require("../controllers/get");
const router = express.Router();

router.route("/:apiKey/eth/ens/:address").get(controllers.getENSAddress);
router.route("/:apiKey/eth/balance/:address").get(controllers.getBalance);
router.route("/generateAPIKey/:email").get(controllers.generateAPIKey);
router.route("/deleteAPIKey/:apiKey").get(controllers.deleteAPIKey);

module.exports = router;