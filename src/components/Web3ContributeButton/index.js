import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import token_info from "../../token.json";
import { useParams } from "react-router";
import { ProviderContext } from "../../web3/ProviderContext";

const abi = token_info.token_abi;
const token_address = token_info.token_address;
const token_decimals = token_info.token_decimals;
var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export default function ContributeBtn(props) {
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [readyToContribute, setReadyToContribute] = useState();
	const [pending, setPending] = useState(false);
	const [allowance, setAllowance] = useState(0);
	const [projectData, setProjectData] = useState();
	const { id } = useParams();
	const { provider, setProvider } = useContext(ProviderContext);
	const stakingAddress = "0xFC938a4d3eF55e908448C4fCBfe48513163D8348";
	const tokenAddress = "0x6e6BC5aE02058a080A99e39bcca7EF631a6c7771";
	let token, staking;
	const token_abi = [
		{
		"inputs": [
		  { "internalType": "address", "name": "owner", "type": "address" },
		  { "internalType": "address", "name": "spender", "type": "address" }
		],
		"name": "allowance",
		"outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  { "internalType": "address", "name": "spender", "type": "address" },
		  { "internalType": "uint256", "name": "amount", "type": "uint256" }
		],
		"name": "approve",
		"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	];
	const staking_abi = [
		{
		  "inputs": [
			{ "internalType": "address", "name": "_FND", "type": "address" }
		  ],
		  "stateMutability": "nonpayable",
		  "type": "constructor"
		},
		{
		  "inputs": [],
		  "name": "FND",
		  "outputs": [
			{ "internalType": "contract IERC20", "name": "", "type": "address" }
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "PERIOD",
		  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "REWARDRATE",
		  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "divideReward",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "getReward",
		  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "owner",
		  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{ "internalType": "uint256", "name": "_amount", "type": "uint256" }
		  ],
		  "name": "stake",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "totalStaked",
		  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{ "internalType": "uint256", "name": "_amount", "type": "uint256" }
		  ],
		  "name": "withdraw",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "withdrawAll",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		}
	  ];

	useEffect(() => {
	
		axios
			.get(`http://c503-94-202-120-29.ngrok.io/api/project/${id}/`)
			.then((response) => {
				setProjectData(response.data);
			});
	}, []);

	useEffect(() => {
		if (provider) {
				const signer = provider.getSigner();
				token = new ethers.Contract(tokenAddress, token_abi, signer);
				staking = new ethers.Contract(stakingAddress, staking_abi, signer);
				isReadyToContribute();
				const getAllowance = async() => {
					const allownce = await token.allowance(walletAddress, stakingAddress);
					setAllowance(allownce)
				}
				getAllowance();
		}
	}, [provider]);

	async function stake() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		if (!regexp.test(contribution_amount)) {
			console.log(contribution_amount);
			return alert("Invalid Contribution Amount");
		} else {
			await isReadyToContribute();
			console.log(walletAddress, chainId);
			if (!walletAddress || (walletAddress && chainId !== "0x38")) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === "0x38") {
				
				try {
					const tx = await staking?.stake(
						ethers.utils.parseEther(contribution_amount)
					);
					axios.post(
						"http://c503-94-202-120-29.ngrok.io/api/pending_contribution/",
						{
							hash: tx.hash,
							project: id,
						}
					);
					document.getElementById(
						"transaction-status"
					).textContent = `Transaction hash: ${tx.hash}`;
					document.getElementById("transaction-status").href =
						"https://bscscan.com/tx/" + tx.hash;
					document.getElementById("transaction-status").className =
						"d-block p-2 bg-success text-white";
				} catch (e) {
					document.getElementById("transaction-status").innerHTML = e.message;
					document.getElementById("transaction-status").className =
						"d-block p-2 bg-danger text-white";
					document.getElementById("transaction-status").onclick = () => false;
				}
			}
		}
	}

	async function approve() {
		let approveTx;
		setPending(true);
		approveTx = await token?.approve(stakingAddress ,ethers.constants.MaxInt256);
		await approveTx.wait();
		setPending(false);
	}

	async function isReadyToContribute() {
		if (projectData) {
			setReadyToContribute(projectData.live);
			return;
		}
		console.log("1");
		if (provider) {
			setChainId(toHex(provider.network.chainId));
			const accounts = await provider.listAccounts();
			if (accounts) setWalletAddress(accounts[0]);
			if (accounts[0]) {
				console.log("3");
				setReadyToContribute(true);
			} else {
				console.log("4");
				setReadyToContribute(false);
			}
		} else {
			console.log("5");
			setReadyToContribute(false);
		}
	}

	return (
		<div
			className="contribution-details align-self-end text-center w-70 mx-auto"
			style={{ marginTop: "auto" }}
		>
			<div
				style={{
					border: "3px solid",
					borderColor: "#FEC008",
					borderRadius: "12px",
				}}
			>
				<Row
					className="mx-auto no-gutters jumbotron d-flex align-items-center"
					style={{ height: "60px", width: "98%" }}
				>
					<Col>
						<input
							id="contribute-amount"
							className="bg-black"
							placeholder="0.00 FND"
							autocomplete="off"
							style={{
								border: "none",
								width: "100%",
								height: "100%",
								fontSize: "28px",
								color: "white",
								fontFamily: "'Kaisei Opti', sans-serif",
								outline: "none",
							}}
						></input>
					</Col>
					<Col className="p-0 w-20" style={{ width: "20%" }}>
						{allowance > 0 ? 
							<Button
								id="contribute-btn"
								variant="warning"
								classNmae="btn-wallet align-self-end"
								size="lg"
								style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
								onClick={() => stake()}
								disabled={!readyToContribute || pending}
							>
								Contribute
							</Button> : 
							<Button
								id="approve-btn"
								variant="warning"
								classNmae="btn-wallet align-self-end"
								size="lg"
								style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
								onClick={() => approve()}
								disabled={pending}
							>
								Approve
							</Button>
						}
					</Col>
				</Row>
			</div>
			<Row>
				<a
					href="#"
					id="transaction-status"
					className="d-none"
					target="_blank"
				></a>
			</Row>
		</div>
	);
}
