#!/bin/bash

set -e

source .env

RPC_ARGS=(--private-key ${PRIVATE_KEY} --rpc-url ${AVAIL_RPC_URL} --json)

CHAIN_ID=84532
COMPILER_VERSION="v0.8.25+commit.b61c2a91"
VERIFIER_URL="https://api-sepolia.basescan.org/api"

echo "Deploying crowdfund contracts to Base Sepolia"

########

TOKEN_ADDRESS=$(forge create ERC20Token --constructor-args "USD Token" "USDC" "100000000000" ${RPC_ARGS[@]} | jq -r .deployedTo)
echo "Deployed Faux USDC Token @ ${TOKEN_ADDRESS}"


VERIFIER_ADDRESS=$(forge create GreenEnergyProjectVerifier ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed Verifier address @ ${VERIFIER_ADDRESS}"


LOGIC_ADDRESS=$(forge create ZKGreenEnergyCrowdFunding ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Logic Contract @ ${LOGIC_ADDRESS}"


DEPLOYER_ADDRESS=$(forge create ZKGreenEnergyCrowdFundingFactory --constructor-args ${LOGIC_ADDRESS} ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Factory Contract @ ${DEPLOYER_ADDRESS}"
