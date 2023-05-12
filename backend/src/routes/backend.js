const express = require("express");
const controllers = require("../controllers/get");
const router = express.Router();

// Router for get information from the Ethereum
router.route("/eth/ens/:address").get(controllers.getENSAddress);
router.route("/eth/balance/:address").get(controllers.getBalance);
router.route("/eth/txhash/:transactionHash").get(controllers.getTransactionFromHash);
router.route("/eth/block/:blockNumber").get(controllers.getTransactionsFromBlock);
router.route("/eth/historyFrom/:address").get(controllers.getTransactionsHistoryOfFromAddress);
router.route("/eth/historyTo/:address").get(controllers.getTransactionsHistoryOfToAddress);

// Router for get the api information & delete the apikey from the database
router.route("/generateAPIKey/:email").get(controllers.generateAPIKey);
router.route("/deleteAPIKey/:apiKey").get(controllers.deleteAPIKey);

module.exports = router;