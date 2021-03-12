[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-ripple

[Overledger SDK][repo] module for interaction with the Ripple distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-ripple
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-ripple
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-ripple">overledger-dlt-ripple</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AtomicSwapXRPParams">AtomicSwapXRPParams</a> : <code>Object</code></dt>
<dd><p>An object used to describe the atomic swap params required for XRP</p>
</dd>
<dt><a href="#TrustlineXRPRequest">TrustlineXRPRequest</a> : <code>Object</code></dt>
<dd><p>A generic object used to describe an Overledger transaction request for the XRP Ledger. Note that this object inherits many parameters from TransactionAccountsRequest.</p>
</dd>
</dl>

<a name="module_overledger-dlt-ripple"></a>

## overledger-dlt-ripple

* [overledger-dlt-ripple](#module_overledger-dlt-ripple)

    * _static_
        * [.default](#module_overledger-dlt-ripple.default)

    * _inner_
        * [~Ripple](#module_overledger-dlt-ripple.Ripple)

            * [new Ripple(sdk)](#new_module_overledger-dlt-ripple.Ripple_new)

            * [.name](#module_overledger-dlt-ripple.Ripple+name)

            * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

            * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-ripple.Ripple+setAccount)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_transactionValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_sign)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation)

            * [.computeFeePrice(initialFee, transactionType, fulfillment)](#module_overledger-dlt-ripple.Ripple+computeFeePrice)

            * [.computeEscrowConditionFulfillment(hashAlgorithmInput)](#module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment)

            * [.isValidISODateFormat(dateTime)](#module_overledger-dlt-ripple.Ripple+isValidISODateFormat)

            * [.isValidDate(dateTimeCreate, dateTimeCancel)](#module_overledger-dlt-ripple.Ripple+isValidDate)

            * [.isValidRippleAddress(address)](#module_overledger-dlt-ripple.Ripple+isValidRippleAddress)


<a name="module_overledger-dlt-ripple.default"></a>

### *overledger-dlt-ripple*.default
Development package for Ripple (XRP Ledger).

<a name="module_overledger-dlt-ripple.Ripple"></a>

### *overledger-dlt-ripple*~Ripple

* [~Ripple](#module_overledger-dlt-ripple.Ripple)

    * [new Ripple(sdk)](#new_module_overledger-dlt-ripple.Ripple_new)

    * [.name](#module_overledger-dlt-ripple.Ripple+name)

    * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

    * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-ripple.Ripple+setAccount)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_transactionValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_sign)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation)

    * [.computeFeePrice(initialFee, transactionType, fulfillment)](#module_overledger-dlt-ripple.Ripple+computeFeePrice)

    * [.computeEscrowConditionFulfillment(hashAlgorithmInput)](#module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment)

    * [.isValidISODateFormat(dateTime)](#module_overledger-dlt-ripple.Ripple+isValidISODateFormat)

    * [.isValidDate(dateTimeCreate, dateTimeCancel)](#module_overledger-dlt-ripple.Ripple+isValidDate)

    * [.isValidRippleAddress(address)](#module_overledger-dlt-ripple.Ripple+isValidRippleAddress)


<a name="new_module_overledger-dlt-ripple.Ripple_new"></a>

#### new Ripple(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="module_overledger-dlt-ripple.Ripple+name"></a>

#### *ripple*.name
Name of the DLT

<a name="module_overledger-dlt-ripple.Ripple+symbol"></a>

#### *ripple*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ripple.Ripple+createAccount"></a>

#### *ripple*.createAccount()
Create an XRP account

**Returns**: <code>Account</code> - (privateKey, address)  
<a name="module_overledger-dlt-ripple.Ripple+setAccount"></a>

#### *ripple*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing for a specific DLT

<a name="module_overledger-dlt-ripple.Ripple+buildTransaction"></a>

#### *ripple*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionXRPRequest</code> | details on the information to include in this transaction for the XRP distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific XRP transaction

**Returns**: <code>Transaction</code> - the XRP transaction  
<a name="module_overledger-dlt-ripple.Ripple+_transactionValidation"></a>

#### *ripple*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to XRP specific rules

<a name="module_overledger-dlt-ripple.Ripple+_sign"></a>

#### *ripple*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an XRP transaction |

Takes in an overledger definition of a transaction for XRP, converts it into a form that the XRP distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery"></a>

#### *ripple*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's XRP address |
| contractQueryDetails | <code>Object</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the XRP distributed ledger (currently not supported for XRP)

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation"></a>

#### *ripple*._smartContractQueryValidation(contractQueryDetails)

| Param | Description |
| --- | --- |
| contractQueryDetails | the query details |

validates an OVL smart contract query according to XRP specific rules

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ripple.Ripple+computeFeePrice"></a>

#### *ripple*.computeFeePrice(initialFee, transactionType, fulfillment)

| Param | Description |
| --- | --- |
| initialFee |  |
| transactionType | what type of transaction is this |
| fulfillment | is there an escrow fulfillment to be added to the transaction |

<a name="module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment"></a>

#### *ripple*.computeEscrowConditionFulfillment(hashAlgorithmInput)

| Param |
| --- |
| hashAlgorithmInput | 

Takes a string hash algorith input and generates both the bytecode version of the condition to be placed on the ledger and also the bytecode version of its pre-image fulfillment

<a name="module_overledger-dlt-ripple.Ripple+isValidISODateFormat"></a>

#### *ripple*.isValidISODateFormat(dateTime)

| Param | Description |
| --- | --- |
| dateTime | the date to check |

Checking the given parameter passes the ISODate format

<a name="module_overledger-dlt-ripple.Ripple+isValidDate"></a>

#### *ripple*.isValidDate(dateTimeCreate, dateTimeCancel)

| Param | Description |
| --- | --- |
| dateTimeCreate | the escrow creation time |
| dateTimeCancel | the escrow cancelation time |

Checking the given parameter passes the ISODate format

<a name="module_overledger-dlt-ripple.Ripple+isValidRippleAddress"></a>

#### *ripple*.isValidRippleAddress(address)

| Param | Description |
| --- | --- |
| address | the address to check |

<a name="AtomicSwapXRPParams"></a>

## AtomicSwapXRPParams
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| allowCancelAfter | <code>Object</code> | from when can the escrow be executed? In ISOString format |
| allowExecuteAfter | <code>Object</code> | from when can the escrow be cancelled? In ISOString format |
| hashAlgorithmInputString | <code>Object</code> | this is the sha256 hash algorithm input as a string. It will NOT be placed on the ledger when creating a transaction. |
| hashAlgorithmCondition | <code>Object</code> | this is if there has been a hash string placed onto another chain and now we want to add it to this chain. |
| escrowSequence | <code>string</code> | The sequence number of the escrow you are executing or cancelling |
| hashAlgorithmFulfillment | <code>string</code> | This is the value to unlock the escrow (the input to the sha256 hash algorithm) |
| owner | <code>string</code> | The address that funded the escrow |

An object used to describe the atomic swap params required for XRP

<a name="TrustlineXRPRequest"></a>

## TrustlineXRPRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subType | <code>Object</code> | a redefinition of the TransactionRequest object, to add more XRP specific information |
| feePrice | <code>string</code> | the fee to pay for this transaction to enter the XRP ledger. It is denoted in drops where the current minimum allowed is 12. |
| maxLedgerVersion | <code>string</code> | The maximum ledger version the transaction can be included in |

A generic object used to describe an Overledger transaction request for the XRP Ledger. Note that this object inherits many parameters from TransactionAccountsRequest.

