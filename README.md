# Web3 Searching Platform

### The website to search the Web3 Account Information. (Builder: Guanlin Jiang)

![web3_search_website](./img/web3_search_website.png)

## Language & Framework

- React.js
- Node.js

## Depoly Usage

- Frontend

```bash
$ cd frontend
$ npm install
$ npm start
```

- Backend

```bash
$ cd backend
$ npm install
$ vim /src/controllers/.env (input the API_Key from Infura & save it)
$ node /src/index.js (the defult port is 8000 run on localhost)
# Reminder: If want command in the background, write the linux .service file and start it!
```

## Content

- Frontend (React.js)
  - Search (Searching by Address & ENS)
  - Result
  - Update
  - About 
  - Connection (Connect to Web3 by Metamask)
- Backend API (Node.js) 
  - Functions & Usage
    - Resolve address by ENS ([Ethereum Name Service](https://ens.domains/))
      - Ex: http://127.0.0.1:8000/api/ens/ethereum.eth
    - Get ETH Balance by address
      - Ex: http://127.0.0.1:8000/api/balance/0x1eFb4e9395c1295d3102AC445d48A969B8Ac4D17

## Published Web3 Searching API

- Usage
  - ENS Resolve API - https://web3.skyproton.org/api/ens/ens_domain_name
    - Ex: https://web3.skyproton.org/api/ens/ethereum.eth
  - ENS Balance Search API -  https://web3.skyproton.org/api/ens/ens_domain_name_or_ethereum_address
    - Ex: https://web3.skyproton.org/api/balance/0x1eFb4e9395c1295d3102AC445d48A969B8Ac4D17
- Chain Supported
  - Ethereum
    - Mainnet



!!! Web3 Searching Platform is still in progress !!! - by Guanlin Jiang (David)

