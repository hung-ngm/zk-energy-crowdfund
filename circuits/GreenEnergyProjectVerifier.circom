pragma circom 2.0.3;

include "./node_modules/circomlib/circuits/comparators.circom";

template GreenEnergyProjectVerifier() {
    // Public inputs
    signal input regulatoryComplianceScoreThreshold; // Minimum 85 out of 100
    signal input ipProtectionLevelThreshold; // Minimum 4 out of 5
    
    // Outputs
    signal output regulatoryComplianceScoreValid;
    signal output ipProtectionLevelValid;

    // Private inputs
    signal input regulatoryComplianceScore;
    signal input ipProtectionLevel;

    // Verify regulatory compliance score
    component regulatoryComplianceScoreComparison = GreaterEqThan(7);
    regulatoryComplianceScoreComparison.in[0] <== regulatoryComplianceScore;
    regulatoryComplianceScoreComparison.in[1] <== regulatoryComplianceScoreThreshold;
    regulatoryComplianceScoreValid <== regulatoryComplianceScoreComparison.out;

    // Verify IP protection level
    component ipProtectionLevelComparison = GreaterEqThan(3);
    ipProtectionLevelComparison.in[0] <== ipProtectionLevel;
    ipProtectionLevelComparison.in[1] <== ipProtectionLevelThreshold;
    ipProtectionLevelValid <== ipProtectionLevelComparison.out;    
}

component main = GreenEnergyProjectVerifier();