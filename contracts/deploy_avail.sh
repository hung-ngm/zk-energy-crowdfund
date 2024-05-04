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

# forge verify-contract --verifier blockscout --watch \
#    --verifier-url "https://explorer.sepolia.mantle.xyz/api?module=contract&action=verify" \
#    --compiler-version "v0.8.23" \
#    --num-of-optimizations 1000000 \
#    --constructor-args $(cast abi-encode "constructor(string,string,uint256)" "USD Token" "USDC" 100000000000) \
#    --chain 5003 \
#    $TOKEN_ADDRESS \
#    src/ERC20Token.sol:ERC20Token


VERIFIER_ADDRESS=$(forge create GreenEnergyProjectVerifier ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed Verifier address @ ${VERIFIER_ADDRESS}"


LOGIC_ADDRESS=$(forge create ZKGreenEnergyCrowdFunding ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Logic Contract @ ${LOGIC_ADDRESS}"


DEPLOYER_ADDRESS=$(forge create ZKGreenEnergyCrowdFundingFactory --constructor-args ${LOGIC_ADDRESS} ${RPC_ARGS[@]} --via-ir | jq -r .deployedTo)
echo "Deployed ZKGreenEnergyCrowdFunding Factory Contract @ ${DEPLOYER_ADDRESS}"
