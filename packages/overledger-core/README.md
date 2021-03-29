[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-core

Core [Overledger SDK][repo] package.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-core
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-core
```

## API Reference

<a name="module_overledger-core"></a>

## overledger-core

* [overledger-core](#module_overledger-core)

    * [.OverledgerSDK](#module_overledger-core.OverledgerSDK)
    In OverledgerSDK, we are using secure-env for loading up values for environment variables. Please ensure you have secure-env installed.
    Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
    For example: USER_NAME=MYUSER
    
    Once created, run secure-env .env -s myPassword
    A new encrypted file .env.enc will be created in your project root directory. You can delete the .env file after this to prevent stealing. 

    * [.default](#module_overledger-core.default)


<a name="module_overledger-core.OverledgerSDK"></a>

### *overledger-core*.OverledgerSDK
**

<a name="module_overledger-core.default"></a>

### *overledger-core*.default
Core Overledger SDK class. Individual dlt packages must be installed manually.


