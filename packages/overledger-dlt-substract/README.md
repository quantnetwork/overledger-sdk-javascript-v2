[docs]: https://github.com/quantnetwork/overledger-sdk-javascript-v2/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript-v2

# @quantnetwork/overledger-dlt-substract

[Overledger SDK][repo] module for interaction with the Substract technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-substract
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-substract
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-substract">overledger-dlt-substract</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Substract">Substract</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-dlt-substract"></a>

## overledger-dlt-substract

* [overledger-dlt-substract](#module_overledger-dlt-substract)

    * [.default](#module_overledger-dlt-substract.default)

    * [.log](#module_overledger-dlt-substract.log)


<a name="module_overledger-dlt-substract.default"></a>

### *overledger-dlt-substract*.default
Development package for Substract.

<a name="module_overledger-dlt-substract.log"></a>

### *overledger-dlt-substract*.log
<a name="Substract"></a>

## Substract

* [Substract](#Substract)

    * [new Substract(sdk)](#new_Substract_new)

    * [.name](#Substract+name)

    * [.symbol](#Substract+symbol)

    * [.createAccount()](#Substract+createAccount)

    * [.setAccount(accountInfo)](#Substract+setAccount)

    * [.isValidSeed()](#Substract+isValidSeed)


<a name="new_Substract_new"></a>

### new Substract(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="Substract+name"></a>

### *substract*.name
Name of the DLT

<a name="Substract+symbol"></a>

### *substract*.symbol
Symbol of the DLT

<a name="Substract+createAccount"></a>

### *substract*.createAccount()
Create a Substract (Polkadot) account

**Returns**: <code>Account</code> - (privateKey, address)  
<a name="Substract+setAccount"></a>

### *substract*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing for a specific DLT

