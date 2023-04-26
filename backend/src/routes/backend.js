const express = require("express");
const controllers = require("../controllers/get");
const router = express.Router();

router.route("/ens/:address").get(controllers.getENSAddress);
router.route("/balance/:address").get(controllers.getBalance);


module.exports = router;