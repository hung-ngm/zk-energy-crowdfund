#!/bin/bash

# Set the path to your JSON file
JSON_FILE="out/ZKGreenEnergyCrowdFunding.sol/ZKGreenEnergyCrowdFunding.json"

# Set the output file path for the ABI
OUTPUT_FILE="ZKGreenEnergyCrowdFunding.abi"

# Extract the ABI from the JSON file and save it to the output file
jq -r '.abi' "$JSON_FILE" > "$OUTPUT_FILE"

echo "ABI extracted and saved to $OUTPUT_FILE"