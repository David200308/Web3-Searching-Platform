const express = require("express");
const controllers = require("../controllers/get");
const router = express.Router();

// Router for get information from the Ethereum
router.route("/:apiKey/eth/ens/:address").get(controllers.getENSAddress);
router.route("/:apiKey/eth/balance/:address").get(controllers.getBalance);
router.route("/:apiKey/eth/txhash/:transactionHash").get(controllers.getTransactionFromHash);
router.route("/:apiKey/eth/block/:blockNumber").get(controllers.getTransactionsFromBlock);
router.route("/:apiKey/eth/historyFrom/:address").get(controllers.getTransactionsHistoryOfFromAddress);
router.route("/:apiKey/eth/historyTo/:address").get(controllers.getTransactionsHistoryOfToAddress);

// Router for get the api information & delete the apikey from the database
router.route("/generateAPIKey/:email").get(controllers.generateAPIKey);
router.route("/deleteAPIKey/:apiKey").get(controllers.deleteAPIKey);

module.exports = router;