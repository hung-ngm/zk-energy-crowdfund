const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "implementation",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deployCampaign",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "minGoal",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxGoal",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "minContribution",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxContribution",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "holdOff",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "duration",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "erc20TokenAddr",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "regulatoryComplianceScoreThreshold",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "ipProtectionLevelThreshold",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifierContract",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "feeSchedule",
    "inputs": [],
    "outputs": [
      {
        "name": "collector",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "transferFee",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "yieldFee",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "deployFee",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getZkGreenEnergyCrowdFundingProxies",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferDeployFees",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateFeeSchedule",
    "inputs": [
      {
        "name": "feeCollector",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "feeTransferBips",
        "type": "uint16",
        "internalType": "uint16"
      },
      {
        "name": "feeYieldBips",
        "type": "uint16",
        "internalType": "uint16"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateMinimumDeployFee",
    "inputs": [
      {
        "name": "minFeeAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "DeployFeeChange",
    "inputs": [
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DeployFeeTransfer",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Deployment",
    "inputs": [
      {
        "name": "deployment",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "FeeScheduleChange",
    "inputs": [
      {
        "name": "feeCollector",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "upfrontBips",
        "type": "uint16",
        "indexed": false,
        "internalType": "uint16"
      },
      {
        "name": "payoutBips",
        "type": "uint16",
        "indexed": false,
        "internalType": "uint16"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "FailedDeployment",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientBalance",
    "inputs": [
      {
        "name": "balance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "needed",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const;

export default abi;