[docs]: https://github.com/quantnetwork/overledger-sdk-javascript-v2/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript-v2

# @quantnetwork/overledger-dlt-xrp-ledger

[Overledger SDK][repo] module for interaction with the Substrate distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-xrp-ledger
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-xrp-ledger
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-xrp-ledger">overledger-dlt-xrp-ledger</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Ripple">Substrate</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-dlt-xrp-ledger"></a>

## overledger-dlt-xrp-ledger

* [overledger-dlt-xrp-ledger](#module_overledger-dlt-xrp-ledger)

    * [.default](#module_overledger-dlt-xrp-ledger.default)

    * [.log](#module_overledger-dlt-xrp-ledger.log)


<a name="module_overledger-dlt-xrp-ledger.default"></a>

### *overledger-dlt-xrp-ledger*.default
Development package for Substrate (XRP Ledger).

<a name="module_overledger-dlt-xrp-ledger.log"></a>

### *overledger-dlt-xrp-ledger*.log
<a name="Substrate"></a>

## Substrate

* [Substrate](#Ripple)

    * [new Substrate(sdk)](#new_Ripple_new)

    * [.name](#Ripple+name)

    * [.symbol](#Ripple+symbol)

    * [.createAccount()](#Ripple+createAccount)

    * [.setAccount(accountInfo)](#Ripple+setAccount)

    * [.isValidSeed()](#Ripple+isValidSeed)


<a name="new_Ripple_new"></a>

### new Substrate(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="Substrate+name"></a>

### *ripple*.name
Name of the DLT

<a name="Substrate+symbol"></a>

### *ripple*.symbol
Symbol of the DLT

<a name="Substrate+createAccount"></a>

### *ripple*.createAccount()
Create an XRP account

**Returns**: <code>Account</code> - (privateKey, address)  
<a name="Substrate+setAccount"></a>

### *ripple*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing for a specific DLT

<a name="Substrate+isValidSeed"></a>

### *ripple*.isValidSeed()
ripple seed validation

