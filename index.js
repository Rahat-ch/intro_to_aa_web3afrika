const { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } = require("@zerodev/sdk");
const { signerToEcdsaValidator } = require("@zerodev/ecdsa-validator");
const { http, encodeFunctionData, createPublicClient, parseEther } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { sepolia } = require("viem/chains");
const kidsAllowanceAbi = require("./kidsallowanceabi.json");
const tokenAbi = require("./tokenabi.json");


const PROJECT_ID = '';
const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${PROJECT_ID}`
const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${PROJECT_ID}`

const tokenAddress = "0x6305d48dAFfa321604B87eF8Bf8c2231c611F972"
const kidsAllowanceAddress = "0x5Cd431ec41a4d275d75e94A8F48393436230dc85"

const main = async () => {

  const privateKey = "";
  const signer = privateKeyToAccount(privateKey);

  console.log({ signer });


  const publicClient = createPublicClient({
    transport: http(BUNDLER_RPC),
  });


  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
  });


  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
  });


  const kernelClient = createKernelAccountClient({
    account,
    chain: sepolia,
    transport: http(BUNDLER_RPC),
    sponsorUserOperation: async ({ userOperation }) => {
      const zerodevPaymaster = createZeroDevPaymasterClient({
        chain: sepolia,
        transport: http(PAYMASTER_RPC),
      });
      return zerodevPaymaster.sponsorUserOperation({
        userOperation
      });
    }
  });

  const accountAddress = kernelClient.account.address;
  console.log("My account:", accountAddress);


  console.log("transacting...")
  const txHash = await kernelClient.sendTransactions({
    transactions: [
      {
        to: tokenAddress,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: tokenAbi,
          functionName: "approve",
          args: [kidsAllowanceAddress, parseEther("50")],
        }),
      },
      {
        to: kidsAllowanceAddress,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: kidsAllowanceAbi,
          functionName: "deposit",
          args: [parseEther("10")],
        }),
      },
    ],
  })

  console.log({ txHash })
};

main();
