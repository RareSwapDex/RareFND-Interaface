import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext, useMemo } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import token_info from "../../token.json";
import { useParams } from "react-router";
import { ProviderContext } from "../../web3/ProviderContext";
import LoadingSpinner from "../LoadingSpinner";
import {
	formatUsd,
	formatUsdInput,
	formatFnd,
	sendTx,
	USDT_DECIMALS,
	popupError,
	popupInfo,
	switchNetwork,
} from "../../utils/Helpers";
import { TARGET_CHAIN } from "../../utils/Helpers";
import Iframe from "react-iframe";
import { sha512 } from "js-sha512";
import { useSearchParams } from "react-router-dom";
import { notification } from "antd";

var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

let refreshStakingId = 0;

export default function ContributeBtn(props) {
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [readyToContribute, setReadyToContribute] = useState();
	const [pending, setPending] = useState(false);
	const [token, setToken] = useState();
	const [staking, setStaking] = useState();
	const [allowance, setAllowance] = useState(0);
	const [finishedTokenInfoUpdate, setFinishedTokenInfoUpdate] = useState(true);
	const [projectData, setProjectData] = useState();
	const [stakingOptions, setStakingOptions] = useState();
	const [stakingData, setStakingData] = useState();
	const [projectLive, setProjectLive] = useState(false);
	const [stakingAddress, setStakingAddress] = useState();
	const [staking_abi, setStaking_abi] = useState();
	const [balance, setBalance] = useState(0);
	const [usdBalance, setUsdBalance] = useState(0);
	const [txHash, setTxHash] = useState();
	const [contributionEmail, setContributionEmail] = useState("");
	const [contributionEmailErr, setContributionEmailErr] = useState("");
	const [venlyWalletAddress, setVenlyWalletAddress] = useState("");
	const [show, setShow] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [mercuryoCurrency, setMercuryoCurrency] = useState("");
	const [mercuryoFiatCurrency, setMercuryoFiatCurrency] = useState("");
	const [mercuryoBusdFee, setMercuryoBusdFee] = useState("");
	const [mercuryoFiatCurrencyAmount, setMercuryoFiatCurrencyAmount] =
		useState(0);
	const [mercuryoCurrencyAmount, setMercuryoCurrencyAmount] = useState(0);
	const [mercuryoRecievingAmount, setMercuryoRecievingAmount] = useState(0);
	const [mercuryoPopupURL, setMercuryoPopupURL] = useState("");
	const [paymentCompleted, setPaymentCompleted] = useState(false);
	const [donationMethod, setDonationMethod] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [api, contextHolder] = notification.useNotification();
	const { provider, setProvider } = useContext(ProviderContext);
	const token_abi = token_info.token_abi;
	const tokenAddress = token_info.token_address;
	const id = props.projectId;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleCloseCard = () => setShowCard(false);
	const handleShowCard = () => setShowCard(true);

	const getAllowance = async (token_) => {
		const allownce = await token_.allowance(walletAddress, stakingAddress);
		setAllowance(allownce);
	};

	useEffect(() => {
		if (searchParams.get("payment_status") === "success") {
			openNotification(
				`${props.projectCategory === 2 ? "Donation" : "Contribution"} sent!`,
				`You have successfully sent a ${
					props.projectCategory === 2 ? "Donation" : "Contribution"
				} to: "${props.projectName}"!`
			);
		} else if (searchParams.get("payment_status") === "failed") {
			openNotification(
				`${props.projectCategory === 2 ? "Donation" : "Contribution"} Failed!`,
				`Your ${
					props.projectCategory === 2 ? "Donation" : "Contribution"
				} was not sent to: "${props.projectName}"!`
			);
		}
	}, [searchParams]);

	const getTokenBalance = async () => {
		const data = await token.balanceOf(walletAddress);
		const usd = await staking.fndToUsd(data);
		setBalance(data);
		setUsdBalance(usd);
	};

	const getStakingOptions = async (staking) => {
		const options = await staking.getOptions();
		setStakingOptions(options);
		setFinishedTokenInfoUpdate(true);
	};

	const getStakingData = async (staking) => {
		const data = await staking.getUserData();
		setStakingData(data);
	};

	useEffect(() => {
		if (window.location.href.includes("?message=completed")) {
			setPaymentCompleted(true);
		}
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/project/${id}/`)
			.then((response) => {
				setProjectData(response.data);
				setProjectLive(response.data.live);
				setStakingAddress(response.data.staking_address);
				setStaking_abi(JSON.parse(response.data.staking_abi));
			});
	}, [txHash]);

	useEffect(() => {
		clearInterval(refreshStakingId);
		refreshStakingId = setInterval(() => {
			if (!!staking) {
				getStakingData(staking);
				getStakingOptions(staking);
			}
			if (!!walletAddress) {
				getTokenBalance();
			}
		}, 5000);
	}, [staking]);

	useMemo(() => {
		if (provider && stakingAddress && stakingAddress) {
			const signer = provider.getSigner();
			const token_ = new ethers.Contract(tokenAddress, token_abi, signer);
			const staking = new ethers.Contract(stakingAddress, staking_abi, signer);
			setToken(token_);
			setStaking(staking);
			isReadyToContribute();

			getAllowance(token_);
			getStakingOptions(staking);
			getStakingData(staking);
		}
	}, [provider, walletAddress, stakingAddress]);

	async function stake() {
		if (!allowance || allowance.lte(0)) {
			popupInfo(
				`Please approve 2x transactions in your wallet to complete your ${
					props.projectCategory === 2 ? "Donation" : "Contribution"
				}!`
			);
			const approvalStatus = await approve();
			if (!approvalStatus) {
				// popupError("You need to first approve the payment!");
				return;
			}
		}
		let contribution_amount =
			document.getElementById("contribute-amount").value;

		if (!regexp.test(contribution_amount)) {
			return alert("Invalid contribution amount");
		} else {
			await isReadyToContribute();
			if (!walletAddress || (walletAddress && chainId !== TARGET_CHAIN)) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === TARGET_CHAIN) {
				try {
					setPending(true);
					const tx = () =>
						staking?.stakeUsd(
							ethers.utils.parseUnits(contribution_amount, USDT_DECIMALS)
						);
					const status = await sendTx(
						tx,
						`You have successfully ${
							props.projectCategory === 2 ? "Donated" : "Contributed"
						}!`
					);
					setPending(false);
					if (status.valid) {
						setTxHash(status.hash);
						axios.post(
							process.env.REACT_APP_BASE_URL + "/api/pending_contribution/",
							{
								hash: status.hash,
								project: id,
								selected_incentive: AutoIncentive(),
							}
						);
					}
				} catch (e) {
					setPending(false);
				}
			}
		}
	}

	// setTxHash(
	// 	"0x54550f395515300ca206b5e3f1e6c6a1e0b408fa280ffc84cc34adb946f4499d"
	// );

	async function approve() {
		setPending(true);
		// stacking address -> smart contract address and the max amount
		const approveTx = () =>
			token?.approve(stakingAddress, ethers.constants.MaxInt256);
		const status = await sendTx(approveTx, "Approved successfully!");
		setPending(false);
		status.valid && setAllowance(ethers.constants.MaxInt256);
		return status;
	}

	function setInputValue(usdAmount) {
		document.getElementById("contribute-amount").value =
			formatUsdInput(usdAmount);
	}

	async function claim() {
		setPending(true);
		const tx = () => staking?.claim();
		await sendTx(tx, "You have successfully claimed!");
		setPending(false);
	}

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

	async function isReadyToContribute() {
		if (!projectLive) {
			setReadyToContribute(false);
			return;
		}
		if (provider && projectLive) {
			setChainId(toHex(provider.network.chainId));
			const accounts = await provider.listAccounts();
			if (accounts) setWalletAddress(accounts[0]);
			if (accounts[0]) {
				setReadyToContribute(true);
			} else {
				setReadyToContribute(false);
			}
		} else {
			setReadyToContribute(false);
		}
	}

	useEffect(() => {
		console.log(donationMethod);
	}, [donationMethod]);

	function openPopUp(e) {
		let contribution_amount =
			document.getElementById("contribute-amount").value;

		setDonationMethod(e.target.name);

		if (!regexp.test(contribution_amount)) {
			popupInfo(
				`Please enter amount to complete your ${
					props.projectCategory === 2 ? "Donation" : "Contribution"
				}!`
			);
			// return alert("Invalid contribution amount");
		} else {
			handleShow();
		}
	}

	function donateByCardOrCrypto() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;

		if (!contributionEmail) {
			setContributionEmailErr("Email field is required.");
		} else if (donationMethod === "donate-card" && contribution_amount < 16) {
			popupInfo(
				`${
					props.projectCategory === 2 ? "Donation" : "Contribution"
				} amount should at least be $16 or more`
			);
		} else {
			document.getElementById("submit-email-form").disabled = true;
			if (donationMethod === "donate-card") {
				if (Number(contribution_amount) >= 5000) {
					donateByStripe();
				} else {
					createVenlyWallet();
				}
			} else {
				donateByCrypto();
			}
		}
	}

	function donateByStripe() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		const payload = {
			projectName: props.projectName,
			contributorEmail: contributionEmail,
			projectContractAddress: stakingAddress,
			contributionAmount: contribution_amount,
			projectId: id,
			projectURL: window.location.href,
			selectedIncentive: AutoIncentive(),
		};
		axios
			.post(
				process.env.REACT_APP_BASE_URL + `/api/stripe/create-charge/`,
				payload
			)
			.then((res) => {
				if (res.status === 200) {
					redirectToCheckout(res.data.hosted_url);
				}
			})
			.catch((err) => console.log(err));
	}

	function donateByCrypto() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		const payload = {
			projectName: props.projectName,
			contributorEmail: contributionEmail,
			projectContractAddress: stakingAddress,
			contributionAmount: contribution_amount,
			projectId: id,
			projectURL: window.location.href,
			selectedIncentive: AutoIncentive(),
		};
		axios
			.post(
				process.env.REACT_APP_BASE_URL + `/api/coinbase/create-charge/`,
				payload
			)
			.then((res) => {
				if (res.status === 200) {
					redirectToCheckout(res.data.data.hosted_url);
				}
			})
			.catch((err) => console.log(err));
	}

	function redirectToCheckout(payment_url) {
		window.location.replace(payment_url);
	}

	function createVenlyWallet() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		if (contribution_amount >= 16) {
			const payload = {
				contributionEmail: contributionEmail,
				contributionAmount: contribution_amount,
				stakingAddress: stakingAddress,
				projectId: id,
				selectedIncentive: AutoIncentive() ? AutoIncentive() : 0,
				redirectURL: window.location.href,
			};
			axios
				.post(
					process.env.REACT_APP_BASE_URL + "/api/mercuryo/checkout_url/",
					payload
				)
				.then((res) => {
					if (res.status === 200)
						window.location.replace(res.data.checkout_url);
				})
				.catch((err) => console.log(err));
		} else {
			popupInfo("Donation amount must be at least be $16 or more");
		}
	}

	function redirectToMercuryo(address, email) {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		const stringSec = "rarefndproduction";
		sha512(address + stringSec);
		var hash = sha512.update(address + stringSec);
		// hash.update(address + stringSec);
		const sigHax = hash.hex();

		if (contribution_amount >= 16) {
			const data = {
				type: "buy",
				// address: venlyWalletAddress,
				from: mercuryoFiatCurrency ? mercuryoFiatCurrency : "USD",
				to: mercuryoCurrency ? mercuryoCurrency : "BNB",
				// amount: mercuryoFiatCurrency,
				amount: contribution_amount, // user input
				// widget_id: "c95bbe0f-334f-4848-a138-25125125b4b7",
				widget_id: "41201352-8bc9-416b-b822-4393027afcd2",
				address: address,
				signature: sigHax,
				email: email,
				// redirect_url: window.location.href + `?payment_status=success`,
				redirect_url: `https://temporary-rarefnd.netlify.app/?message=completed`,
			};

			window.location.replace(
				`https://exchange.mercuryo.io/?widget_id=${data.widget_id}&address=${data.address}&signature=${data.signature}&fiat_amount=${data.amount}&type=${data.type}&fiat_currency=${data.from}&currency=${data.to}&email=${data.email}&redirect_url=${data.redirect_url}&merchant_transaction_id=${data.amount}-${id}`
			);
		} else {
			popupInfo("Donation amount should at least be $16 or more");
		}
	}

	const openNotification = (notificationTitle, notificationBody) => {
		if (searchParams.get("payment_status") === "success") {
			api.success({
				message: notificationTitle,
				description: notificationBody,
				placement: "top",
			});
		} else if (searchParams.get("payment_status") === "failed") {
			api.error({
				message: notificationTitle,
				description: notificationBody,
				placement: "top",
			});
		}
	};

	// function handleAmountInputChange(e) {
	// 	const { value } = e.target;
	// 	let maxEligibleIncentive = null;
	// 	let localIncentive = null;
	// 	for (let i = 0; i < props.incentivesData.length; i++) {
	// 		let incentive = props.incentivesData[i];
	// 		if (
	// 			value >= incentive.price &&
	// 			(!maxEligibleIncentive || incentive.price > maxEligibleIncentive)
	// 		) {
	// 			maxEligibleIncentive = incentive.price;
	// 			localIncentive = incentive;
	// 		}
	// 	}
	// 	if (!props.selectedIncentive() && localIncentive) {
	// 		props.setSelectedIncentive(localIncentive.id);
	// 	}
	// 	console.log(
	// 		maxEligibleIncentive,
	// 		localIncentive,
	// 		props.selectedIncentive(),
	// 		props.selectedIncentive()
	// 			? props.incentivesData[props.selectedIncentive() - 1]
	// 			: 0
	// 	);
	// }

	function AutoIncentive() {
		const contribution_amount =
			document.getElementById("contribute-amount").value;
		let maxEligibleIncentive = null;
		let localIncentive = null;
		const globalSelectedIncentive = props.selectedIncentive();
		if (globalSelectedIncentive) {
			let localSelectedIncentive = null;
			for (let i = 0; i < props.incentivesData.length; i++) {
				let incentive = props.incentivesData[i];
				if (incentive.id === globalSelectedIncentive) {
					localSelectedIncentive = incentive;
					break;
				}
			}
			if (
				localSelectedIncentive &&
				localSelectedIncentive.price <= contribution_amount
			) {
				return globalSelectedIncentive;
			}
		}

		for (let i = 0; i < props.incentivesData.length; i++) {
			let incentive = props.incentivesData[i];
			if (
				contribution_amount >= incentive.price &&
				(!maxEligibleIncentive || incentive.price > maxEligibleIncentive)
			) {
				maxEligibleIncentive = incentive.price;
				localIncentive = incentive;
			}
		}
		return localIncentive ? localIncentive.id : localIncentive;
	}

	return (
		<div>
			{contextHolder}
			<div>
				<Modal
					show={paymentCompleted}
					onHide={() => setPaymentCompleted(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Payment received and in processing</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						We have received your payment and soon your contribution will be
						added!
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setPaymentCompleted(false)}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			{!!walletAddress && (
				<div>
					Balance | {formatFnd(balance)} FND (${formatUsd(usdBalance || 0)})
				</div>
			)}
			{finishedTokenInfoUpdate ? (
				<div>
					{!!stakingOptions && stakingOptions[6] && (
						<span>
							<div>
								{!!stakingData ? formatFnd(stakingData[0]) : "-"} FND Pending
								Gains
							</div>
							<div>
								{!!stakingData ? formatFnd(stakingData[1]) : "-"} FND Total
								Gains
							</div>
						</span>
					)}
					{!!stakingData && (
						<div>
							${formatUsd(stakingData[3])} Total Contributed (
							{formatFnd(stakingData[2])} FND)
						</div>
					)}
					{projectLive && (
						<div>
							<div
								className="contribution-details align-self-end text-center w-70 mx-auto"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										border: "3px solid",
										borderColor: "#cd77d3",
										borderRadius: "35px",
										maxWidth: "500px",
									}}
								>
									<Row
										className="mx-auto no-gutters jumbotron d-flex align-items-center"
										style={{ padding: "0 6px 0 1em" }}
									>
										<Col style={{ padding: "0" }}>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<p
													style={{
														padding: "0",
														margin: "0",
														fontSize: "1.2rem",
														borderRight: "1px solid",
														paddingRight: "10px",
														borderColor: "#cd77d3",
													}}
												>
													$
												</p>
												<input
													id="contribute-amount"
													placeholder={"100"}
													autoComplete="off"
													type="text"
													onKeyPress={(e) => {
														if (
															e.key === "." &&
															(e.target.value.includes(".") ||
																e.target.value === "")
														) {
															e.preventDefault();
														}
														!/^[0-9]/.test(e.key) &&
															!/^[.]/.test(e.key) &&
															!e.target.value.includes(".") &&
															e.preventDefault();
													}}
													// onChange={(e) => handleAmountInputChange(e)}
													pattern="^[0-9]*[.]?[0-9]*$"
													// disabled={!allowance || allowance <= 0}
													style={{
														backgroundColor: "transparent",
														border: "none",
														width: "100%",
														// minWidth: "250px",
														// minHeight: "59px",
														height: "100%",
														fontSize:
															!allowance || allowance <= 0 ? "1 rem" : "1.2rem",
														// color: !allowance || allowance <= 0 ? "red" : "black",
														color: "black",
														// fontFamily: "'Kaisei Opti', sans-serif",
														outline: "none",
														paddingLeft: "10px",
													}}
												></input>

												<Button
													style={{
														// padding: "0",
														// margin: "0",
														// fontSize: "1.5rem",
														// borderLeft: "1px solid",
														// paddingLeft: "10px",
														// borderColor: "#cd77d3",
														backgroundColor: "#cd77d3",
														borderRadius: "35px",
														border: "none",
													}}
													size="sm"
													// variant="outline-warning"
													onClick={() => setInputValue(usdBalance || "0")}
												>
													MAX
												</Button>
											</div>
										</Col>
									</Row>
								</div>
							</div>

							<div
								className="align-self-end text-center w-70 mx-auto"
								style={{
									padding: 5,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Row
									className="mx-auto no-gutters jumbotron d-flex align-items-center"
									style={{
										padding: "0 0 0 0",
										width: "100%",
										maxWidth: "500px",
									}}
								>
									<Col className="p-1 w-20" style={{ width: "100%" }}>
										{provider ? (
											<Button
												id="contribute-fnd-btn"
												// variant="warning"
												size="lg"
												style={{
													width: "100%",
													fontSize: "1rem",
													maxHeight: "100%",
													borderRadius: "35px 35px 35px 35px",
													background:
														"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
													border: "none",
												}}
												onClick={() => {
													if (chainId === TARGET_CHAIN) {
														stake();
														// console.log(AutoIncentive());
													} else {
														switchNetwork();
													}
												}}
												disabled={
													!stakingOptions ||
													!stakingOptions[7] ||
													!readyToContribute ||
													!projectLive ||
													pending
												}
											>
												{props.projectCategory === 2 ? "Donate" : "Contribute"}{" "}
												by FND
											</Button>
										) : (
											<Button
												id="contribute-fnd-btn-2"
												// variant="warning"
												size="lg"
												style={{
													width: "100%",
													fontSize: "1rem",
													maxHeight: "100%",
													borderRadius: "35px 35px 35px 35px",
													background:
														"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
													border: "none",
												}}
												onClick={() =>
													document.getElementById("connect-btn").click()
												}
												disabled={!projectLive}
											>
												{props.projectCategory === 2 ? "Donate" : "Contribute"}{" "}
												by FND
											</Button>
										)}
									</Col>
								</Row>
							</div>
							<div
								className="align-self-end text-center w-70 mx-auto"
								style={{
									padding: 5,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Row
									className="mx-auto no-gutters jumbotron d-flex align-items-center"
									style={{
										padding: "0 0 0 0",
										width: "100%",
										maxWidth: "500px",
									}}
								>
									{/* {id === 34 && ( */}
									<Col className="p-1 w-30" style={{ width: "100%" }}>
										<Button
											id="donate-crypto"
											name="donate-crypto"
											size="lg"
											style={{
												width: "100%",
												fontSize: "1rem",
												maxHeight: "100%",
												borderRadius: "35px 35px 35px 35px",
												background:
													"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
												border: "none",
											}}
											onClick={(e) => openPopUp(e)}
											disabled={!projectLive}
										>
											{props.projectCategory === 2 ? "Donate" : "Contribute"} by
											crypto
										</Button>
									</Col>
									{/* )} */}
									<Col className="p-1 w-30" style={{ width: "100%" }}>
										<Button
											id="contribute-usd-btn"
											name="donate-card"
											size="lg"
											style={{
												width: "100%",
												fontSize: "1rem",
												maxHeight: "100%",
												borderRadius: "35px 35px 35px 35px",
												background:
													"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
												border: "none",
											}}
											onClick={(e) => openPopUp(e)}
											disabled={!projectLive}
										>
											{props.projectCategory === 2 ? "Donate" : "Contribute"} by
											card
										</Button>
									</Col>
								</Row>
							</div>
						</div>
					)}
					{stakingOptions && !(!stakingOptions || !stakingOptions[6]) && (
						<Row
							className="mx-auto no-gutters jumbotron d-flex align-items-center mb-3"
							style={{
								padding: "0 0 0 0",
								width: "100%",
								maxWidth: "500px",
							}}
						>
							<Button
								id="claim-btn"
								// variant="warning"
								size="lg"
								style={{
									width: "100%",
									fontSize: "1rem",
									maxHeight: "100%",
									borderRadius: "35px 35px 35px 35px",
									background:
										"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
									border: "none",
								}}
								onClick={() => claim()}
							>
								Claim
							</Button>
						</Row>
					)}

					{txHash && (
						<div
							style={{
								backgroundColor: "#09ce00",
								color: "white",
								// height: "50px",
								// display: "flex",
								// justifyContent: "center",
								// alignItems: "center",
								padding: "5px",
							}}
						>
							<p style={{ margin: "0", padding: "0" }}>
								Transaction Hash:{" "}
								<a
									href={`https://bscscan.com/tx/${txHash}`}
									target="_blank"
									rel="noopener"
								>
									{txHash}
								</a>
							</p>
						</div>
					)}
				</div>
			) : (
				<LoadingSpinner color="#cd77d3" />
			)}

			{/* >>>>>>>>>>>> POPUP PAYMENT WITH Mercuryo */}
			{mercuryoPopupURL ? (
				<>
					<div id="mercuryo-widget">
						<Iframe
							url={mercuryoPopupURL}
							width="640px"
							height="320px"
							id=""
							className=""
							display="block"
							position="relative"
						/>
					</div>
				</>
			) : (
				<></>
			)}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Enter you email address:</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={contributionEmail}
								onChange={(e) => setContributionEmail(e.target.value)}
								onClick={() => setContributionEmailErr("")}
								placeholder="name@example.com"
								autoFocus
							/>
							{contributionEmailErr ? (
								<p className="ml-2 mt-2 text-danger">{contributionEmailErr}</p>
							) : null}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
						style={{
							fontSize: "1rem",
							borderRadius: "35px 35px 35px 35px",
							border: "none",
						}}
					>
						Close
					</Button>
					<Button
						onClick={donateByCardOrCrypto}
						id="submit-email-form"
						style={{
							fontSize: "1rem",
							borderRadius: "35px 35px 35px 35px",
							background:
								"linear-gradient(to right, #6c7fdd 0%, #cd77d3 54.09%, #e4bad0 100%)",
							border: "none",
						}}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
