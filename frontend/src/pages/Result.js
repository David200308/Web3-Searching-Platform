const Result = () => {
    var balance = localStorage.getItem("balance");
    var account = localStorage.getItem("account");
    if (localStorage.getItem("ens") != null) {
        var ens = localStorage.getItem("ens");
    }
    localStorage.removeItem("balance");
    localStorage.removeItem("account");
    localStorage.removeItem("ens");
    if (balance == null) {
        balance = 0;
    }
    if (ens != null) {
        return (
            <div>
                <center>
                    <h1>Information</h1>
                    <h2>Account: {account}</h2>
                    <h2>ENS: {ens}</h2>
                    <h2>Balance: {balance} ETH</h2>
                </center>
            </div>
        );
    } else {
        return (
            <div>
                <center>
                    <h1>Information</h1>
                    <h2>Account: {account}</h2>
                    <h2>Balance: {balance} ETH</h2>
                </center>
            </div>
        );
    }
}

export default Result;