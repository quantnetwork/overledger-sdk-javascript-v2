[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-abstract

[Overledger SDK][repo] abstract class for dlt functions.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-abstract
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-abstract
```

## API Reference

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
| AccountInfo | <code>Account</code> | The standardised Account Object |

Set an account for signing transactions for a specific DLT

Abstract method to be implemented in each DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+getEcho"></a>

#### *abstractDLT*.getEcho()
<a name="module_overledger-dlt-abstract.default"></a>

### *overledger-dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

