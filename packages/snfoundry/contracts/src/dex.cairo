use starknet::ContractAddress;
#[starknet::interface]
pub trait IDex<TContractState> {
    /// Initializes the DEX with the specified amounts of tokens and STRK.
    ///
    /// Args:
    ///     self: The contract state.
    ///     tokens: The amount of tokens to initialize the DEX with.
    ///     strk: The amount of STRK to initialize the DEX with.
    ///
    /// Returns:
    ///     (u256, u256): The amounts of tokens and STRK initialized.
    fn init(ref self: TContractState, tokens: u256, strk: u256) -> (u256, u256);

    /// Calculates the price based on the input amount and reserves.
    ///
    /// Args:
    ///     self: The contract state.
    ///     x_input: The input amount of tokens.
    ///     x_reserves: The reserve amount of tokens.
    ///     y_reserves: The reserve amount of STRK.
    ///
    /// Returns:
    ///     u256: The output amount of STRK.
    fn price(self: @TContractState, x_input: u256, x_reserves: u256, y_reserves: u256) -> u256;

    /// Returns the liquidity for the specified address.
    ///
    /// Args:
    ///     self: The contract state.
    ///     lp_address: The address of the liquidity provider.
    ///
    /// Returns:
    ///     u256: The liquidity amount.
    fn get_liquidity(self: @TContractState, lp_address: ContractAddress) -> u256;

    /// Returns the total liquidity in the DEX.
    ///
    /// Args:
    ///     self: The contract state.
    ///
    /// Returns:
    ///     u256: The total liquidity amount.
    fn get_total_liquidity(self: @TContractState) -> u256;

    /// Swaps STRK for tokens.
    ///
    /// Args:
    ///     self: The contract state.
    ///     strk_input: The amount of STRK to swap.
    ///
    /// Returns:
    ///     u256: The amount of tokens received.
    fn strk_to_token(ref self: TContractState, strk_input: u256) -> u256;

    /// Swaps tokens for STRK.
    ///
    /// Args:
    ///     self: The contract state.
    ///     token_input: The amount of tokens to swap.
    ///
    /// Returns:
    ///     u256: The amount of STRK received.
    fn token_to_strk(ref self: TContractState, token_input: u256) -> u256;

    /// Deposits STRK and tokens into the liquidity pool.
    ///
    /// Args:
    ///     self: The contract state.
    ///     strk_amount: The amount of STRK to deposit.
    ///
    /// Returns:
    ///     u256: The amount of liquidity minted.
    fn deposit(ref self: TContractState, strk_amount: u256) -> u256;

    /// get deposit token amount when deposit strk_amount STRK.
    ///
    /// Args:
    ///     self: The contract state.
    ///     strk_amount: The amount of STRK to deposit.
    ///
    /// Returns:
    ///     u256: The token amount of the deposit.
    fn get_deposit_token_amount(self: @TContractState, strk_amount: u256) -> u256;

    /// Withdraws STRK and tokens from the liquidity pool.
    ///
    /// Args:
    ///     self: The contract state.
    ///     amount: The amount of liquidity to withdraw.
    ///
    /// Returns:
    ///     (u256, u256): The amounts of STRK and tokens withdrawn.
    fn withdraw(ref self: TContractState, amount: u256) -> (u256, u256);
}

#[starknet::contract]
mod Dex {
    use contracts::balloons::{IBalloonsDispatcher, IBalloonsDispatcherTrait};
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use super::IDex;
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    const TokensPerStrk: u256 = 100;
    use crate::errors::{
        ALREADY_INITIALIZED, INSUFFICIENT_LIQUIDITY, INSUFFICIENT_STRK, INSUFFICIENT_TOKENS,
        INVALID_DEPOSIT, INVALID_SWAP, INVALID_WITHDRAWAL,
    };
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        strk_token: IERC20Dispatcher,
        token: IBalloonsDispatcher,
        total_liquidity: u256,
        liquidity: Map<ContractAddress, u256>,
    }

    // Todo Checkpoint 4:  Define the events.
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        LiquidityProvided: LiquidityProvided,
        LiquidityRemoved: LiquidityRemoved,
        StrkToTokenSwap: StrkToTokenSwap,
        TokenToStrkSwap: TokenToStrkSwap,
    }

    /// Event emitted when a STRK to token swap occurs.
    #[derive(Drop, starknet::Event)]
    struct StrkToTokenSwap {
        swapper: ContractAddress,
        token_output: u256,
        strk_input: u256,
    }

    /// Event emitted when a token to STRK swap occurs.
    #[derive(Drop, starknet::Event)]
    struct TokenToStrkSwap {
        swapper: ContractAddress,
        tokens_input: u256,
        strk_output: u256,
    }

    /// Event emitted when liquidity is provided to the DEX.
    #[derive(Drop, starknet::Event)]
    struct LiquidityProvided {
        liquidity_provider: ContractAddress,
        liquidity_minted: u256,
        strk_input: u256,
        tokens_input: u256,
    }

    /// Event emitted when liquidity is removed from the DEX.
    #[derive(Drop, starknet::Event)]
    struct LiquidityRemoved {
        liquidity_remover: ContractAddress,
        liquidity_withdrawn: u256,
        tokens_output: u256,
        strk_output: u256,
    }

    /// Constructor for the Dex contract.
    ///
    /// Initializes the contract with the specified STRK and token addresses.
    ///
    /// Args:
    ///     self: The contract state.
    ///     strk_token_address: The address of the STRK token contract.
    ///     token_address: The address of the token contract.
    #[constructor]
    fn constructor(
        ref self: ContractState,
        strk_token_address: ContractAddress,
        token_address: ContractAddress,
        owner: ContractAddress,
    ) {
        self.ownable.initializer(owner);
        self.strk_token.write(IERC20Dispatcher { contract_address: strk_token_address });
        self.token.write(IBalloonsDispatcher { contract_address: token_address });
    }

    #[abi(embed_v0)]
    impl DexImpl of IDex<ContractState> {
        // Todo Checkpoint 2:  Implement your function init here.
        /// Initializes the DEX with the specified amounts of tokens and STRK.
        ///
        /// Args:
        ///     self: The contract state.
        ///     tokens: The amount of tokens to initialize the DEX with.
        ///     strk: The amount of STRK to initialize the DEX with.
        ///
        /// Returns:
        ///     (u256, u256): The amounts of tokens and STRK initialized.
        fn init(ref self: ContractState, tokens: u256, strk: u256) -> (u256, u256) {
            let caller: ContractAddress = get_caller_address();
            //  Prevent multiple initialization
            let current_liquidity = self.total_liquidity.read();
            assert(current_liquidity == 0, ALREADY_INITIALIZED);

            //  Minimum liquidity
            let min_liquidity: u256 = 5_000000000000000000; // 10 * 1e18
            assert(strk >= min_liquidity, INSUFFICIENT_STRK);
            assert(tokens >= min_liquidity, INSUFFICIENT_TOKENS);

            //  Check caller balance
            let caller_balance = self.token.read().balance_of(caller);
            assert(caller_balance >= tokens, INSUFFICIENT_TOKENS);

            // Transfer tokens from caller → DEX
            let balloons = self.token.read();
            let strk_token = self.strk_token.read();

            balloons.transfer_from(caller, get_contract_address(), tokens);
            strk_token.transfer_from(caller, get_contract_address(), strk);

            // Update liquidity mappings
            self.total_liquidity.write(strk); // 
            self.liquidity.write(caller, strk);

            // Return values for verification
            return (tokens, strk);
        }

        // Todo Checkpoint 3:  Implement your function price here.
        /// Calculates the price based on the input amount and reserves.
        ///
        /// Args:
        ///     self: The contract state.
        ///     x_input: The input amount of tokens.
        ///     x_reserves: The reserve amount of tokens.
        ///     y_reserves: The reserve amount of STRK.
        ///
        /// Returns:
        ///     u256: The output amount of STRK.
        fn price(self: @ContractState, x_input: u256, x_reserves: u256, y_reserves: u256) -> u256 {
            let fee_numerator: u256 = 997; //  0.3% trading fee (1000 - 997 = 3)
            let fee_denominator: u256 = 1000; //Base denominator for fee calculation
            // Adjust input amount with fee
            let x_input_with_fee = x_input * fee_numerator;
            // Calculate output using the AMM constant product formula
            let numerator = y_reserves * x_input_with_fee;
            let denominator = (x_reserves * fee_denominator) + x_input_with_fee;

            return (numerator / denominator);
        }

        // Todo Checkpoint 5:  Implement your function get_liquidity here.
        /// Returns the liquidity for the specified address.
        ///
        /// Args:
        ///     self: The contract state.
        ///     lp_address: The address of the liquidity provider.
        ///
        /// Returns:
        ///     u256: The liquidity amount.
        fn get_liquidity(self: @ContractState, lp_address: ContractAddress) -> u256 {
            self.liquidity.read(lp_address)
        }

        // Todo Checkpoint 5:  Implement your function get_total_liquidity here.
        /// Returns the total liquidity in the DEX.
        ///
        /// Args:
        ///     self: The contract state.
        ///
        /// Returns:
        ///     u256: The total liquidity amount.
        fn get_total_liquidity(self: @ContractState) -> u256 {
            self.total_liquidity.read()
        }

        // Todo Checkpoint 4:  Implement your function strk_to_token here.
        /// Swaps STRK for tokens.
        ///
        /// Args:
        ///     self: The contract state.
        ///     strk_input: The amount of STRK to swap.
        ///
        /// Returns:
        ///     u256: The amount of tokens received.
        fn strk_to_token(ref self: ContractState, strk_input: u256) -> u256 {
            //  Get the caller (the user executing the swap)
            let caller = get_caller_address();

            // Validate input: must be greater than zero
            assert(strk_input > 0, INVALID_SWAP);

            // Read token dispatchers (STRK + Balloon)
            let strk_token = self.strk_token.read();
            let balloon_token = self.token.read();

            // Get current reserves in the pool
            let strk_reserves = strk_token.balance_of(get_contract_address());
            let token_reserves = balloon_token.balance_of(get_contract_address());

            // Compute token output using the shared price() function
            let token_output = self.price(strk_input, strk_reserves, token_reserves);
            //  Transfer STRK from user → DEX
            strk_token.transfer_from(caller, get_contract_address(), strk_input);
            // Transfer BAL from DEX → user
            balloon_token.transfer(caller, token_output);

            // Emit event for frontend tracking
            self
                .emit(
                    Event::StrkToTokenSwap(
                        StrkToTokenSwap { swapper: caller, token_output, strk_input },
                    ),
                );

            // Return how many BAL tokens were received
            return token_output;
        }

        // Todo Checkpoint 4:  Implement your function token_to_strk here.
        /// Swaps tokens for STRK.
        ///
        /// Args:
        ///     self: The contract state.
        ///     token_input: The amount of tokens to swap.
        ///
        /// Returns:
        ///     u256: The amount of STRK received.
        fn token_to_strk(ref self: ContractState, token_input: u256) -> u256 {
            //  Get the caller (the user executing the swap)
            let caller = get_caller_address();

            // Validate input: must be greater than zero
            assert(token_input > 0, INVALID_SWAP);

            // Read token dispatchers (STRK + Balloon)
            let strk_token = self.strk_token.read();
            let balloon_token = self.token.read();

            // Get current reserves in the pool
            let strk_reserves = strk_token.balance_of(get_contract_address());
            let token_reserves = balloon_token.balance_of(get_contract_address());

            // Compute STRK output using the shared price() function
            let strk_output = self.price(token_input, token_reserves, strk_reserves);
            //  Transfer BAL from user → DEX
            balloon_token.transfer_from(caller, get_contract_address(), token_input);
            // Transfer STRK from DEX → user
            strk_token.transfer(caller, strk_output);

            // Emit event for frontend tracking
            self
                .emit(
                    Event::TokenToStrkSwap(
                        TokenToStrkSwap { swapper: caller, tokens_input: token_input, strk_output },
                    ),
                );

            // Return how many STRK tokens were received
            return strk_output;
        }

        // Todo Checkpoint 5:  Implement your function deposit here.
        /// Deposits STRK and tokens into the liquidity pool.
        ///
        /// Args:
        ///     self: The contract state.
        ///     strk_amount: The amount of STRK to deposit.
        ///
        /// Returns:
        ///     u256: The amount of liquidity minted.
        fn deposit(ref self: ContractState, strk_amount: u256) -> u256 {
            // Get the caller
            let caller = get_caller_address();
            // Validate input: must be greater than zero
            assert(strk_amount > 0, INVALID_DEPOSIT);
            let strk_token = self.strk_token.read();
            let balloon_token = self.token.read();

            let token_amount = self.get_deposit_token_amount(strk_amount) + 1;
            // Check if the caller has enough tokens
            let caller_token_balance = balloon_token.balance_of(caller);
            assert(caller_token_balance >= token_amount, INSUFFICIENT_TOKENS);
            // Transfer STRK and tokens from caller to DEX
            strk_token.transfer_from(caller, get_contract_address(), strk_amount);
            balloon_token.transfer_from(caller, get_contract_address(), token_amount);
            // Calculate liquidity to mint
            let strk_reserves = strk_token.balance_of(get_contract_address());
            let total_liquidity = self.total_liquidity.read();
            let liquidity_minted = (strk_amount * total_liquidity) / strk_reserves;
            // Update liquidity mappings
            let caller_liquidity = self.liquidity.read(caller);
            self.liquidity.write(caller, caller_liquidity + liquidity_minted);
            self.total_liquidity.write(total_liquidity + liquidity_minted);
            // Emit event for frontend tracking
            self
                .emit(
                    Event::LiquidityProvided(
                        LiquidityProvided {
                            liquidity_provider: caller,
                            liquidity_minted,
                            strk_input: strk_amount,
                            tokens_input: token_amount,
                        },
                    ),
                );
            // Return the amount of liquidity minted
            return liquidity_minted;
        }

        // Todo Checkpoint 5:  Implement your function get_deposit_token_amount here.
        /// get deposit token amount when deposit strk_amount STRK.
        ///
        /// Args:
        ///     self: The contract state.
        ///     strk_amount: The amount of STRK to deposit.
        ///
        /// Returns:
        ///     u256: The token_amount of deposit.
        fn get_deposit_token_amount(self: @ContractState, strk_amount: u256) -> u256 {
            let strk_token = self.strk_token.read();
            let balloon_token = self.token.read();
            let strk_reserves = strk_token.balance_of(get_contract_address());
            let token_reserves = balloon_token.balance_of(get_contract_address());
            return (strk_amount * token_reserves) / strk_reserves;
        }

        // Todo Checkpoint 5:  Implement your function withdraw here.
        /// Withdraws STRK and tokens from the liquidity pool.
        ///
        /// Args:
        ///     self: The contract state.
        ///     amount: The amount of liquidity to withdraw.
        ///
        /// Returns:
        ///     (u256, u256): The amounts of STRK and tokens withdrawn.
        fn withdraw(ref self: ContractState, amount: u256) -> (u256, u256) {
            //  Get the caller (the user executing the swap)
            let caller = get_caller_address();
            // Validate input: must be greater than zero
            assert(amount > 0, INVALID_WITHDRAWAL);
            let total_liquidity = self.total_liquidity.read();
            let caller_liquidity = self.liquidity.read(caller);
            // Check if the caller has enough liquidity
            assert(caller_liquidity >= amount, INSUFFICIENT_LIQUIDITY);
            let strk_token = self.strk_token.read();
            let balloon_token = self.token.read();
            let strk_reserves = strk_token.balance_of(get_contract_address());
            let token_reserves = balloon_token.balance_of(get_contract_address());
            // Calculate amounts to withdraw
            let strk_amount = (amount * strk_reserves) / total_liquidity;
            let token_amount = (amount * token_reserves) / total_liquidity;
            // Update liquidity mappings
            self.liquidity.write(caller, caller_liquidity - amount);
            self.total_liquidity.write(total_liquidity - amount);
            // Transfer STRK and tokens from DEX to caller
            strk_token.transfer(caller, strk_amount);
            balloon_token.transfer(caller, token_amount);
            // Emit event for frontend tracking
            self
                .emit(
                    Event::LiquidityRemoved(
                        LiquidityRemoved {
                            liquidity_remover: caller,
                            liquidity_withdrawn: amount,
                            tokens_output: token_amount,
                            strk_output: strk_amount,
                        },
                    ),
                );
            return (strk_amount, token_amount);
            // Return the amounts of STRK and tokens withdrawn
        }
    }
}
