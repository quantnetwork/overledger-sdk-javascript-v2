[docs]: https://github.com/quantnetwork/overledger-sdk-javascript-v2/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript-v2

# @quantnetwork/overledger-dlt-bitcoin

[Overledger SDK][repo] module for interaction with the Bitcoin distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-bitcoin
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-bitcoin
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-bitcoin">overledger-dlt-bitcoin</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Bitcoin">Bitcoin</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-dlt-bitcoin"></a>

## overledger-dlt-bitcoin

* [overledger-dlt-bitcoin](#module_overledger-dlt-bitcoin)

    * [.default](#module_overledger-dlt-bitcoin.default)

    * [.log](#module_overledger-dlt-bitcoin.log)


<a name="module_overledger-dlt-bitcoin.default"></a>

### *overledger-dlt-bitcoin*.default
Development package for Bitcoin blockchain.

<a name="module_overledger-dlt-bitcoin.log"></a>

### *overledger-dlt-bitcoin*.log
<a name="Bitcoin"></a>

## Bitcoin

* [Bitcoin](#Bitcoin)

    * [new Bitcoin(sdk, options)](#new_Bitcoin_new)

    * [.name](#Bitcoin+name)

    * [.symbol](#Bitcoin+symbol)

    * [.createAccount()](#Bitcoin+createAccount)

    * [.setAccount(accountInfo)](#Bitcoin+setAccount)


<a name="new_Bitcoin_new"></a>

### new Bitcoin(sdk, options)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |
| options | <code>Object</code> | any additional options to instantiate this dlt |

<a name="Bitcoin+name"></a>

### *bitcoin*.name
Name of the DLT

<a name="Bitcoin+symbol"></a>

### *bitcoin*.symbol
Symbol of the DLT

<a name="Bitcoin+createAccount"></a>

### *bitcoin*.createAccount()
Create a Bitcoin account

**Returns**: <code>Account</code> - the new Bitcoin account  
<a name="Bitcoin+setAccount"></a>

### *bitcoin*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing transactions for a specific DLT

