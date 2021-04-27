[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-ethereum

[Overledger SDK][repo] module for interaction with the Ethereum distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-ethereum
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-ethereum
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-ethereum">overledger-dlt-ethereum</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Ethereum">Ethereum</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-dlt-ethereum"></a>

## overledger-dlt-ethereum

* [overledger-dlt-ethereum](#module_overledger-dlt-ethereum)

    * [.default](#module_overledger-dlt-ethereum.default)

    * [.log](#module_overledger-dlt-ethereum.log)


<a name="module_overledger-dlt-ethereum.default"></a>

### *overledger-dlt-ethereum*.default
Development package for Ethereum.

<a name="module_overledger-dlt-ethereum.log"></a>

### *overledger-dlt-ethereum*.log
<a name="Ethereum"></a>

## Ethereum

* [Ethereum](#Ethereum)

    * [new Ethereum(sdk)](#new_Ethereum_new)

    * [.name](#Ethereum+name)

    * [.symbol](#Ethereum+symbol)

    * [.createAccount()](#Ethereum+createAccount)

    * [.setAccount(accountInfo)](#Ethereum+setAccount)


<a name="new_Ethereum_new"></a>

### new Ethereum(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |

<a name="Ethereum+name"></a>

### *ethereum*.name
Name of the DLT

<a name="Ethereum+symbol"></a>

### *ethereum*.symbol
Symbol of the DLT

<a name="Ethereum+createAccount"></a>

### *ethereum*.createAccount()
Create an Ethereum account

**Returns**: <code>Account</code> - the new Ethereum account  
<a name="Ethereum+setAccount"></a>

### *ethereum*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing transactions for a specific DLT

