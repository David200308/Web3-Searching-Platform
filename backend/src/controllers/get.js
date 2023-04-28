const ethers = require("ethers");
const db = require("../database/db");
const hat = require("hat");
const provider = new ethers.providers.InfuraProvider("mainnet", process.env.Infura_API_KEY);

exports.getENSAddress = async (req, res, next) => {
    if (req.params.apiKey == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }

    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [req.params.apiKey], async function (err, result) {
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
    if (req.params.apiKey == "null") {
        res.status(401).json({
            status: "failed",
            message: "Invalid API Key"
        });
    }
    
    var sql = "SELECT * FROM APIDB WHERE apiToken = ?";
    db.query(sql, [req.params.apiKey], async function (err, result) {
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

exports.generateAPIKey = async (req, res, next) => {
    var rack = hat.rack();
    var apiKey = rack();

    var sql = "INSERT INTO APIDB (userEmail, apiToken) VALUES (?, ?)";
    db.query(sql, [req.params.email, apiKey], function (err, result) {
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
    db.query(sql, [req.params.apiKey], function (err, result) {
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
