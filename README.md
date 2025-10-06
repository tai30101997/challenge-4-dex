⸻

✅ Checkpoint 0 — Environment
	•	Install: Node ≥ 18, Yarn, Rust, starknet-devnet v0.4.0, Cairo v2.11.4
	•	Clone repo → yarn install
	•	Run local chain → yarn chain
	•	Deploy contracts → yarn deploy
	•	Start frontend → yarn start → open http://localhost:3000

	
⸻
✅ Checkpoint 1 — Structure
	•	Verify two contracts in Debug Contracts: DEX and Balloons
	•	Balloons: ERC20 sample token
	•	DEX: main AMM contract
	•	Check frontend renders both contracts

	

⸻
✅ Checkpoint 2 — Reserves
	•	Add total_liquidity and liquidity[address] mapping
	•	Implement init() to load STRK and BAL reserves
	•	Call approve() on Balloons, then init() (e.g., 5 STRK + 5 BAL)
	•	Verify DEX holds both tokens

	
⸻
✅ Checkpoint 3 — Price
	•	Add price() using formula x * y = k
	•	Apply 0.3% trading fee (997 / 1000)
	•	Test different reserve ratios and understand slippage

	
⸻
✅ Checkpoint 4 — Trading
	•	Implement strk_to_token() and token_to_strk()
	•	Validate correct swap outputs and reserve updates
	•	Emit swap events for each trade

	
⸻
✅ Checkpoint 5 — Liquidity
	•	Implement deposit() and withdraw()
	•	Allow users to add/remove liquidity at correct ratios
	•	Update total_liquidity and user balances
	•	Emit LiquidityProvided and LiquidityRemoved events
⸻

✅ Checkpoint 6 — UI & Events
	•	Display all key events: swaps, deposits, withdrawals
	•	Side Quest: emit and display an ApproveBalloon event in /events page

	
⸻
✅ Checkpoint 7 — Deploy to Sepolia
	•	In scaffold.config.ts set: targetNetworks: [chains.sepolia]
	•	Fill .env with wallet address, private key, and Sepolia RPC
	•	Get STRK testnet tokens
	•	Deploy with: yarn deploy --network sepolia

	
⸻
✅ Checkpoint 8 — Frontend Deployment
	•	Connect wallet (Argent X / Braavos)
	•	Deploy frontend → yarn vercel or yarn vercel --prod
	•	Confirm correct Sepolia connection and contract events

	
⸻
✅ Checkpoint 9 — Test & Submit
	•	Run yarn test → all tests must pass ✅
	•	Submit your deployed frontend URL on SpeedRunStark.com
	•	Share your live DEX link and let friends swap tokens! 
⸻

