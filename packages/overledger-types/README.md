[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-types

Package including all the types used by the [Overledger SDK][repo].

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-types
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-types
```

## Reference

## Modules

<dl>
<dt><a href="#module_overledger-types">overledger-types</a></dt>
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

<a name="module_overledger-types"></a>

## overledger-types
<a name="module_overledger-types.DltNameOptions"></a>

### *overledger-types*.DltNameOptions
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

