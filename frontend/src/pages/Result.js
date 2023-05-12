const Result = () => {
    var balance = localStorage.getItem("balance");
    var account = localStorage.getItem("account");

    var txhash_hash = localStorage.getItem('txhash_hash');
    var txhash_blockNumber = localStorage.getItem('txhash_blockNumber');
    var txhash_blockHash = localStorage.getItem('txhash_blockHash');
    var txhash_confirmations = localStorage.getItem('txhash_confirmations');
    var txhash_from = localStorage.getItem('txhash_from');
    var txhash_to = localStorage.getItem('txhash_to');
    var txhash_value = localStorage.getItem('txhash_value');
    var txhash_nonce = localStorage.getItem('txhash_nonce');
    var txhash_data = localStorage.getItem('txhash_data');

    var txblock_blockNumber = localStorage.getItem('txblock_blockNumber');
    var txblock_blockHash = localStorage.getItem('txblock_blockHash');
    var txblock_parentHash = localStorage.getItem('txblock_parentHash');
    var txblock_timestamp = localStorage.getItem('txblock_timestamp');
    var txblock_difficulty = localStorage.getItem('txblock_difficulty');
    var txblock_transactions = localStorage.getItem('txblock_transactions');

    function showTransactionsInBlock() {
        const transactionsArrayInBlock = txblock_transactions.split(",");
        var str = ''
        
        if (transactionsArrayInBlock.length === 0 || transactionsArrayInBlock[0] === '') {
            str = '<br> No transactions in this block';
        } else {
            transactionsArrayInBlock.forEach(function(trans) {
            str += '<br><center>'+ trans + '</center>';
            });
        }

        document.getElementById("TransactionsByBlock").innerHTML = str;
    }
    
    if (localStorage.getItem("ens") != null) {
        var ens = localStorage.getItem("ens");
    }

    localStorage.clear();

    if (balance == null) {
        balance = 0;
    }
    if (ens != null) {
        // console.log(ens);
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
    } else if (account != null) {
        // console.log(account);
        return (
            <div>
                <center>
                    <h1>Information</h1>
                    <h2>Account: {account}</h2>
                    <h2>Balance: {balance} ETH</h2>
                </center>
            </div>
        );
    } else if (txhash_hash != null) {
        return (
            <div>
                
                <center>
                    <h1>Information</h1>
                    
                    <table border='2px solid black'>
                    <h2 align='left'>
                    <tr>
                        <th border-bottom='2px solid black'>Transaction Hash</th>
                        <th border-bottom='2px solid black'>{txhash_hash}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Block</th>
                        <th border-bottom='2px solid black'>{txhash_blockNumber}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Block Hash</th>
                        <th border-bottom='2px solid black'>{txhash_blockHash}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Confirmations</th>
                        <th border-bottom='2px solid black'>{txhash_confirmations}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>From</th>
                        <th border-bottom='2px solid black'>{txhash_from}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>To</th>
                        <th border-bottom='2px solid black'>{txhash_to}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Value</th>
                        <th border-bottom='2px solid black'>{txhash_value} ETH</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Nonce</th>
                        <th border-bottom='2px solid black'>{txhash_nonce}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Data</th>
                        <th border-bottom='2px solid black'>{txhash_data}</th>
                    </tr>
                    </h2>
                    </table>

                </center>
            </div>
        );
    } else if (txblock_blockNumber != null) {
        return (
            <div>
                <center>
                    <h1>Information</h1>

                    <table border='2px solid black'>
                    <h2 align='left'>
                    <tr>
                        <th border-bottom='2px solid black'>Block</th>
                        <th border-bottom='2px solid black'>{txblock_blockNumber}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Block Hash</th>
                        <th border-bottom='2px solid black'>{txblock_blockHash}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Block Parent Hash</th>
                        <th border-bottom='2px solid black'>{txblock_parentHash}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Timestamp</th>
                        <th border-bottom='2px solid black'>{txblock_timestamp}</th>
                    </tr>
                    <tr>
                        <th border-bottom='2px solid black'>Difficulty</th>
                        <th border-bottom='2px solid black'>{txblock_difficulty}</th>
                    </tr>
                    </h2>
                    </table>

                    <h2>
                        <h2>Transactions Hash</h2>
                        <button onClick={showTransactionsInBlock} className="showTrans">Show All</button>
                        <div id="TransactionsByBlock"></div>
                        
                    </h2>
                </center>
            </div>
        );
    } 
    
}

export default Result;