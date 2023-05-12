const { Alchemy, Network} = require("alchemy-sdk");
const ethers = require("ethers");
const db = require("../database/db");
const hat = require("hat");
const { createHash } = require('crypto');
const provider = new ethers.providers.InfuraProvider("mainnet", process.env.Infura_API_KEY);

const config = {
    apiKey: process.env.alchemy_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

exports.getENSAddress = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }

    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            var accountAddress = await provider.resolveName(req.params.address);
            res.status(200).json({
                status: "success",
                address: accountAddress
            });
        }
    });
};

exports.getBalance = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            var balance = await provider.getBalance(req.params.address);
            balance = ethers.utils.formatEther(balance);
            res.status(200).json({
                status: "success",
                balance: balance
            });
        }
    });
    
};

exports.getTransactionFromHash = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            const txReceipt = await provider.getTransaction(req.params.transactionHash);
            res.status(200).json({
                status: "success",
                tx: txReceipt
            });
        }
    });
    
};

exports.getTransactionsFromBlock = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            const blockInformation = await provider.getBlock(parseInt(req.params.blockNumber));
            
            res.status(200).json({
                status: "success",
                txs: blockInformation
            });
        }
    });  
};

exports.getTransactionsHistoryOfFromAddress = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            const data = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: req.params.address,
                category: ["external", "internal", "erc20", "erc721", "erc1155"],
            });
            
            // console.log(data);
            
            res.status(200).json({
                status: "success",
                historyOfFromAddress: data
            });
        }
    });  
};

exports.getTransactionsHistoryOfToAddress = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (hash(apiKey) == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(apiKey)], async function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(401).json({
                status: "failed",
                message: "Invalid API Key"
            });
        } else {
            const data = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                toAddress: req.params.address,
                category: ["external", "internal", "erc20", "erc721", "erc1155"],
            });
            
            // console.log(data);
            
            res.status(200).json({
                status: "success",
                historyOfToAddress: data
            });
        }
    });  
};

exports.generateAPIKey = async (req, res, next) => {
    var rack = hat.rack();
    var apiKey = rack();

    var sql = "INSERT INTO APIDB (userEmail, apiToken) VALUES (?, ?)";
    db.query(sql, [req.params.email, hash(apiKey)], function (err, result) {
        if (err) throw err;
        console.log("apikey inserted");
    });
    res.status(200).json({
        status: "success",
        APIKEY: apiKey
    });
};

exports.deleteAPIKey = async (req, res, next) => {
    var sql = "DELETE FROM APIDB WHERE apiToken = ?";
    db.query(sql, [hash(req.params.apiKey)], function (err, result) {
        if (err) {
            res.status(401).json({
                status: "failed",
                apiKeyStatus: "Invalid API Key"
            });
        };

        console.log("apikey delete");
        res.status(200).json({
            status: "success",
            apiKeyStatus: "deleted"
        });
    });
};
