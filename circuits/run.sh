# Compile the circuit to get system of arithmetic equations representing it
# --r1cs: it generates the file multiplier2.r1cs that contains the R1CS constraint system of the circuit in binary format.
# --wasm: it generates the directory multiplier2_js that contains the Wasm code (multiplier2.wasm) and other files needed to generate the witness.
# --sym : it generates the file multiplier2.sym , a symbols file required for debugging or for printing the constraint system in an annotated mode.
# --c : it generates the directory multiplier2_cpp that contains several files (multiplier2.cpp, multiplier2.dat, and other common files for every compiled program like main.cpp, MakeFile, etc) needed to compile the C code to generate the witness.

# Check if the necessary ptau file already exists. If it does not exist, create one
ptau_file=pot14_final.ptau
if [ -f ./$ptau_file ]; then
    echo "----- $ptau_file already exists -----"
else
    echo "----- Create $ptau_file -----"
    # https://github.com/iden3/snarkjs
    snarkjs powersoftau new bn128 14 pot14_0000.ptau -v
    snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v
    snarkjs powersoftau contribute pot14_0001.ptau pot14_0002.ptau --name="Second contribution" -v -e="some random text"
    snarkjs powersoftau export challenge pot14_0002.ptau challenge_0003
    snarkjs powersoftau challenge contribute bn128 challenge_0003 response_0003 -e="some random text"
    snarkjs powersoftau import response pot14_0002.ptau response_0003 pot14_0003.ptau -n="Third contribution name"
    # snarkjs powersoftau verify pot14_0003.ptau
    snarkjs powersoftau beacon pot14_0003.ptau pot14_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"
    snarkjs powersoftau prepare phase2 pot14_beacon.ptau $ptau_file -v
    rm -f challenge_0003
    rm -f response_0003
    rm -f pot14_000*.ptau
    rm -f pot14_beacon.ptau
fi

echo "Compiling $1.circom"
circom $1.circom --r1cs --wasm --sym --verbose

# Gernating Snarks: trusted setup with Groth16 zk-SNARK
# 1. Powers of tau, independent of circuit
# 2. Phase 2, dependent on circuit

echo "Generating first zkey from hermez ptau file"
# generate .zkey file that contains proving and verification keys along with phase 2 contributions
snarkjs zkey new $1.r1cs $ptau_file $1_0000.zkey

echo "Phase 2 of trusted setup"
# phase 2
# generation

# Contribute to the phase 2 of the ceremony --> generates final .zkey file
snarkjs zkey contribute $1_0000.zkey $1_final.zkey

# export the verification key
snarkjs zkey export verificationkey $1_final.zkey $1_verification_key.json

# Generating a proof
# compute the witness with web assembly
echo "Computing the witness"

node $1_js/generate_witness.js $1_js/$1.wasm $1_input.json $1_js/witness.wtns

# compute the witness with cpp
# make sure we have nlohmann-json3-dev, libgmp-dev and nasm
# cd $1_cpp
# make
# ./$1 input.json witness.wtns

echo "Generating proof"
snarkjs groth16 prove $1_final.zkey $1_js/witness.wtns $1_js/proof.json $1_js/public.json

echo "Verifying proof"
# verify a proof
snarkjs groth16 verify $1_verification_key.json $1_js/public.json $1_js/proof.json
# generate solidity verifier contract
snarkjs zkey export solidityverifier $1_final.zkey $1.sol
# generate solidity calldata
snarkjs zkey export soliditycalldata $1_js/public.json $1_js/proof.json
