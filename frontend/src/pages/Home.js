import '../App.css';
import {useState} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
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
      const url = `http://127.0.0.1:8000/api/ens/${address}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('account', data.address);
        }
      );
    }
    localStorage.setItem('account', address);

    const url = `http://127.0.0.1:8000/api/balance/${address}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('balance', data.balance);
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
