#!/bin/bash

# Set the path to your JSON file
JSON_FILE="out/ERC20Token.sol/ERC20Token.json"

# Set the output file path for the ABI
OUTPUT_FILE="ERC20Token.abi"

# Extract the ABI from the JSON file and save it to the output file
jq -r '.abi' "$JSON_FILE" > "$OUTPUT_FILE"

echo "ABI extracted and saved to $OUTPUT_FILE"