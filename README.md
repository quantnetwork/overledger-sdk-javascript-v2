# Overledger JavaScript SDK V2

Welcome to the developer's guide to use the Overledger SDK written in Javascript by Quant Network.

## Introduction to the Overledger SDK

Overledger is a REST API that allows applications to connect to multiple distributed ledger technologies (DLTs) or blockchains through the use of a standardised interface. The Overledger SDK enables developers to create signed transactions and send them to the supported DLTs.

## Technologies

The Overledger SDK is a collection of node packages written in Typescript. Currently, the supported DLTs are Bitcoin, Ethereum and Ripple.

## Prerequisites

- nodejs 10
- yarn
- lerna

## Installation

Currently, v2 of the Overledger SDK is not published on NPM or Yarn. Thus, we have to build it on our machine before using it in our own projects.

The Overledger SDK can be installed as a node module. If all supported DLTs are necessary, 
the overledger-bundle package can be installed, which will include all required dependencies.

#### Building

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To build the SDK, first we need to globally install the lerna dependency:

```
npm install -g lerna@3.22.0
```

To build the project, first download the yarn package manager:

```
npm install -g yarn
```

Then, we can run run:

```
yarn run build
```

>Note: For Windows users, please use git bash as the build currently uses UNIX-based commands. You will also need to make sure you have 'make' installed for windows. This is done by running powershell first as Administrator and then installing make with chocolatey: ```choco install make```

This will build and link the packages together.
To test if the package built correctly, you can run

```
yarn run test
```

#### Installing

After building, you can install it in your own project. Until this version is published, you will need to point to your locally built version.

```
npm install /this/is/an/example/path/overledger-sdk-javascript-v2
```

## Getting started

To get started, you can take a look at the examples folder for common use cases. There is a README file with detailed instructions in the signing example.

## API Reference

The SDK packages provide functions for interacting with the Overledger BPI Gateway as well as support for offline account generation and transaction signing.
The functions which interact with the Overledger BPI (send, get) return a promise with a standard Axios response which includes the BPI data in the `data` field.

Please check the examples folder for details on how to sign and send transactions, as well as do account queries. The api reference page can be found [here](api_reference.md).

## Development

If updating the SDK, please follow this short development guide.

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To develop the SDK, first install lerna:

```
npm install -g lerna
```

To build the project, download the yarn package manager and run:

```
yarn run build
```

This will build and link the packages together.

### Linting

Make sure to also lint the code base after your updates.

```
yarn run lint
```

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


