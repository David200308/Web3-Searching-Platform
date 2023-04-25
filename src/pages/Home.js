import '../App.css';
import {useState} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.API_KEY
const ethers = require("ethers");

function Home() {
  const provider = new ethers.providers.InfuraProvider("mainnet", process.env.Infura_API_KEY);

  const navigate = useNavigate();
  const [searchInput, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted ✅');
    Searching();
  };

  const Searching = () => {
    
    searchingByAddress(searchInput);
  };
  
  async function searchingByAddress(address) {
    if (address.includes(".eth")) {
      localStorage.setItem('ens', address);
      address = await provider.resolveName(address);
    }
    localStorage.setItem('account', address);

    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('balance', data.result * 0.000000000000000001);
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
            placeholder=" Search by Address & ENS" 
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
