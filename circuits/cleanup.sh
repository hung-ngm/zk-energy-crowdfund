# cleanup
rm -rf $1_js

rm -rf *.zkey
rm -rf *.r1cs
rm -rf *.sym
rm -rf $1_verification_key.json
echo "Cleanup done"