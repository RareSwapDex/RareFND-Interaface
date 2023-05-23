import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { ProviderContext } from "../../web3/ProviderContext";
import { TARGET_CHAIN } from "../../utils/Helpers";
import "./index.css";

const providerOptions = {
	binancechainwallet: {
		package: true,
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: "b0a552cf598947f68b787c90b25aaeeb",
			rpc: {
				56: "https://bsc-dataseed.binance.org",
				97: "https://data-seed-prebsc-1-s1.binance.org:8545",
			},
		},
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK,
		options: {
			appName: "RareFnd",
			infuraId: "b0a552cf598947f68b787c90b25aaeeb",
			rpc: "",
			chainId: 56,
			darkMode: true,
		},
	},
};

const web3Modal = new Web3Modal({
	// network: "Binance Smart Chain (BSC)",
	theme: "dark",
	cacheProvider: true,
	providerOptions,
});

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export default function Web3ConnectButton() {
	const [connection, setConnection] = useState();
	const [walletAddress, setWalletAddress] = useState(null);
	const [chainId, setChainId] = useState(0);
	const [buttonText, setButtonText] = useState("Connect Wallet");
	const { provider, setProvider } = useContext(ProviderContext);

	const switchNetwork = async () => {
		try {
			await provider.provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: TARGET_CHAIN }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					await provider.provider.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: TARGET_CHAIN,
								rpcUrls: ["https://bsc-dataseed.binance.org/"],
								chainName: "Binance Smart Chain",
								nativeCurrency: {
									name: "Binance Token",
									symbol: "BNB",
									decimals: 18,
								},
								blockExplorerUrls: ["https://bscscan.com/"],
							},
						],
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	async function connectWallet() {
		// wallet connected but not to BSC
		if (walletAddress && chainId !== TARGET_CHAIN) {
			switchNetwork();
		} else {
			try {
				const connection_ = await web3Modal.connect();
				const provider_ = new ethers.providers.Web3Provider(connection_);
				const accounts = await provider_.listAccounts();
				const network = await provider_.getNetwork();
				setProvider(provider_);
				setConnection(connection_);
				if (accounts) setWalletAddress(accounts[0]);
				setChainId(toHex(network.chainId));
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	async function handelConnectWallet() {
		if (
			walletAddress &&
			walletAddress.includes("0x") &&
			buttonText !== "Connect to BSC"
		) {
			await disconnect();
		} else {
			await connectWallet();
		}
	}

	const disconnect = async () => {
		await web3Modal.clearCachedProvider();
		setChainId("");
		setProvider();
		setConnection();
		setWalletAddress();
	};

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWallet();
		}
	}, []);

	async function updateProvider() {
		const connection_ = await web3Modal.connect();
		const provider_ = new ethers.providers.Web3Provider(connection_);
		const accounts = await provider_.listAccounts();
		const network = await provider_.getNetwork();
		setProvider(provider_);
		setConnection(connection_);
		if (accounts) setWalletAddress(accounts[0]);
		setChainId(toHex(network.chainId));
	}

	useEffect(() => {
		if (walletAddress && chainId !== TARGET_CHAIN) {
			setButtonText("Connect to BSC");
		} else if (walletAddress && chainId === TARGET_CHAIN) {
			setButtonText(
				walletAddress.slice(0, 6) + "....." + walletAddress.slice(-4)
			);
		} else {
			setButtonText("Connect Wallet");
		}

		if (connection?.on) {
			const handleAccountsChanged = (accounts) => {
				if (accounts.length) {
					connectWallet();
				} else {
					disconnect();
				}
			};

			const handleChainChanged = (_hexChainId) => {
				updateProvider();
			};

			connection.on("accountsChanged", handleAccountsChanged);
			connection.on("chainChanged", handleChainChanged);

			return () => {
				if (connection.removeListener) {
					connection.removeListener("accountsChanged", handleAccountsChanged);
					connection.removeListener("chainChanged", handleChainChanged);
				}
			};
		}
	}, [connection, provider, chainId]);

	return (
		<Button
			id="connect-btn"
			className={`connect-wallet-btn${
				walletAddress &&
				walletAddress.includes("0x") &&
				buttonText !== "Connect to BSC"
					? " disconnect-option"
					: ""
			}`}
			onClick={handelConnectWallet}
			style={{
				borderRadius: "35px 35px 35px 9.77px",
				background:
					buttonText === "Connect to BSC"
						? "linear-gradient( to right, #ff4646 0%, #ff4646 44.09%, #ffffff 100%)"
						: "linear-gradient( to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
				border: "none",
				boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
				color: "#fff",
				padding: "10px 20px",
				fontWeight: "700",
			}}
		>
			<span>{buttonText}</span>
		</Button>
	);
}
