const ethers = require("ethers");

const provider = new ethers.providers.InfuraProvider("mainnet", process.env.Infura_API_KEY);

exports.getENSAddress = async (req, res, next) => {
    var accountAddress = await provider.resolveName(req.params.address);
    res.status(200).json({
        status: "success",
        address: accountAddress
    });
};

exports.getBalance = async (req, res, next) => {
    var balance = await provider.getBalance(req.params.address);
    balance = ethers.utils.formatEther(balance);
    res.status(200).json({
        status: "success",
        balance: balance
    });
};

