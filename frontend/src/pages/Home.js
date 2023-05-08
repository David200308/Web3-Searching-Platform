import '../App.css';
import {useState} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
const config = require('./config.json');

var web3 = new Web3(config.web3_url);

var apiKey = config.apiKey;

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted ✅');
    Searching();
  };

  const Searching = async() => {
    const currentBlock = await web3.eth.getBlockNumber();
    if (searchInput.includes(".eth") || Web3.utils.isAddress(searchInput)) {
      // console.log("Searching by address");
      searchingByAddress(searchInput);
    } else if (0 <= searchInput && searchInput <= currentBlock) {
      // console.log(currentBlock);
      // console.log("Searching by block");
      searchingByBlock(searchInput);
    } else if (Web3.utils.isAddress(searchInput) !== true) {
      // console.log("Searching by txhash");
      searchingByTXHash(searchInput);
    };
    
  };
  
  async function searchingByAddress(address) {
    if (address.includes(".eth")) {
      localStorage.setItem('ens', address);
      
      const url = `https://web3.skyproton.org/api/${apiKey}/eth/ens/${address}`;
      // const url = `http://127.0.0.1:8000/api/${apiKey}/eth/ens/${address}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('account', data.address);
        }
      );
    }
    localStorage.setItem('account', address);

    const url = `https://web3.skyproton.org/api/${apiKey}/eth/balance/${address}`;
    // const url = `http://127.0.0.1:8000/api/${apiKey}/eth/balance/${address}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('balance', data.balance);
        navigate('/result');
      }
    );
  }

  async function searchingByTXHash(txhash) {
    const url = `https://web3.skyproton.org/api/${apiKey}/eth/txhash/${txhash}`;
    // const url = `http://127.0.0.1:8000/api/${apiKey}/eth/txhash/${txhash}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('txhash_hash', data.tx.hash);
        localStorage.setItem('txhash_blockNumber', data.tx.blockNumber);
        localStorage.setItem('txhash_blockHash', data.tx.blockHash);
        localStorage.setItem('txhash_confirmations', data.tx.confirmations);
        localStorage.setItem('txhash_from', data.tx.from);
        localStorage.setItem('txhash_to', data.tx.to);
        localStorage.setItem('txhash_value', parseInt(data.tx.value.hex, 16) / 100000000000000000);
        localStorage.setItem('txhash_nonce', data.tx.nonce);
        localStorage.setItem('txhash_data', data.tx.data);

        navigate('/result');
      }
    );
  }

  async function searchingByBlock(blockNumber) {
    const url = `https://web3.skyproton.org/api/${apiKey}/eth/block/${blockNumber}`;
    // const url = `http://127.0.0.1:8000/api/${apiKey}/eth/block/${blockNumber}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('txblock_blockNumber', data.txs.number);
        localStorage.setItem('txblock_blockHash', data.txs.hash);
        localStorage.setItem('txblock_parentHash', data.txs.parentHash);
        localStorage.setItem('txblock_timestamp', data.txs.timestamp);
        localStorage.setItem('txblock_difficulty', data.txs.difficulty);
        localStorage.setItem('txblock_transactions', data.txs.transactions);
        // localStorage.setItem('txblock_value', parseInt(data.txs.value.hex, 16) / 100000000000000000);
        // localStorage.setItem('txblock_nonce', data.txs.nonce);
        // localStorage.setItem('txblock_data', data.txs.data);
        navigate('/result');
      }
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 Searching</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            class="sreachBar"
            id="search"
            name="search"
            value={searchInput}
            placeholder=" Search by Address / ENS / TX Hash / Block" 
            onChange={event => setSearch(event.target.value)}
            autoComplete="off"
          />
        </form>
      </header>

      <footer>
        Copyright ® 2023 - Guanlin Jiang
        <br></br>
        <br></br>
        <br></br>
      </footer>
    </div>
  );
}

export default Home;
