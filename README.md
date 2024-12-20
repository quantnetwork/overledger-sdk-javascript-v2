> ❗**IMPORTANT**❗
>
> This repository, including the SDK within it, has been archived and will no longer be maintained.
>
> For transaction signing using Overledger, you can use the Authorise and/or Overwallet services, as described in Quant’s Developer Hub pages, beginning [here](https://www.overledger.dev/).
>
> ❗**IMPORTANT**❗

# Overledger JavaScript SDK V2

Welcome to the developer's guide to use the Overledger SDK written in Javascript by Quant Network.

## Introduction to the Overledger SDK

Overledger is a REST API that allows applications to connect to multiple distributed ledger technologies (DLTs) or blockchains through the use of a standardised interface. 

The Overledger SDK enables developers to create blockchain accounts, create signed transactions and refresh Overledger access tokens.

## Technologies

The Overledger SDK is a collection of node packages written in Typescript. Currently, the supported DLTs are Bitcoin, Substrate, Ethereum and the XRP Ledger.

## Prerequisites

- nodejs v14 >= 14.18.0, or v16 >= 16.13.0
- yarn
- lerna

## Installation

The Overledger SDK can be installed as node modules. 

If all supported Distributed Ledger Technologies (DLTs) are necessary, the bundle package can be installed, which will include all the required dependencies.

```
npm install @quantnetwork/overledger-bundle
```


Alternatively, the suite of node packages allows developers to chose which DLTs they would like to utilise by installing the core overledger package and the individual DLT packages. For example, if you only want to use the Ethereum blockchain, you will need only the overledger-core and overledger-ethereum packages, which you can install via:

```
npm install @quantnetwork/overledger-core
npm install @quantnetwork/overledger-dlt-ethereum
```

## Getting started

To get started, you can take a look at the examples folder for basic use cases.

Alternatively, you can investigate the exercises used in Quant's Beginner's Guide to Blockchain course [here](https://github.com/quantnetwork/blockchain-developer-exercises-foundations).

Finally, you can also explore our Overledger demo application github [here](https://github.com/quantnetwork/quant-demo-application).

## API Reference

The SDK packages provide functions for interacting with some of the Overledger API Gateway as well as support for offline account generation and transaction signing.
The functions which interact with the Overledger API (get, post) return a promise with a standard Axios response which includes the API response data in the `data` field.

The full Overledger API Swagger docs can be found [here](https://docs.overledger.io/).

## Development (if you plan to update the SDK itself)

If updating the SDK, please follow this short development guide. Note that when you perform any modification on this SDK, you will need to re-lint, re-test and re-document before merging your code. Your pull request will fail if there is any issue with these three components.

### Building

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To build the SDK, first we need to globally install the lerna dependency:

```
npm install -g lerna@6.6.1
```

To build the project, first download the yarn package manager:

```
npm install -g yarn
```


> Note: For Windows users, please use git bash as the build currently uses UNIX-based commands. Furthermore, depending on your NodeJS installation, you might not be able to use any npm dependencies before you add nodejs and npm to your Environment Variables Path. For example, adding to Path: `C:\Program Files\nodejs` and `C:\Users\your-username\AppData\Roaming\npm`. You will also need to make sure you have 'make' installed for Windows. This is done by running git bash as administrator and installing make with chocolatey: `choco install make`


Then, we can run build:

```
yarn run build
```

This will build and link the packages together.

### Running tests

**Note: to run all the tests locally, you will need to have an available completed (and unencrypted) env file. What should go in the env is discussed [here](./examples/README.md).**

Make your changes and then from the root directory:

```
yarn test
```

To run tests on a specific package, change directories to that specific package and run the test command there.

### Linting

Make sure to also lint the code base after your updates.

```
yarn run lint
```

### Documentation

Please update the documentation after your changes by editing the JSDoc annotations inside the source files and then run the following command from the root directory:

```
yarn run docs
```

### License

The Apache 2.0 license can be found [here](LICENSE).


