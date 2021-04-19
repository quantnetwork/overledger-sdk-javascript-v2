# Overledger JavaScript SDK V2

Welcome to the developer's guide to use the Overledger SDK written in Javascript by Quant Network.

## Introduction to the Overledger SDK

Overledger is a REST API that allows applications to connect to multiple distributed ledger technologies (DLTs) or blockchains through the use of a consistent interface. The Overledger SDK enables developers to create signed transactions and send them to the supported DLTs.

## Technologies

The Overledger SDK is a collection of node packages written in Typescript. Currently, the supported DLTs are Bitcoin, Ethereum and Ripple.

## Prerequisites

- nodejs 10
- yarn
- lerna

## Installation

The Overledger SDK can be installed as a node module. If all supported DLTs are necessary, 
the overledger-bundle package can be installed, which will include all required dependencies.

#### Building

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To build the SDK, first we need to install the lerna dependency:

```
npm install -g lerna@3.22.0
```

To build the project, download the yarn package manager and run:

```
yarn run build
```

This will build and link the packages together.
To test if the package built correctly, you can run

```
yarn run test
```

#### Installing

After building, you can install it in your own project. Make sure to specify the version if you'd like to use this version of the SDK vs the public one from NPM.

```
npm install @quantnetwork/overledger-bundle@2.0.0
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-bundle@2.0.0
```

Alternatively, the suite of packages allows developers to chose which blockchains/DLTs they would like to utilise by installing the core package and the individual DLT packages. Such as if you only want to install overledger-core and overledger-ethereum you would enter:

```
npm install @quantnetwork/overledger-core@2.0.0
npm install @quantnetwork/overledger-dlt-ethereum@2.0.0
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-core
yarn add @quantnetwork/overledger-dlt-ethereum
```



## Getting started

To get started, you can take a look at the examples folder for common use cases. If you would like to run those exact examples, you will first need to install a couple development tools for the environment encryption dependencies.

```
npm install secure-env
npm install node-keytool
npm install jks-js
```

## API Reference

The SDK packages provide functions for interacting with the Overledger BPI Gateway as well as support for offline account generation and transaction signing.
The functions which interact with the Overledger BPI (send, get) return a promise with a standard Axios response which includes the BPI data in the `data` field.

Please check the examples folder for details on how to sign and send transactions, as well as do account queries. The api reference page can be found [here](api_reference.md).

## Development

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To develop the SDK, first install lerna:

```
npm install -g lerna
```

To build the project, download the yarn package manager and run:

```
yarn run build
```

This will build and link the packages together.

### Running tests

Make your changes and then from the root directory:

```
yarn test
```

To run tests on a specific package, change directories to that specific package and run the test command there.

### Documentation

Please update the documentation after your changes by editing the JSDoc annotations inside the source files and then run the following command from the root directory:

```
yarn run docs
```

### License

The Apache 2.0 license can be found [here](LICENSE).


