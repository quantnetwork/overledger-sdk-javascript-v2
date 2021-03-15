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

    * _static_
        * [.default](#module_overledger-dlt-abstract.default)

    * _inner_
        * [~AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

            * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

            * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

            * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

            * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

            * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

            * [.sign(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+sign)

            * [.transactionValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+transactionValidation)

            * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

            * [.buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery)

            * [.smartContractQueryValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation)

            * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="module_overledger-dlt-abstract.default"></a>

### *overledger-dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

<a name="module_overledger-dlt-abstract.AbstractDLT"></a>

### *overledger-dlt-abstract*~AbstractDLT

* [~AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

    * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

    * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

    * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

    * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

    * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

    * [.sign(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+sign)

    * [.transactionValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+transactionValidation)

    * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

    * [.buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery)

    * [.smartContractQueryValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation)

    * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


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

<a name="module_overledger-dlt-abstract.AbstractDLT+getBalance"></a>

#### *abstractDLT*.getBalance(address)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> | <code>null</code> | The address to query for |

Get the balance for a specific address

<a name="module_overledger-dlt-abstract.AbstractDLT+getSequence"></a>

#### *abstractDLT*.getSequence(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

Get the sequence for a specific address

<a name="module_overledger-dlt-abstract.AbstractDLT+sign"></a>

#### *abstractDLT*.sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | the transaction information |

Converts an Overledger transaction to the correct format for the DLT in question and signs it

<a name="module_overledger-dlt-abstract.AbstractDLT+transactionValidation"></a>

#### *abstractDLT*.transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | the transaction to check the formatting of |

Takes the given transaction and validates it

**Returns**: <code>ValidationCheck</code> - - returns an object {success: boolean, failingField: string, error: string}.
 If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
 the first failing transaction field and error will contain information on this problem  
<a name="module_overledger-dlt-abstract.AbstractDLT+send"></a>

#### *abstractDLT*.send(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Send an Overledger signed transaction

<a name="module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery"></a>

#### *abstractDLT*.buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's dlt address |
| contractQueryDetails | <code>smartContract</code> | The details on the smart contract query |

Allows a smart contract to be queried.

<a name="module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation"></a>

#### *abstractDLT*.smartContractQueryValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | the transaction to check the formatting of |

Takes the given smartContractQuery and validates it

**Returns**: <code>ValidationCheck</code> - - returns an object {success: boolean, failingField: string, error: string}.
 If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
 the first failing transaction field and error will contain information on this problem  
<a name="module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall"></a>

#### *abstractDLT*.buildSignedTransactionsApiCall(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Wrap a specific DLT signed transaction with the Overledger required fields

