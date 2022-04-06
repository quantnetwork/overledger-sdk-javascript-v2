[docs]: https://github.com/quantnetwork/overledger-sdk-javascript-v2/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript-v2

# @quantnetwork/overledger-provider

Class used for the [Overledger SDK][repo] Gateway connection.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-provider
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-provider
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-provider">overledger-provider</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Provider">Provider</a></dt>
<dd></dd>
</dl>

<a name="module_overledger-provider"></a>

## overledger-provider

* [overledger-provider](#module_overledger-provider)

    * [.TESTNET](#module_overledger-provider.TESTNET)

    * [.MAINNET](#module_overledger-provider.MAINNET)

    * [.default](#module_overledger-provider.default)

    * [.log](#module_overledger-provider.log)


<a name="module_overledger-provider.TESTNET"></a>

### *overledger-provider*.TESTNET
Constant for the testnet URL.

<a name="module_overledger-provider.MAINNET"></a>

### *overledger-provider*.MAINNET
Constant for the mainnet URL (placeholder).

<a name="module_overledger-provider.default"></a>

### *overledger-provider*.default
Network provider package.

<a name="module_overledger-provider.log"></a>

### *overledger-provider*.log
<a name="Provider"></a>

## Provider

* [Provider](#Provider)

    * [new Provider(ProviderOptions)](#new_Provider_new)

    * [.createRequest(path, accessToken, contentType, acceptString)](#Provider+createRequest)


<a name="new_Provider_new"></a>

### new Provider(ProviderOptions)

| Param | Type | Description |
| --- | --- | --- |
| ProviderOptions | <code>ProviderOptions</code> | Overledger network provider options |

<a name="Provider+createRequest"></a>

### *provider*.createRequest(path, accessToken, contentType, acceptString)

| Param |
| --- |
| path | 
| accessToken | 
| contentType | 
| acceptString | 

Creating a request, making this as flexible as possible with the possible values in the headers being passed in the method signature

