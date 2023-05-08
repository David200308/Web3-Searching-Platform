import {useState} from 'react';
import React from 'react';
import './pages.css';
import ReactDOM from 'react-dom';

const API = () => {
    const [emailInput, setEmail] = useState('');
    const [apiKeyInput, setAPIKey] = useState('');

    const handleSubmitGenerate = event => {
        event.preventDefault();
        console.log('Email Submitted ✅');
        generateAPIToken();
    };

    const handleSubmitDelete = event => {
        event.preventDefault();
        console.log('Email Submitted ✅');
        deleteAPIToken();
    };

    const generateAPIToken = () => {
        const apiTokenPart = ReactDOM.createRoot(document.getElementById('API'));
        if (emailInput === "") {
            apiTokenPart.render(<h4>Please Input Email</h4>);
        } else {
            // const url = `http://127.0.0.1:8000/api/generateAPIKey/${emailInput}`;
            const url = `https://web3.skyproton.org/api/generateAPIKey/${emailInput}`;
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    const token = data.APIKEY;
                    console.log(data.APIKEY);
                    apiTokenPart.render(
                        <h4>API Token: {token}</h4>
                    );
                    
                    const apiUsagePart = ReactDOM.createRoot(document.getElementById('usage'));
                    apiUsagePart.render(
                        <h4>ENS Resolve API: https://web3.skyproton.org/api/{token}/eth/ens/with_your_ens_name<br></br><br></br>
                        Balance Search API: https://web3.skyproton.org/api/{token}/eth/balance/with_your_address_or_ens<br></br><br></br>
                        Other API Usage: https://github.com/David200308/Web3-Searching-Platform
                        </h4>
                    );
                }
            );
        }
    }

    const deleteAPIToken = () => {
        const deletePart = ReactDOM.createRoot(document.getElementById('delete'));

        // const url = `http://127.0.0.1:8000/api/deleteAPIKey/${apiKeyInput}`;
        const url = `https://web3.skyproton.org/api/deleteAPIKey/${apiKeyInput}`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.statue === "failed") {
                    deletePart.render(
                        <h4>API Token is Invalid</h4>
                    );
                }
                deletePart.render(
                    <h4>Successful Remove this API Token</h4>
                );
            }
        );
    }

    return (
        <center>
        <h1>API</h1>
        <p>Get API Token</p>

        <form onSubmit={handleSubmitGenerate}>
          <input
            type="email"
            class="email"
            id="email"
            name="email"
            value={emailInput}
            placeholder=" Enter your Email" 
            onChange={event => setEmail(event.target.value)}
            autoComplete="off"
          />
        </form>
        <br></br><br></br>
        <div><h2 id='API'></h2></div>

        <p>API Usage </p>
        <div><h2 id='usage'></h2></div>
        <br></br>

        <p>API Delete </p>
        <form onSubmit={handleSubmitDelete}>
          <input
            type="text"
            class="apiKey"
            id="apiKey"
            name="apiKey"
            value={apiKeyInput}
            placeholder=" Enter your API Key want to delete" 
            onChange={event => setAPIKey(event.target.value)}
            autoComplete="off"
          />
        </form>
        <div><h2 id='delete'></h2></div>
        

        </center>
    )
};

  
export default API;