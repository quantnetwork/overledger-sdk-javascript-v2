[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-ethereum

[Overledger SDK][repo] module for interaction with the Ethereum distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-ethereum
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-ethereum
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-ethereum">overledger-dlt-ethereum</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#computeParamType">computeParamType(param)</a></dt>
<dd><p>This function is used to prepare the parameter definition for the web3 package</p>
</dd>
</dl>

<a name="module_overledger-dlt-ethereum"></a>

## overledger-dlt-ethereum

* [overledger-dlt-ethereum](#module_overledger-dlt-ethereum)

    * _static_
        * [.EthereumBytesOptions](#module_overledger-dlt-ethereum.EthereumBytesOptions)

        * [.EthereumTypeOptions](#module_overledger-dlt-ethereum.EthereumTypeOptions)

        * [.EthereumUintIntOptions](#module_overledger-dlt-ethereum.EthereumUintIntOptions)

        * [.default](#module_overledger-dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

            * [new Ethereum(sdk)](#new_module_overledger-dlt-ethereum.Ethereum_new)

            * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

            * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_transactionValidation)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation)

            * [.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams)

            * [.computeTransactionDataForFunctionCall(functionName, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall)

            * [._sign(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_sign)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery)

            * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList)

            * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList)


<a name="module_overledger-dlt-ethereum.EthereumBytesOptions"></a>

### *overledger-dlt-ethereum*.EthereumBytesOptions
<a name="module_overledger-dlt-ethereum.EthereumTypeOptions"></a>

### *overledger-dlt-ethereum*.EthereumTypeOptions
<a name="module_overledger-dlt-ethereum.EthereumUintIntOptions"></a>

### *overledger-dlt-ethereum*.EthereumUintIntOptions
<a name="module_overledger-dlt-ethereum.default"></a>

### *overledger-dlt-ethereum*.default
Development package for Ethereum.

<a name="module_overledger-dlt-ethereum.Ethereum"></a>

### *overledger-dlt-ethereum*~Ethereum

* [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

    * [new Ethereum(sdk)](#new_module_overledger-dlt-ethereum.Ethereum_new)

    * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

    * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_transactionValidation)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation)

    * [.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams)

    * [.computeTransactionDataForFunctionCall(functionName, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall)

    * [._sign(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_sign)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery)

    * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList)

    * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList)


<a name="new_module_overledger-dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |

<a name="module_overledger-dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an Ethereum account

**Returns**: <code>Account</code> - the new Ethereum account  
<a name="module_overledger-dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionEthereumRequest</code> | details on the information to include in this transaction for the Ethereum distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Ethereum transaction

**Returns**: <code>Transaction</code> - the Ethereum transaction  
<a name="module_overledger-dlt-ethereum.Ethereum+_transactionValidation"></a>

#### *ethereum*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to Ethereum specific rules

<a name="module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation"></a>

#### *ethereum*._smartContractQueryValidation(contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| contractQueryDetails | <code>SmartContract</code> | The transaction request |

validates an OVL smart contract query according to Ethereum specific rules

<a name="module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams"></a>

#### *ethereum*.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)

| Param | Type | Description |
| --- | --- | --- |
| smartContractCode | <code>string</code> | the bytecode of the smart contract (without the byte code information on the constructor variables) |
| paramsList | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of parameters that this constructor takes as input |

Convert Overledger object description of a smart contract constructor and parameters into Ethereum versions

**Returns**: <code>string</code> - the bytecode of the smart contract and the parameters  
<a name="module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall"></a>

#### *ethereum*.computeTransactionDataForFunctionCall(functionName, paramsList)

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | the name of the smart contract function to call |
| paramsList | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of parameters that this function takes as input |

Convert Overledger object description of a smart contract function and parameters into Ethereum versions

**Returns**: <code>string</code> - the bytecode of this function call  
<a name="module_overledger-dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an ethereum transaction |

Takes in an overledger definition of a transaction for ethereum, converts it into a form that the Ethereum distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery"></a>

#### *ethereum*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's Ethereum address |
| contractQueryDetails | <code>SmartContractEthereum</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the Ethereum distributed ledger

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList"></a>

#### *ethereum*.computeSCQueryInputValuesList(inputFunctionParams)

| Param | Type | Description |
| --- | --- | --- |
| inputFunctionParams | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of input parameters |

computes the input parameters into the smart contract function query

<a name="module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList"></a>

#### *ethereum*.computeSCQueryOutputTypesList(outputFunctionTypes)

| Param | Type |
| --- | --- |
| outputFunctionTypes | <code>Array.&lt;SCEthereumParam&gt;</code> | 

computes the output parameters into the smart contract function query

<a name="computeParamType"></a>

## computeParamType(param)

| Param | Description |
| --- | --- |
| param | the parameter definition |

This function is used to prepare the parameter definition for the web3 package

