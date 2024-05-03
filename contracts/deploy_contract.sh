#!/bin/bash

set -e

source .env

ANVIL_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
ANVIL_HOST="${ANVIL_HOST:-http://localhost:8545}"
RPC_ARGS=(--private-key ${PRIVATE_KEY} --rpc-url ${BASE_SEPOLIA_RPC_URL} --json)

CHAIN_ID=84532
COMPILER_VERSION="v0.8.25+commit.b61c2a91"
VERIFIER_URL="https://api-sepolia.basescan.org/api"

echo "Deploying crowdfund contracts to Base Sepolia"

########

TOKEN_ADDRESS=$(forge create ERC20Token --constructor-args "USD Token" "USDC" "100000000000" ${RPC_ARGS[@]} --via-ir --etherscan-api-key $BLOCK_EXPLORER_API_KEY --verify | sed -n '1p' | jq -r .deployedTo)
echo "Deployed Faux USDC Token @ ${TOKEN_ADDRESS}"


VERIFIER_ADDRESS=$(forge create GreenEnergyProjectVerifier ${RPC_ARGS[@]} --via-ir --etherscan-api-key $BLOCK_EXPLORER_API_KEY --verify | sed -n '1p' | jq -r .deployedTo)
echo "Deployed Verifier address @ ${VERIFIER_ADDRESS}"


LOGIC_ADDRESS=$(forge create ZKGreenEnergyCrowdFunding ${RPC_ARGS[@]} --via-ir --etherscan-api-key $BLOCK_EXPLORER_API_KEY --verify | sed -n '1p' | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Logic Contract @ ${LOGIC_ADDRESS}"


DEPLOYER_ADDRESS=$(forge create ZKGreenEnergyCrowdFundingFactory --constructor-args ${LOGIC_ADDRESS} ${RPC_ARGS[@]} --via-ir --etherscan-api-key $BLOCK_EXPLORER_API_KEY --verify | sed -n '1p' | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Factory Contract @ ${DEPLOYER_ADDRESS}"


#########

DEPLOY_SIG="deployCampaign(address,uint256,uint256,uint256,uint256,uint32,uint32,address,uint256,uint256,address)"
DEPLOY_ETH_ARGS=(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 100000000000 100000000000000000 1 1000000000 0 1800 0x0000000000000000000000000000000000000000 85 4 ${VERIFIER_ADDRESS})
ETH_CONTRACT=$(cast send ${DEPLOYER_ADDRESS} "${DEPLOY_SIG}" ${DEPLOY_ETH_ARGS[@]} ${RPC_ARGS[@]} | jq -r '.logs[0].address')
echo "Deployed ETH Campaign @ ${ETH_CONTRACT}"

DEPLOY_ERC20_ARGS=(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 100000000000 100000000000000000 1 1000000000 0 1800 ${TOKEN_ADDRESS} 85 4 ${VERIFIER_ADDRESS})
echo $DEPLOY_ERC20_ARGS
ERC20_CONTRACT=$(cast send ${DEPLOYER_ADDRESS} "${DEPLOY_SIG}" ${DEPLOY_ERC20_ARGS[@]} ${RPC_ARGS[@]} | jq -r '.logs[0].address')
echo "Deployed ERC20 Campaign @ ${ERC20_CONTRACT}"
echo
echo "---------------"
echo
echo "ERC20 Example: cast call ${ERC20_CONTRACT} 'isContributionAllowed()' --rpc-url http://localhost:8545"
echo "  ETH Example: cast call ${ETH_CONTRACT} 'isContributionAllowed()' --rpc-url http://localhost:8545"