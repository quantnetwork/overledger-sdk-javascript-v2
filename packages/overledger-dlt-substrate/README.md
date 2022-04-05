[docs]: https://github.com/quantnetwork/overledger-sdk-javascript-v2/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript-v2

# @quantnetwork/overledger-dlt-substrate

[Overledger SDK][repo] module for interaction with the Substrate distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-ethereum
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-substrate
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-substrate">overledger-dlt-substrate</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Substrate">Substrate</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-dlt-substrate"></a>

## overledger-dlt-substrate

* [overledger-dlt-substrate](#module_overledger-dlt-substrate)

    * [.default](#module_overledger-dlt-substrate.default)

    * [.log](#module_overledger-dlt-substrate.log)


<a name="module_overledger-dlt-substrate.default"></a>

### *overledger-dlt-substrate*.default
Development package for Substrate.

<a name="module_overledger-dlt-substrate.log"></a>

### *overledger-dlt-substrate*.log
<a name="Substrate"></a>

## Substrate

* [Substrate](#Substrate)

    * [new Substrate(sdk, options)](#new_Substrate_new)

    * [.createAccount()](#Substrate+createAccount)

    * [.setAccount(accountInfo)](#Substrate+setAccount)


<a name="new_Substrate_new"></a>

### new Substrate(sdk, options)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |
| options | <code>Object</code> | any additional options to instantiate this dlt |

<a name="Substrate+createAccount"></a>

### *substrate*.createAccount()
Create a Substrate account

**Returns**: <code>Account</code> - the new Substrate account  
<a name="Substrate+setAccount"></a>

### *substrate*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing transactions for a specific DLT

