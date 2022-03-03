## Modules

<dl>
<dt><a href="#module_overledger-aws-provider">overledger-aws-provider</a></dt>
<dd></dd>
<dt><a href="#module_overledger-bundle">overledger-bundle</a></dt>
<dd></dd>
<dt><a href="#module_overledger-core">overledger-core</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-abstract">overledger-dlt-abstract</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-bitcoin">overledger-dlt-bitcoin</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-ethereum">overledger-dlt-ethereum</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-xrp-ledger">overledger-dlt-xrp-ledger</a></dt>
<dd></dd>
<dt><a href="#module_overledger-provider">overledger-provider</a></dt>
<dd></dd>
<dt><a href="#module_overledger-types">overledger-types</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#OverledgerSDK">OverledgerSDK</a></dt>
<dd></dd>
<dt><a href="#Bitcoin">Bitcoin</a></dt>
<dd></dd>
<dt><a href="#Ethereum">Ethereum</a></dt>
<dd></dd>
<dt><a href="#Ripple">Ripple</a></dt>
<dd></dd>
<dt><a href="#Provider">Provider</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Account">Account</a> : <code>Object</code></dt>
<dd><p>An Overledger Account instance for a single DLT.</p>
</dd>
<dt><a href="#DLTOptions">DLTOptions</a> : <code>Object</code></dt>
<dd><p>Options for loading a DLT in the SDK.</p>
</dd>
<dt><a href="#NetworkOptions">NetworkOptions</a> : <code>string</code></dt>
<dd><p>Overledger network options.</p>
</dd>
<dt><a href="#ProviderOptions">ProviderOptions</a> : <code>Object</code></dt>
<dd><p>Overledger network provider options.</p>
</dd>
<dt><a href="#SDKOptions">SDKOptions</a> : <code>Object</code></dt>
<dd><p>Overledger SDK options.</p>
</dd>
</dl>

<a name="module_overledger-aws-provider"></a>

## overledger-aws-provider
<a name="module_overledger-bundle"></a>

## overledger-bundle
<a name="module_overledger-bundle.default"></a>

### *overledger-bundle*.default
Main Overledger SDK bundle. Includes all the packages for all supported DLTs.

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

<a name="module_overledger-dlt-abstract"></a>

## overledger-dlt-abstract

* [overledger-dlt-abstract](#module_overledger-dlt-abstract)

  * [.AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

    * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

    * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

    * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

    * [.getEcho()](#module_overledger-dlt-abstract.AbstractDLT+getEcho)

  * [.default](#module_overledger-dlt-abstract.default)


<a name="module_overledger-dlt-abstract.AbstractDLT"></a>

### *overledger-dlt-abstract*.AbstractDLT

* [.AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

  * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

  * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

  * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

  * [.getEcho()](#module_overledger-dlt-abstract.AbstractDLT+getEcho)


<a name="new_module_overledger-dlt-abstract.AbstractDLT_new"></a>

#### new AbstractDLT(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="module_overledger-dlt-abstract.AbstractDLT+createAccount"></a>

#### *abstractDLT*.createAccount()
Create an account for a specific DLT

Abstract method to be implemented in each DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+setAccount"></a>

#### *abstractDLT*.setAccount(AccountInfo)

| Param | Type | Description |
| --- | --- | --- |
| AccountInfo | [<code>Account</code>](#Account) | The standardised Account Object |

Set an account for signing transactions for a specific DLT

Abstract method to be implemented in each DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+getEcho"></a>

#### *abstractDLT*.getEcho()
<a name="module_overledger-dlt-abstract.default"></a>

### *overledger-dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

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
<a name="module_overledger-dlt-xrp-ledger"></a>

## overledger-dlt-xrp-ledger

* [overledger-dlt-xrp-ledger](#module_overledger-dlt-xrp-ledger)

  * [.default](#module_overledger-dlt-xrp-ledger.default)

  * [.log](#module_overledger-dlt-xrp-ledger.log)


<a name="module_overledger-dlt-xrp-ledger.default"></a>

### *overledger-dlt-xrp-ledger*.default
Development package for Ripple (XRP Ledger).

<a name="module_overledger-dlt-xrp-ledger.log"></a>

### *overledger-dlt-xrp-ledger*.log
<a name="module_overledger-provider"></a>

## overledger-provider

* [overledger-provider](#module_overledger-provider)

  * [.TESTNET](#module_overledger-provider.TESTNET)

  * [.MAINNET](#module_overledger-provider.MAINNET)

  * [.default](#module_overledger-provider.default)

  * [.log](#module_overledger-provider.log)

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
<a name="module_overledger-provider.log"></a>

### *overledger-provider*.log
<a name="module_overledger-types"></a>

## overledger-types
<a name="module_overledger-types.DltNameOptions"></a>

### *overledger-types*.DltNameOptions
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
| options | [<code>SDKOptions</code>](#SDKOptions) | The DLT Options and Provider Options |

Create the Overledger SDK

<a name="OverledgerSDK+dlts"></a>

### *overledgerSDK*.dlts
The object storing the DLTs loaded by the Overledger SDK

<a name="OverledgerSDK+validateOptions"></a>

### *overledgerSDK*.validateOptions(options)

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>SDKOptions</code>](#SDKOptions) | The DLT Options and Provider Options |

Validate the provided Overledger SDK Options

<a name="OverledgerSDK+loadDlt"></a>

### *overledgerSDK*.loadDlt(config)

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>DLTOptions</code>](#DLTOptions) | DLT name and an optional Private Key to use as the main account |

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

**Returns**: [<code>Account</code>](#Account) - the new Bitcoin account  
<a name="Bitcoin+setAccount"></a>

### *bitcoin*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing transactions for a specific DLT

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

**Returns**: [<code>Account</code>](#Account) - the new Ethereum account  
<a name="Ethereum+setAccount"></a>

### *ethereum*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing transactions for a specific DLT

<a name="Ripple"></a>

## Ripple

* [Ripple](#Ripple)

  * [new Ripple(sdk)](#new_Ripple_new)

  * [.name](#Ripple+name)

  * [.symbol](#Ripple+symbol)

  * [.createAccount()](#Ripple+createAccount)

  * [.setAccount(accountInfo)](#Ripple+setAccount)

  * [.isValidSeed()](#Ripple+isValidSeed)


<a name="new_Ripple_new"></a>

### new Ripple(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="Ripple+name"></a>

### *ripple*.name
Name of the DLT

<a name="Ripple+symbol"></a>

### *ripple*.symbol
Symbol of the DLT

<a name="Ripple+createAccount"></a>

### *ripple*.createAccount()
Create an XRP account

**Returns**: [<code>Account</code>](#Account) - (privateKey, address)  
<a name="Ripple+setAccount"></a>

### *ripple*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing for a specific DLT

<a name="Ripple+isValidSeed"></a>

### *ripple*.isValidSeed()
ripple seed validation

<a name="Provider"></a>

## Provider

* [Provider](#Provider)

  * [new Provider(mappId, bpiKey, ProviderOptions)](#new_Provider_new)

  * [.createRequest(path, accessToken, contentType, acceptString)](#Provider+createRequest)


<a name="new_Provider_new"></a>

### new Provider(mappId, bpiKey, ProviderOptions)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | The Multi-chain Application ID |
| bpiKey | <code>string</code> | The Overledger Blockchain Programming Interface license key |
| ProviderOptions | [<code>ProviderOptions</code>](#ProviderOptions) | Overledger network provider options |

<a name="Provider+createRequest"></a>

### *provider*.createRequest(path, accessToken, contentType, acceptString)

| Param |
| --- |
| path | 
| accessToken | 
| contentType | 
| acceptString | 

Creating a request, making this as flexible as possible with the possible values in the headers being passed in the method signature

<a name="Account"></a>

## Account
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The private key of the account, used for signing transactions. |
| address | <code>string</code> | The address of the account, used for receiving messages |
| publicKey | <code>string</code> | The public key of the account. The address parameter will be a representation of this public key. |
| password | <code>string</code> | For some accounts, they may be protected by a password, or a password is used instead of a private key |
| provider | <code>string</code> | If the account is stored or managed not by the user, then this person is the provider |

An Overledger Account instance for a single DLT.

<a name="DLTOptions"></a>

## DLTOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| [privateKey] | <code>string</code> | The private key of an account for the respecitve dlt. |

Options for loading a DLT in the SDK.

<a name="NetworkOptions"></a>

## NetworkOptions
Overledger network options.

<a name="ProviderOptions"></a>

## ProviderOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [network] | [<code>NetworkOptions</code>](#NetworkOptions) | The network, either testnet, mainnet or custom. |
| [timeout] | <code>number</code> | Request timeout period specified in milliseconds. |

Overledger network provider options.

<a name="SDKOptions"></a>

## SDKOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlts | [<code>Array.&lt;DLTOptions&gt;</code>](#DLTOptions) | The dlts to be loaded. |
| [provider] | [<code>ProviderOptions</code>](#ProviderOptions) | The network provider options. |

Overledger SDK options.

