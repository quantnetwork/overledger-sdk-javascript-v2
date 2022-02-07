# Examples

## Setup

First, we need to create a file called '.env' in the root directory of the project and paste in the required variables that you will be securing:

### Getting test tokens and accounts

For Bitcoin and Ethereum, you will have to use the example script from this folder: /examples/create-account

Then, to fund your addresses, you will have to use the publicly available faucets:
- Ethereum: https://faucet.ropsten.be/
- Bitcoin: https://bitcoinfaucet.uo1.net/ - please note Bitcoin faucets change frequently, if this one is down, simply do a web search for "bitcoin testnet faucet" to get to the latest working one.

For the XRP Ledger accounts, the developers behind the technology have been kind enough to fully support a testnet with account creation and automatic funding at:
- XRP Ledger: https://xrpl.org/xrp-testnet-faucet.html

Once you have funded your desired accounts, feel free to proceed to the next step.

### Setting the environment variables

`/.env`
```
USER_NAME=your-overledger-devportal-email-address-here
PASSWORD=your-overledger-devportal-password-here
CLIENT_ID=your-overledger-devportal-application-client-id-here
CLIENT_SECRET=your-overledger-devportal-application-client-secret-here

PARTY_A_BITCOIN_ADDRESS=your-bitcoin-address-here
PARTY_A_ETHEREUM_ADDRESS=your-ethereum-address-here
PARTY_A_XRP_LEDGER_ADDRESS=your-xrp-ledger-address-here

PARTY_A_BITCOIN_PRIVATE_KEY=your-bitcoin-private-key-here
PARTY_A_ETHEREUM_PRIVATE_KEY=your-ethereum-private-key-here
PARTY_A_XRP_LEDGER_PRIVATE_KEY=your-xrp-ledger-private-key-here

PARTY_A_BITCOIN_FUNDING_TX=your-bitcoin-address-funding-transaction-here
```

Once you have created this file, you will need to secure it by using "secure-env". To do so, you should install this program via:

```
npm install -g secure-env
```

After it is installed, we can run the following command from the root folder of the project.

```
secure-env .env -s password
```

Make sure you change the password here as well as in any examples you would like to run.

## Running

Each example contains detailed comments about various bits that need to be adjusted. To run an example, simply call the js file from the root folder of the project.
E.g:
```
node examples/signing/ethereum-signing.js
```

This should produce an output which you can send to the Overledger API.