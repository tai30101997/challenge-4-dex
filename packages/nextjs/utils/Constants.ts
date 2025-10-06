// Strk
const universalStrkAddress =
  "0x4718F5A0FC34CC1AF16A1CDEE98FFB20C31F5CD61D6AB07201858F4287C938D" as const;

const sepoliaMainnetStrkClassHash =
  "0x04ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b" as const;

const devnetStrkClassHash =
  "0x76791EF97C042F81FBF352AD95F39A22554EE8D7927B2CE3C681F3418B5206A" as const;

const strkAbi = [
  {
    type: "impl",
    name: "LockingContract",
    interface_name: "src::mintable_lock_interface::ILockingContract",
  },
  {
    type: "interface",
    name: "src::mintable_lock_interface::ILockingContract",
    items: [
      {
        type: "function",
        name: "set_locking_contract",
        inputs: [
          {
            name: "locking_contract",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_locking_contract",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "LockAndDelegate",
    interface_name: "src::mintable_lock_interface::ILockAndDelegate",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "interface",
    name: "src::mintable_lock_interface::ILockAndDelegate",
    items: [
      {
        type: "function",
        name: "lock_and_delegate",
        inputs: [
          {
            name: "delegatee",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "lock_and_delegate_by_sig",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "delegatee",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "nonce",
            type: "core::felt252",
          },
          {
            name: "expiry",
            type: "core::integer::u64",
          },
          {
            name: "signature",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "MintableToken",
    interface_name: "src::mintable_token_interface::IMintableToken",
  },
  {
    type: "interface",
    name: "src::mintable_token_interface::IMintableToken",
    items: [
      {
        type: "function",
        name: "permissioned_mint",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "permissioned_burn",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "MintableTokenCamelImpl",
    interface_name: "src::mintable_token_interface::IMintableTokenCamel",
  },
  {
    type: "interface",
    name: "src::mintable_token_interface::IMintableTokenCamel",
    items: [
      {
        type: "function",
        name: "permissionedMint",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "permissionedBurn",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "Replaceable",
    interface_name: "src::replaceability_interface::IReplaceable",
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    type: "struct",
    name: "src::replaceability_interface::EICData",
    members: [
      {
        name: "eic_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "eic_init_data",
        type: "core::array::Span::<core::felt252>",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<src::replaceability_interface::EICData>",
    variants: [
      {
        name: "Some",
        type: "src::replaceability_interface::EICData",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "src::replaceability_interface::ImplementationData",
    members: [
      {
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "eic_data",
        type: "core::option::Option::<src::replaceability_interface::EICData>",
      },
      {
        name: "final",
        type: "core::bool",
      },
    ],
  },
  {
    type: "interface",
    name: "src::replaceability_interface::IReplaceable",
    items: [
      {
        type: "function",
        name: "get_upgrade_delay",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_impl_activation_time",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "add_new_implementation",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_implementation",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "replace_to",
        inputs: [
          {
            name: "implementation_data",
            type: "src::replaceability_interface::ImplementationData",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "AccessControlImplExternal",
    interface_name: "src::access_control_interface::IAccessControl",
  },
  {
    type: "interface",
    name: "src::access_control_interface::IAccessControl",
    items: [
      {
        type: "function",
        name: "has_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_role_admin",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "RolesImpl",
    interface_name: "src::roles_interface::IMinimalRoles",
  },
  {
    type: "interface",
    name: "src::roles_interface::IMinimalRoles",
    items: [
      {
        type: "function",
        name: "is_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "register_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_governance_admin",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "register_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_upgrade_governor",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC20Impl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20",
  },
  {
    type: "interface",
    name: "openzeppelin::token::erc20::interface::IERC20",
    items: [
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "total_supply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC20CamelOnlyImpl",
    interface_name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
  },
  {
    type: "interface",
    name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
    items: [
      {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "sender",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "symbol",
        type: "core::felt252",
      },
      {
        name: "decimals",
        type: "core::integer::u8",
      },
      {
        name: "initial_supply",
        type: "core::integer::u256",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "permitted_minter",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "provisional_governance_admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "upgrade_delay",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "function",
    name: "increase_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "added_value",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "decrease_allowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "subtracted_value",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "addedValue",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "subtractedValue",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "event",
    name: "src::strk::erc20_lockable::ERC20Lockable::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::strk::erc20_lockable::ERC20Lockable::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "value",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationAdded",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationRemoved",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationReplaced",
    kind: "struct",
    members: [
      {
        name: "implementation_data",
        type: "src::replaceability_interface::ImplementationData",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::replaceability_interface::ImplementationFinalized",
    kind: "struct",
    members: [
      {
        name: "impl_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleGranted",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleRevoked",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::access_control_interface::RoleAdminChanged",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "previous_admin_role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "new_admin_role",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::GovernanceAdminAdded",
    kind: "struct",
    members: [
      {
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::GovernanceAdminRemoved",
    kind: "struct",
    members: [
      {
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::UpgradeGovernorAdded",
    kind: "struct",
    members: [
      {
        name: "added_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::roles_interface::UpgradeGovernorRemoved",
    kind: "struct",
    members: [
      {
        name: "removed_account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "src::strk::erc20_lockable::ERC20Lockable::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "src::strk::erc20_lockable::ERC20Lockable::Transfer",
        kind: "nested",
      },
      {
        name: "Approval",
        type: "src::strk::erc20_lockable::ERC20Lockable::Approval",
        kind: "nested",
      },
      {
        name: "ImplementationAdded",
        type: "src::replaceability_interface::ImplementationAdded",
        kind: "nested",
      },
      {
        name: "ImplementationRemoved",
        type: "src::replaceability_interface::ImplementationRemoved",
        kind: "nested",
      },
      {
        name: "ImplementationReplaced",
        type: "src::replaceability_interface::ImplementationReplaced",
        kind: "nested",
      },
      {
        name: "ImplementationFinalized",
        type: "src::replaceability_interface::ImplementationFinalized",
        kind: "nested",
      },
      {
        name: "RoleGranted",
        type: "src::access_control_interface::RoleGranted",
        kind: "nested",
      },
      {
        name: "RoleRevoked",
        type: "src::access_control_interface::RoleRevoked",
        kind: "nested",
      },
      {
        name: "RoleAdminChanged",
        type: "src::access_control_interface::RoleAdminChanged",
        kind: "nested",
      },
      {
        name: "GovernanceAdminAdded",
        type: "src::roles_interface::GovernanceAdminAdded",
        kind: "nested",
      },
      {
        name: "GovernanceAdminRemoved",
        type: "src::roles_interface::GovernanceAdminRemoved",
        kind: "nested",
      },
      {
        name: "UpgradeGovernorAdded",
        type: "src::roles_interface::UpgradeGovernorAdded",
        kind: "nested",
      },
      {
        name: "UpgradeGovernorRemoved",
        type: "src::roles_interface::UpgradeGovernorRemoved",
        kind: "nested",
      },
    ],
  },
] as const;
const DexAbi = [
  {
    type: "impl",
    name: "DexImpl",
    interface_name: "contracts::dex::IDex",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "interface",
    name: "contracts::dex::IDex",
    items: [
      {
        type: "function",
        name: "init",
        inputs: [
          {
            name: "tokens",
            type: "core::integer::u256",
          },
          {
            name: "strk",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "price",
        inputs: [
          {
            name: "x_input",
            type: "core::integer::u256",
          },
          {
            name: "x_reserves",
            type: "core::integer::u256",
          },
          {
            name: "y_reserves",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_liquidity",
        inputs: [
          {
            name: "lp_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_total_liquidity",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "strk_to_token",
        inputs: [
          {
            name: "strk_input",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "token_to_strk",
        inputs: [
          {
            name: "token_input",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "deposit",
        inputs: [
          {
            name: "strk_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_deposit_token_amount",
        inputs: [
          {
            name: "strk_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "withdraw",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableImpl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable",
  },
  {
    type: "interface",
    name: "openzeppelin_access::ownable::interface::IOwnable",
    items: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "strk_token_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested",
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::dex::Dex::LiquidityProvided",
    kind: "struct",
    members: [
      {
        name: "liquidity_provider",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "liquidity_minted",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "strk_input",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "tokens_input",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::dex::Dex::LiquidityRemoved",
    kind: "struct",
    members: [
      {
        name: "liquidity_remover",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "liquidity_withdrawn",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "tokens_output",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "strk_output",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::dex::Dex::StrkToTokenSwap",
    kind: "struct",
    members: [
      {
        name: "swapper",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "token_output",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "strk_input",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::dex::Dex::TokenToStrkSwap",
    kind: "struct",
    members: [
      {
        name: "swapper",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "tokens_input",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "strk_output",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::dex::Dex::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        kind: "flat",
      },
      {
        name: "LiquidityProvided",
        type: "contracts::dex::Dex::LiquidityProvided",
        kind: "nested",
      },
      {
        name: "LiquidityRemoved",
        type: "contracts::dex::Dex::LiquidityRemoved",
        kind: "nested",
      },
      {
        name: "StrkToTokenSwap",
        type: "contracts::dex::Dex::StrkToTokenSwap",
        kind: "nested",
      },
      {
        name: "TokenToStrkSwap",
        type: "contracts::dex::Dex::TokenToStrkSwap",
        kind: "nested",
      },
    ],
  },
] as const;
const BalloonAbi = [
  {
    "type": "impl",
    "name": "IBalloonsImpl",
    "interface_name": "openzeppelin_token::erc20::interface::IERC20"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc20::interface::IERC20",
    "items": [
      {
        "type": "function",
        "name": "total_supply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "allowance",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "sender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC20MetadataImpl",
    "interface_name": "openzeppelin_token::erc20::interface::IERC20Metadata"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc20::interface::IERC20Metadata",
    "items": [
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "initial_supply",
        "type": "core::integer::u256"
      },
      {
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "spender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc20::erc20::ERC20Component::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Transfer",
        "type": "openzeppelin_token::erc20::erc20::ERC20Component::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "openzeppelin_token::erc20::erc20::ERC20Component::Approval",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "contracts::balloons::Balloons::ApproveBalloon",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "spender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "contracts::balloons::Balloons::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ERC20Event",
        "type": "openzeppelin_token::erc20::erc20::ERC20Component::Event",
        "kind": "flat"
      },
      {
        "name": "ApproveBalloon",
        "type": "contracts::balloons::Balloons::ApproveBalloon",
        "kind": "nested"
      }
    ]
  }
] as const;
export const LAST_CONNECTED_TIME_LOCALSTORAGE_KEY = "lastConnectedTime";

export {
  devnetStrkClassHash,
  universalStrkAddress,
  sepoliaMainnetStrkClassHash,
  strkAbi,
  DexAbi,
  BalloonAbi
};
