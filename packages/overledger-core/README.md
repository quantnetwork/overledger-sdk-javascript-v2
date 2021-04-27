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

## Modules

<dl>
<dt><a href="#module_overledger-core">overledger-core</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#OverledgerSDK">OverledgerSDK</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-core"></a>

## overledger-core

* [overledger-core](#module_overledger-core)

    * [.default](#module_overledger-core.default)

    * [.log](#module_overledger-core.log)


<a name="module_overledger-core.default"></a>

### *overledger-core*.default
Core Overledger SDK class. Individual dlt packages must be installed manually.

<a name="module_overledger-core.log"></a>

### *overledger-core*.log
**

<a name="OverledgerSDK"></a>

## OverledgerSDK

* [OverledgerSDK](#OverledgerSDK)

    * [new OverledgerSDK(options)](#new_OverledgerSDK_new)

    * [.dlts](#OverledgerSDK+dlts)

    * [.validateOptions(options)](#OverledgerSDK+validateOptions)

    * [.loadDlt(config)](#OverledgerSDK+loadDlt)

    * [.getEcho(echoRequest)](#OverledgerSDK+getEcho)

    * [.refreshAccessToken()](#OverledgerSDK+refreshAccessToken)

    * [.getTokensUsingClientIdAndSecret()](#OverledgerSDK+getTokensUsingClientIdAndSecret)

    * [.sign(unsignedData)](#OverledgerSDK+sign)


<a name="new_OverledgerSDK_new"></a>

### new OverledgerSDK(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Create the Overledger SDK

<a name="OverledgerSDK+dlts"></a>

### *overledgerSDK*.dlts
The object storing the DLTs loaded by the Overledger SDK

<a name="OverledgerSDK+validateOptions"></a>

### *overledgerSDK*.validateOptions(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Validate the provided Overledger SDK Options

<a name="OverledgerSDK+loadDlt"></a>

### *overledgerSDK*.loadDlt(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>DLTOptions</code> | DLT name and an optional Private Key to use as the main account |

Load the DLT in the Overledger SDK

**Returns**: <code>AbstractDLT</code> - The loaded DLT class  
<a name="OverledgerSDK+getEcho"></a>

### *overledgerSDK*.getEcho(echoRequest)

| Param |
| --- |
| echoRequest | 

Calls echoecho endpoint, just used to see if things connect

<a name="OverledgerSDK+refreshAccessToken"></a>

### *overledgerSDK*.refreshAccessToken()
refresh access token

<a name="OverledgerSDK+getTokensUsingClientIdAndSecret"></a>

### *overledgerSDK*.getTokensUsingClientIdAndSecret()
get new set of tokens using username, password, clientId and clientSecret

<a name="OverledgerSDK+sign"></a>

### *overledgerSDK*.sign(unsignedData)

| Param |
| --- |
| unsignedData | 

Signing a prepared object

