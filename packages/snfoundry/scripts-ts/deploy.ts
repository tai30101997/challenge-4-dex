import {
  deployContract,
  executeDeployCalls,
  deployer,
  provider,
  exportDeployments,
} from "./deploy-contract";
import { green, yellow } from "./helpers/colorize-log";
import { cairo, CallData } from "starknet";

let balloons_token: any;
let dex: any;
const STRK_ADDRESS =
  "0x4718F5A0FC34CC1AF16A1CDEE98FFB20C31F5CD61D6AB07201858F4287C938D";
const INITIAL_SUPPLY = cairo.uint256(5_000_000_000_000_000_000n); // 5 * 10^18



const setUpDex = async (): Promise<void> => {

  console.log(yellow("Setting up Dex with initial liquidity..."));

  // Check initial BAL balance of deployer
  const balanceResponse = await deployer.callContract({
    contractAddress: balloons_token.address,
    entrypoint: "balance_of",
    calldata: [deployer.address],
  });
  console.log(green("Deployer initial BAL (fri):"), BigInt(balanceResponse[0]).toString());

  // Approve DEX to spend BAL and STRK (from deployer)
  let approveResponse = await deployer.execute(
    [
      {
        contractAddress: balloons_token.address,
        entrypoint: "approve",
        calldata: CallData.compile({
          spender: dex.address,
          amount: INITIAL_SUPPLY,
        }),
      },
      {
        contractAddress: STRK_ADDRESS,
        entrypoint: "approve",
        calldata: CallData.compile({
          spender: dex.address,
          amount: INITIAL_SUPPLY,
        }),
      },
    ],
    { maxFee: 1e15 }
  );
  await provider.waitForTransaction(approveResponse.transaction_hash);
  console.log(green("Approved Dex to spend BAL + STRK"));
  // Call init() on Dex (pull tokens from deployer into dex)
  console.log(yellow("Calling init() on Dex to seed liquidity..."));
  const initResponse = await deployer.execute(
    [{
      contractAddress: dex.address,
      entrypoint: "init",
      calldata: CallData.compile({
        tokens: INITIAL_SUPPLY,  // tokens amount
        strk: INITIAL_SUPPLY // 
      }),
    }],
    {
      maxFee: 1e15,
    }
  );
  await provider.waitForTransaction(initResponse.transaction_hash);
  console.log(green("Dex initialized with liquidity"));

  // verify Dex's BAL balance
  const dexBalanceResponse = await deployer.callContract({
    contractAddress: balloons_token.address,
    entrypoint: "balance_of",
    calldata: [dex.address],
  });
  console.log(green("Dex BAL balance:"), BigInt(dexBalanceResponse[0]).toString());


}

/**
 * Deploys the Balloons and Dex contracts.
 */
const deployScript = async (): Promise<void> => {
  balloons_token = await deployContract({
    contract: "Balloons",
    constructorArgs: {
      initial_supply: cairo.uint256(1_000_000_000_000_000_000_000n), // 1000 * 10^18
      recipient: deployer.address, // In devnet, your deployer.address is by default the first pre-deployed account: 0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691
    },
  });

  dex = await deployContract({
    contract: "Dex",
    constructorArgs: {
      strk_token_address: STRK_ADDRESS,
      token_address: balloons_token.address,
      owner: deployer.address,
    },
  });
};



/**
 * Main function to deploy contracts and execute deployment calls.
 */
async function main() {
  await deployScript();
  await executeDeployCalls();
  await setUpDex();
  await exportDeployments();
  console.log(green("All Setup Done"));
}

main().catch(console.error);
