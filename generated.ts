import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Semaphore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const semaphoreAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_verifier',
        internalType: 'contract ISemaphoreVerifier',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'LeafAlreadyExists' },
  { type: 'error', inputs: [], name: 'LeafCannotBeZero' },
  { type: 'error', inputs: [], name: 'LeafDoesNotExist' },
  { type: 'error', inputs: [], name: 'LeafGreaterThanSnarkScalarField' },
  { type: 'error', inputs: [], name: 'Semaphore__CallerIsNotTheGroupAdmin' },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__CallerIsNotThePendingGroupAdmin',
  },
  { type: 'error', inputs: [], name: 'Semaphore__GroupDoesNotExist' },
  { type: 'error', inputs: [], name: 'Semaphore__GroupHasNoMembers' },
  { type: 'error', inputs: [], name: 'Semaphore__InvalidProof' },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__MerkleTreeDepthIsNotSupported',
  },
  { type: 'error', inputs: [], name: 'Semaphore__MerkleTreeRootIsExpired' },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__MerkleTreeRootIsNotPartOfTheGroup',
  },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__YouAreUsingTheSameNullifierTwice',
  },
  { type: 'error', inputs: [], name: 'WrongSiblingNodes' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'oldAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GroupAdminPending',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'oldAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GroupAdminUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'GroupCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'oldMerkleTreeDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newMerkleTreeDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GroupMerkleTreeDurationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newIdentityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'startIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitments',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MembersAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'merkleTreeDepth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'nullifier',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'message',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'scope',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'points',
        internalType: 'uint256[8]',
        type: 'uint256[8]',
        indexed: false,
      },
    ],
    name: 'ProofValidated',
  },
  {
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'acceptGroupAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'identityCommitments',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'addMembers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'admin', internalType: 'address', type: 'address' },
      { name: 'merkleTreeDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createGroup',
    outputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createGroup',
    outputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'createGroup',
    outputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getGroupAdmin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMerkleTreeDepth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMerkleTreeRoot',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMerkleTreeSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'groupCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'groups',
    outputs: [
      { name: 'merkleTreeDuration', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasMember',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'indexOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
      {
        name: 'merkleProofSiblings',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'removeMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'newAdmin', internalType: 'address', type: 'address' },
    ],
    name: 'updateGroupAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'newMerkleTreeDuration',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateGroupMerkleTreeDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
      {
        name: 'newIdentityCommitment',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'merkleProofSiblings',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'updateMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'proof',
        internalType: 'struct ISemaphore.SemaphoreProof',
        type: 'tuple',
        components: [
          { name: 'merkleTreeDepth', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleTreeRoot', internalType: 'uint256', type: 'uint256' },
          { name: 'nullifier', internalType: 'uint256', type: 'uint256' },
          { name: 'message', internalType: 'uint256', type: 'uint256' },
          { name: 'scope', internalType: 'uint256', type: 'uint256' },
          { name: 'points', internalType: 'uint256[8]', type: 'uint256[8]' },
        ],
      },
    ],
    name: 'validateProof',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        name: '',
        internalType: 'contract ISemaphoreVerifier',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'proof',
        internalType: 'struct ISemaphore.SemaphoreProof',
        type: 'tuple',
        components: [
          { name: 'merkleTreeDepth', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleTreeRoot', internalType: 'uint256', type: 'uint256' },
          { name: 'nullifier', internalType: 'uint256', type: 'uint256' },
          { name: 'message', internalType: 'uint256', type: 'uint256' },
          { name: 'scope', internalType: 'uint256', type: 'uint256' },
          { name: 'points', internalType: 'uint256[8]', type: 'uint256[8]' },
        ],
      },
    ],
    name: 'verifyProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const semaphoreAddress = {
  421614: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f',
  11155111: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f',
  11155420: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f',
} as const

/**
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const semaphoreConfig = {
  address: semaphoreAddress,
  abi: semaphoreAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const tokenFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'semaphoreAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'BatchAlreadyProcessed' },
  { type: 'error', inputs: [], name: 'BatchFull' },
  { type: 'error', inputs: [], name: 'BatchInWrongState' },
  { type: 'error', inputs: [], name: 'BatchNotActive' },
  { type: 'error', inputs: [], name: 'BatchNotCompleted' },
  { type: 'error', inputs: [], name: 'BatchNotFound' },
  { type: 'error', inputs: [], name: 'BatchNotFullyInitialized' },
  { type: 'error', inputs: [], name: 'BatchNotFullyProcessed' },
  { type: 'error', inputs: [], name: 'BatchNotInitialized' },
  { type: 'error', inputs: [], name: 'BatchProcessingComplete' },
  { type: 'error', inputs: [], name: 'BatchResultsNotProcessed' },
  { type: 'error', inputs: [], name: 'Create2EmptyBytecode' },
  { type: 'error', inputs: [], name: 'DisputePeriodNotEnded' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  { type: 'error', inputs: [], name: 'FailedToJoinGroup' },
  { type: 'error', inputs: [], name: 'GroupCreationFailed' },
  { type: 'error', inputs: [], name: 'IdentityCommitmentAlreadyUsed' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InsufficientFee' },
  { type: 'error', inputs: [], name: 'InsufficientStakeAmount' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidBatchSize' },
  { type: 'error', inputs: [], name: 'InvalidIdentityCommitment' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'InvalidStateTransition' },
  { type: 'error', inputs: [], name: 'InvalidTokenCount' },
  { type: 'error', inputs: [], name: 'NoStakeFound' },
  { type: 'error', inputs: [], name: 'NoTokensToProcess' },
  { type: 'error', inputs: [], name: 'NotInAnonymousVoting' },
  { type: 'error', inputs: [], name: 'NotInCountingPeriod' },
  { type: 'error', inputs: [], name: 'NotInInitialVoting' },
  { type: 'error', inputs: [], name: 'NotInQueueState' },
  { type: 'error', inputs: [], name: 'NullifierAlreadyUsed' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'PaymentFailed' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'ResultsAlreadyProcessed' },
  { type: 'error', inputs: [], name: 'ResultsAlreadySubmitted' },
  { type: 'error', inputs: [], name: 'ResultsNotFinalized' },
  { type: 'error', inputs: [], name: 'SemaphoreError' },
  { type: 'error', inputs: [], name: 'StakeAlreadyClaimed' },
  { type: 'error', inputs: [], name: 'StateUpdateFailed' },
  { type: 'error', inputs: [], name: 'TokenAlreadyCreated' },
  { type: 'error', inputs: [], name: 'TokenCreationFailed' },
  { type: 'error', inputs: [], name: 'TokenNotAmongWinners' },
  { type: 'error', inputs: [], name: 'TokenNotEligible' },
  { type: 'error', inputs: [], name: 'TokenNotFound' },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'UnauthorizedClaim' },
  { type: 'error', inputs: [], name: 'UnauthorizedResultSubmission' },
  { type: 'error', inputs: [], name: 'VotingNotStarted' },
  { type: 'error', inputs: [], name: 'VotingPeriodEnded' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AnonymousMemberRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'topTokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'voteCounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'totalVotes',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStaked',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AnonymousResultsSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'topTokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'totalVotesProcessed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStaked',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AnonymousResultsSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'userAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountClaimed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AnonymousStakeClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'voteHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'totalStaked',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalVotes',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AnonymousVoteSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'finalTopTokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'finalStakedAmounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'totalProcessedTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStakesCounted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'processingDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchCountingFinalized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'previousState',
        internalType: 'enum TokenFactory.BatchCountingState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'newState',
        internalType: 'enum TokenFactory.BatchCountingState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'processedCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalToProcess',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchCountingStateUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'batchesProcessed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalBatchesNeeded',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'currentTokenIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchInitializationProgress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'oldState',
        internalType: 'enum TokenFactory.BatchState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'newState',
        internalType: 'enum TokenFactory.BatchState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchStateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stakedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'voteHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DecryptedVoteRecorded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'processedTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'remainingTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'currentBatchIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalBatches',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'HeapProcessingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStake',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalVotes',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'InitialVoteSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'imageUrl',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'twitter',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'telegram',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'website',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'creationFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'oldState',
        internalType: 'enum TokenFactory.TokenState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'newState',
        internalType: 'enum TokenFactory.TokenState',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenStateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reason',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'VoteSkipped',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'ANONYMOUS_VOTING_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BASE_TOKEN_CREATION_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BATCH_SIZE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'COUNTING_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DISPUTE_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INITIAL_VOTING_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INIT_CHUNK_SIZE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOKENS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOP_TOKENS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOP_TOKENS_PER_BATCH_FOR_INITIAL_VOTING',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MERKLE_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_STAKE_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OPTIMAL_CHUNKS_PER_TX',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMemberToAnonymousVoting',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'batchCountingStatus',
    outputs: [
      {
        name: '',
        internalType: 'enum TokenFactory.BatchCountingState',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'batchInitProgress',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'batchProgress',
    outputs: [
      { name: 'currentBatchIndex', internalType: 'uint256', type: 'uint256' },
      {
        name: 'heap',
        internalType: 'struct TokenFactory.MaxHeap',
        type: 'tuple',
        components: [
          {
            name: 'heap',
            internalType: 'struct TokenFactory.TopToken[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              {
                name: 'stakedAmount',
                internalType: 'uint256',
                type: 'uint256',
              },
            ],
          },
          { name: 'size', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'batchTokenResults',
    outputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStaked', internalType: 'uint256', type: 'uint256' },
      {
        name: 'state',
        internalType: 'enum TokenFactory.TokenState',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'batchTokenVotes',
    outputs: [
      { name: 'voteAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'claimed', internalType: 'bool', type: 'bool' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'batches',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      {
        name: 'state',
        internalType: 'enum TokenFactory.BatchState',
        type: 'uint8',
      },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'stateUpdatedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'totalVotes', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStaked', internalType: 'uint256', type: 'uint256' },
      { name: 'anonymousTotalVotes', internalType: 'uint256', type: 'uint256' },
      {
        name: 'anonymousTotalStaked',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'resultsSubmitted', internalType: 'bool', type: 'bool' },
      { name: 'anonymousResultsSubmitted', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'checkAndUpdateBatchState',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimAnonymousStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'claimStakedEth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'continueInitialization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct TokenFactory.TokenParams',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'twitter', internalType: 'string', type: 'string' },
          { name: 'telegram', internalType: 'string', type: 'string' },
          { name: 'website', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'createTokenAndVote',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentInitialVotingBatchId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encryptedVotes',
    outputs: [
      { name: 'voteHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'finalizeCounting',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBatchState',
    outputs: [
      {
        name: 'state',
        internalType: 'enum TokenFactory.BatchState',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getTokenState',
    outputs: [
      {
        name: 'state',
        internalType: 'enum TokenFactory.TokenState',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasCreatedTokenInBatch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'initializeBatchCounting',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'nullifierHashes',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchId', internalType: 'uint256', type: 'uint256' }],
    name: 'processNextBatch',
    outputs: [{ name: 'finished', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'resultsProcessed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'semaphore',
    outputs: [
      { name: '', internalType: 'contract ISemaphore', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'semaphoreGroups',
    outputs: [
      { name: '', internalType: 'contract ISemaphoreGroups', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_batchSize', internalType: 'uint256', type: 'uint256' },
      { name: '_initChunkSize', internalType: 'uint256', type: 'uint256' },
      { name: '_optimalChunksPerTx', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBatchParameters',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'tokenResults',
        internalType: 'struct TokenFactory.TokenVoteResult[]',
        type: 'tuple[]',
        components: [
          { name: 'token', internalType: 'address', type: 'address' },
          { name: 'voteCount', internalType: 'uint256', type: 'uint256' },
          { name: 'totalStaked', internalType: 'uint256', type: 'uint256' },
          {
            name: 'state',
            internalType: 'enum TokenFactory.TokenState',
            type: 'uint8',
          },
        ],
      },
    ],
    name: 'submitAnonymousResults',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'proof',
        internalType: 'struct ISemaphore.SemaphoreProof',
        type: 'tuple',
        components: [
          { name: 'merkleTreeDepth', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleTreeRoot', internalType: 'uint256', type: 'uint256' },
          { name: 'nullifier', internalType: 'uint256', type: 'uint256' },
          { name: 'message', internalType: 'uint256', type: 'uint256' },
          { name: 'scope', internalType: 'uint256', type: 'uint256' },
          { name: 'points', internalType: 'uint256[8]', type: 'uint256[8]' },
        ],
      },
      { name: 'voteHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'submitAnonymousVote',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'votes',
        internalType: 'struct TokenFactory.DecryptedVote[]',
        type: 'tuple[]',
        components: [
          {
            name: 'identityCommitment',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'userAddress', internalType: 'address', type: 'address' },
          { name: 'votedToken', internalType: 'address', type: 'address' },
          { name: 'stakedAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'voteHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'claimed', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'submitDecryptedVotesBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenBatches',
    outputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'endIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'processed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'tokenStates',
    outputs: [
      { name: '', internalType: 'enum TokenFactory.TokenState', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'tokenTotalStakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'usedIdentityCommitments',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'userTotalStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'voteWithEth',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'voterDecryptedVotes',
    outputs: [
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
      { name: 'userAddress', internalType: 'address', type: 'address' },
      { name: 'votedToken', internalType: 'address', type: 'address' },
      { name: 'stakedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'voteHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'claimed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const tokenFactoryAddress = {
  421614: '0x771f76DF1751eFCb5e3bEfb8D744555DA9157f36',
} as const

/**
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const tokenFactoryConfig = {
  address: tokenFactoryAddress,
  abi: tokenFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphore = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"getGroupAdmin"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGetGroupAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'getGroupAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"getMerkleTreeDepth"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGetMerkleTreeDepth =
  /*#__PURE__*/ createUseReadContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'getMerkleTreeDepth',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"getMerkleTreeRoot"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGetMerkleTreeRoot =
  /*#__PURE__*/ createUseReadContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'getMerkleTreeRoot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"getMerkleTreeSize"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGetMerkleTreeSize =
  /*#__PURE__*/ createUseReadContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'getMerkleTreeSize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"groupCounter"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGroupCounter = /*#__PURE__*/ createUseReadContract(
  {
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'groupCounter',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"groups"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreGroups = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'groups',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"hasMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreHasMember = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'hasMember',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"indexOf"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreIndexOf = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'indexOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"verifier"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreVerifier = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'verifier',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"verifyProof"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useReadSemaphoreVerifyProof = /*#__PURE__*/ createUseReadContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'verifyProof',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphore = /*#__PURE__*/ createUseWriteContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"acceptGroupAdmin"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreAcceptGroupAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'acceptGroupAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"addMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreAddMember = /*#__PURE__*/ createUseWriteContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
  functionName: 'addMember',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"addMembers"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreAddMembers = /*#__PURE__*/ createUseWriteContract(
  { abi: semaphoreAbi, address: semaphoreAddress, functionName: 'addMembers' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"createGroup"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreCreateGroup =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'createGroup',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"removeMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreRemoveMember =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'removeMember',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateGroupAdmin"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreUpdateGroupAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateGroupAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateGroupMerkleTreeDuration"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreUpdateGroupMerkleTreeDuration =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateGroupMerkleTreeDuration',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreUpdateMember =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateMember',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"validateProof"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWriteSemaphoreValidateProof =
  /*#__PURE__*/ createUseWriteContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'validateProof',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphore = /*#__PURE__*/ createUseSimulateContract({
  abi: semaphoreAbi,
  address: semaphoreAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"acceptGroupAdmin"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreAcceptGroupAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'acceptGroupAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"addMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreAddMember =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'addMember',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"addMembers"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreAddMembers =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'addMembers',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"createGroup"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreCreateGroup =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'createGroup',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"removeMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreRemoveMember =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'removeMember',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateGroupAdmin"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreUpdateGroupAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateGroupAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateGroupMerkleTreeDuration"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreUpdateGroupMerkleTreeDuration =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateGroupMerkleTreeDuration',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"updateMember"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreUpdateMember =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'updateMember',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link semaphoreAbi}__ and `functionName` set to `"validateProof"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useSimulateSemaphoreValidateProof =
  /*#__PURE__*/ createUseSimulateContract({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    functionName: 'validateProof',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: semaphoreAbi, address: semaphoreAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"GroupAdminPending"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreGroupAdminPendingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'GroupAdminPending',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"GroupAdminUpdated"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreGroupAdminUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'GroupAdminUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"GroupCreated"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreGroupCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'GroupCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"GroupMerkleTreeDurationUpdated"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreGroupMerkleTreeDurationUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'GroupMerkleTreeDurationUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"MemberAdded"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreMemberAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'MemberAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"MemberRemoved"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreMemberRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'MemberRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"MemberUpdated"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreMemberUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'MemberUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"MembersAdded"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreMembersAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'MembersAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link semaphoreAbi}__ and `eventName` set to `"ProofValidated"`
 *
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f)
 */
export const useWatchSemaphoreProofValidatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: semaphoreAbi,
    address: semaphoreAddress,
    eventName: 'ProofValidated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactory = /*#__PURE__*/ createUseReadContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"ANONYMOUS_VOTING_DURATION"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryAnonymousVotingDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'ANONYMOUS_VOTING_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"BASE_TOKEN_CREATION_FEE"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBaseTokenCreationFee =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'BASE_TOKEN_CREATION_FEE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"BATCH_SIZE"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchSize = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'BATCH_SIZE',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"COUNTING_DURATION"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryCountingDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'COUNTING_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"DISPUTE_DURATION"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryDisputeDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'DISPUTE_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"INITIAL_VOTING_DURATION"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryInitialVotingDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'INITIAL_VOTING_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"INIT_CHUNK_SIZE"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryInitChunkSize =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'INIT_CHUNK_SIZE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"MAX_TOKENS"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryMaxTokens = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'MAX_TOKENS',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"MAX_TOP_TOKENS"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryMaxTopTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'MAX_TOP_TOKENS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"MAX_TOP_TOKENS_PER_BATCH_FOR_INITIAL_VOTING"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryMaxTopTokensPerBatchForInitialVoting =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'MAX_TOP_TOKENS_PER_BATCH_FOR_INITIAL_VOTING',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"MERKLE_DURATION"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryMerkleDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'MERKLE_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"MIN_STAKE_AMOUNT"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryMinStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'MIN_STAKE_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"OPTIMAL_CHUNKS_PER_TX"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryOptimalChunksPerTx =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'OPTIMAL_CHUNKS_PER_TX',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batchCountingStatus"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchCountingStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'batchCountingStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batchInitProgress"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchInitProgress =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'batchInitProgress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batchProgress"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchProgress =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'batchProgress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batchTokenResults"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchTokenResults =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'batchTokenResults',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batchTokenVotes"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatchTokenVotes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'batchTokenVotes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"batches"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryBatches = /*#__PURE__*/ createUseReadContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
  functionName: 'batches',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"currentInitialVotingBatchId"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryCurrentInitialVotingBatchId =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'currentInitialVotingBatchId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"encryptedVotes"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryEncryptedVotes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'encryptedVotes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"getBatchState"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryGetBatchState =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'getBatchState',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"getTokenState"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryGetTokenState =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'getTokenState',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"hasCreatedTokenInBatch"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryHasCreatedTokenInBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'hasCreatedTokenInBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"nullifierHashes"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryNullifierHashes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'nullifierHashes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryPaused = /*#__PURE__*/ createUseReadContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"resultsProcessed"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryResultsProcessed =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'resultsProcessed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"semaphore"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactorySemaphore = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'semaphore',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"semaphoreGroups"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactorySemaphoreGroups =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'semaphoreGroups',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"tokenBatches"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryTokenBatches =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'tokenBatches',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"tokenStates"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryTokenStates =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'tokenStates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"tokenTotalStakes"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryTokenTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'tokenTotalStakes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"usedIdentityCommitments"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryUsedIdentityCommitments =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'usedIdentityCommitments',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"userTotalStake"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryUserTotalStake =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'userTotalStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"voterDecryptedVotes"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useReadTokenFactoryVoterDecryptedVotes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'voterDecryptedVotes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactory = /*#__PURE__*/ createUseWriteContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"addMemberToAnonymousVoting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryAddMemberToAnonymousVoting =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'addMemberToAnonymousVoting',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"checkAndUpdateBatchState"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryCheckAndUpdateBatchState =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'checkAndUpdateBatchState',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"claimAnonymousStake"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryClaimAnonymousStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'claimAnonymousStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"claimStakedEth"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryClaimStakedEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'claimStakedEth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"continueInitialization"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryContinueInitialization =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'continueInitialization',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"createTokenAndVote"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryCreateTokenAndVote =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'createTokenAndVote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"finalizeCounting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryFinalizeCounting =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'finalizeCounting',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"initializeBatchCounting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryInitializeBatchCounting =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'initializeBatchCounting',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryPause = /*#__PURE__*/ createUseWriteContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"processNextBatch"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryProcessNextBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'processNextBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"setBatchParameters"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactorySetBatchParameters =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'setBatchParameters',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitAnonymousResults"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactorySubmitAnonymousResults =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitAnonymousResults',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitAnonymousVote"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactorySubmitAnonymousVote =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitAnonymousVote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitDecryptedVotesBatch"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactorySubmitDecryptedVotesBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitDecryptedVotesBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryUnpause = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'unpause',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"voteWithEth"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWriteTokenFactoryVoteWithEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'voteWithEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenFactoryAbi,
  address: tokenFactoryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"addMemberToAnonymousVoting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryAddMemberToAnonymousVoting =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'addMemberToAnonymousVoting',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"checkAndUpdateBatchState"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryCheckAndUpdateBatchState =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'checkAndUpdateBatchState',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"claimAnonymousStake"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryClaimAnonymousStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'claimAnonymousStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"claimStakedEth"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryClaimStakedEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'claimStakedEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"continueInitialization"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryContinueInitialization =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'continueInitialization',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"createTokenAndVote"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryCreateTokenAndVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'createTokenAndVote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"finalizeCounting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryFinalizeCounting =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'finalizeCounting',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"initializeBatchCounting"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryInitializeBatchCounting =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'initializeBatchCounting',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"processNextBatch"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryProcessNextBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'processNextBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"setBatchParameters"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactorySetBatchParameters =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'setBatchParameters',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitAnonymousResults"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactorySubmitAnonymousResults =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitAnonymousResults',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitAnonymousVote"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactorySubmitAnonymousVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitAnonymousVote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"submitDecryptedVotesBatch"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactorySubmitDecryptedVotesBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'submitDecryptedVotesBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFactoryAbi}__ and `functionName` set to `"voteWithEth"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useSimulateTokenFactoryVoteWithEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    functionName: 'voteWithEth',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"AnonymousMemberRegistered"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryAnonymousMemberRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'AnonymousMemberRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"AnonymousResultsSubmitted"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryAnonymousResultsSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'AnonymousResultsSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"AnonymousStakeClaimed"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryAnonymousStakeClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'AnonymousStakeClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"AnonymousVoteSubmitted"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryAnonymousVoteSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'AnonymousVoteSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"BatchCountingFinalized"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryBatchCountingFinalizedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'BatchCountingFinalized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"BatchCountingStateUpdate"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryBatchCountingStateUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'BatchCountingStateUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"BatchInitializationProgress"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryBatchInitializationProgressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'BatchInitializationProgress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"BatchStateUpdated"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryBatchStateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'BatchStateUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"DecryptedVoteRecorded"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryDecryptedVoteRecordedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'DecryptedVoteRecorded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"HeapProcessingUpdate"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryHeapProcessingUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'HeapProcessingUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"InitialVoteSubmitted"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryInitialVoteSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'InitialVoteSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"StakeClaimed"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryStakeClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'StakeClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"StakeWithdrawn"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryStakeWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'StakeWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"TokenCreated"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryTokenCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'TokenCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"TokenStateUpdated"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryTokenStateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'TokenStateUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFactoryAbi}__ and `eventName` set to `"VoteSkipped"`
 *
 * [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x771f76df1751efcb5e3befb8d744555da9157f36)
 */
export const useWatchTokenFactoryVoteSkippedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFactoryAbi,
    address: tokenFactoryAddress,
    eventName: 'VoteSkipped',
  })
