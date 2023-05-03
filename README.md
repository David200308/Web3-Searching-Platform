# Web3 Searching Platform

### The website to search the Web3 Account Information. (Builder: Guanlin Jiang)

![web3_search_website](./img/web3_search_website.png)

## Language & Framework

- React.js (Frontend)
- Node.js (Backend API)
- Ethers.js (Connect to Web3)
- MySQL (Database)

## Depoly Usage

- Frontend

```bash
$ cd frontend
$ npm install
$ vim /src/pages/config.json (input the API_Key & save it)
$ npm start
```

- Backend

```bash
$ cd backend
$ npm install
$ vim /src/controllers/.env (input the API_Key & save it)
$ node /src/index.js (the defult port is 8000 run on localhost)
# Reminder: If want command in the background, write the linux .service file and start it!
```

## Contents & Functions

- Frontend (React.js)
  - Search (Searching by Address & ENS)
  - Result
  - Update
  - About
  - API (For generate API Key & delete API Key)
- Backend API (Node.js)
  - Functions & Usages
    - Resolve address by ENS ([Ethereum Name Service](https://ens.domains/))
    - Get ETH Balance by address
    - Get the Transaction Information by Transaction Hash
    - Get the Transactions by Block Number
    - Get the Transactions History of From Address
    - Get the Transactions History of To Address
    - Generate API Key by Email
    - Delete API Key

## Published Web3 Searching API

- Usage
  - ENS Resolve API - https://web3.skyproton.org/api/your_api_key/eth/ens/ens_domain_name
    - Ex: https://web3.skyproton.org/api/000...0000/eth/ens/ethereum.eth
  - ETH Balance Search API -  https://web3.skyproton.org/api/your_api_key/eth/ens/ens_domain_name_or_ethereum_address
    - Ex: https://web3.skyproton.org/api/000...0000/eth/balance/0x1eFb4e9395c1295d3102AC445d48A969B8Ac4D17
  - Transaction Information by Transaction Hash -  https://web3.skyproton.org/api/your_api_key/eth/txhash/the_hash_your_want_to_searching
    - Ex: https://web3.skyproton.org/api/000...0000/eth/txhash/0x552e5eaefb3ff50e350689ed7d6f571b8da2e37c04f8e5fa3ad31e67f056fdea
  - Transactions from Block -  https://web3.skyproton.org/api/your_api_key/eth/block/the_block_number_your_want_to_searching
    - Ex: https://web3.skyproton.org/api/000...0000/eth/block/11111
  - Get the Transactions History of From Address -  https://web3.skyproton.org/api/your_api_key/eth/historyFrom/ens_domain_name_or_ethereum_address
    - Ex: https://web3.skyproton.org/api/000...0000/eth/historyFrom/0x1eFb4e9395c1295d3102AC445d48A969B8Ac4D17
  - Get the Transactions History of To Address -  https://web3.skyproton.org/api/your_api_key/eth/historyTo/ens_domain_name_or_ethereum_address
    - Ex: https://web3.skyproton.org/api/000...0000/eth/historyTo/0x1eFb4e9395c1295d3102AC445d48A969B8Ac4D17
- Chain Supported
  - Ethereum
    - Mainnet

!!! Web3 Searching Platform is still in progress !!! - by Guanlin Jiang (David)
