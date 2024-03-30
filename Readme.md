# Introduction to Account Abstraction

This README provides an overview and a basic Node.js code snippet for building gasless transactions using Account Abstraction and the ZeroDev SDK. This repo is used as part of a workshop for Introduction to Account Abstraction at Web3Afrika. 

Slides below: 

https://www.beautiful.ai/player/-NuF07DKzPBkPskpiSqF

## Getting Started

Before you can use the ZeroDev SDK, you need to obtain a project ID from their dashboard. Visit [ZeroDev Dashboard](https://dashboard.zerodev.app/) to get your project ID.

The script requires that we set a project ID and a private key. We can generate a random private key with this command:

```bash
node -e "console.log('0x' + require('crypto').randomBytes(32).toString('hex'))"
```

Make sure not to commit your project ID and Bundler/Paymaster urls to git. 


## Gasless Batched Transactions with ZeroDev SDK

The Node.js snippet in `app.js` demonstrates how to create gasless batched transactions using Account Abstraction and the ZeroDev SDK. 

## Important note 

To run this code as is, you need to have your smart account address allowlisted. 

You can see the Kids Allowance Smart Contract below and redeploy your own: 

https://sepolia.etherscan.io/address/0x5Cd431ec41a4d275d75e94A8F48393436230dc85#code

You can mint your own basic tokens for ease of use here: 

https://sepolia.etherscan.io/address/0x6305d48dAFfa321604B87eF8Bf8c2231c611F972#writeContract

