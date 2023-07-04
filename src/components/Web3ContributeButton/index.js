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
import supportedCurrencies from "../../data/supportedCurrencies.json";
import { ProviderContext } from "../../web3/ProviderContext";
import LoadingSpinner from "../LoadingSpinner";
import {
	formatUsd,
	formatUsdInput,
	formatFnd,
	sendTx,
	USDT_DECIMALS,
	popupInfo,
} from "../../utils/Helpers";
import { TARGET_CHAIN } from "../../utils/Helpers";
import { useSearchParams } from "react-router-dom";
import { notification } from "antd";
import { Input, Select } from "antd";
import "./index.css";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../Context/LanguageContext";
import ContributionCurrencyContext from "../../Context/ContributionCurrencyContext";

var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

let refreshStakingId = 0;

export default function ContributeBtn(props) {
	const { t } = useTranslation();
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
	const [show, setShow] = useState(false);
	const { language, setLanguage } = useContext(LanguageContext);
	const {
		selectedCurrency,
		setSelectedCurrency,
		contributionAmount,
		setContributionAmount,
	} = useContext(ContributionCurrencyContext);

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

	const getAllowance = async (token_) => {
		const allownce = await token_.allowance(walletAddress, stakingAddress);
		setAllowance(allownce);
	};

	const convertContributionAmountToUSD = async (amount) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/currency-exchange/`,
				{
					from: selectedCurrency,
					amount: amount,
				}
			);

			const usdAmount = response.data.conversion_result;
			return usdAmount;
		} catch (error) {
			console.error(
				`${t("project.convertContributionAmountToUSDError")}:`,
				error
			);
			return 0;
		}
	};

	useEffect(() => {
		if (searchParams.get("payment_status") === "success") {
			openNotification(
				`${t("project.success")}`,
				`${
					props.projectCategory === 2
						? t("project.successfulDonation")
						: t("project.successfulContribution")
				}: "${props.projectName}"!\n${t("project.contributionTime")}`
			);
		} else if (searchParams.get("payment_status") === "failed") {
			openNotification(
				`${t("project.failed")}!`,
				`${
					props.projectCategory === 2
						? t("project.donationWasNotSent")
						: t("project.contributionWasNotSent")
				}: "${props.projectName}"!`
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
				`${
					props.projectCategory === 2
						? t("project.approveDonation")
						: t("project.approveContribution")
				}!`
			);
			const approvalStatus = await approve();
			if (!approvalStatus) {
				// popupError("You need to first approve the payment!");
				return;
			}
		}
		let contribution_amount = contributionAmount;

		let usd_amount = 0;
		if (selectedCurrency !== "USD") {
			usd_amount = (
				await convertContributionAmountToUSD(contribution_amount)
			).toString();
		} else {
			usd_amount = contribution_amount;
		}

		if (!regexp.test(usd_amount)) {
			return alert(t("project.invalidAmount"));
		} else {
			await isReadyToContribute();

			if (!walletAddress || (walletAddress && chainId !== TARGET_CHAIN)) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === TARGET_CHAIN) {
				try {
					setPending(true);
					console.log("contributionAmount-2", usd_amount);
					const tx = () =>
						staking?.stakeUsd(
							ethers.utils.parseUnits(usd_amount, USDT_DECIMALS)
						);
					console.log(tx);
					const status = await sendTx(
						tx,
						`${
							props.projectCategory === 2
								? t("project.youHaveSuccessfullyDonated")
								: t("project.youHaveSuccessfullyContributed")
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
								selected_incentive: AutoIncentive(usd_amount),
							}
						);
					}
				} catch (e) {
					setPending(false);
				}
			}
		}
	}

	async function approve() {
		setPending(true);
		// stacking address -> smart contract address and the max amount
		const approveTx = () =>
			token?.approve(stakingAddress, ethers.constants.MaxInt256);
		const status = await sendTx(approveTx, t("project.approved"));
		setPending(false);
		status.valid && setAllowance(ethers.constants.MaxInt256);
		return status;
	}

	function setInputValue(usdAmount) {
		setSelectedCurrency("USD");
		setContributionAmount(formatUsdInput(usdAmount));
	}

	async function claim() {
		setPending(true);
		const tx = () => staking?.claim();
		await sendTx(tx, t("project.claimedSuccessfully"));
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
		let contribution_amount = contributionAmount;

		setDonationMethod(e.target.name);

		if (!regexp.test(contribution_amount)) {
			popupInfo(
				`${
					props.projectCategory === 2
						? t("project.enterAmountDonation")
						: t("project.enterAmountContribution")
				}!`
			);
			// return alert("Invalid contribution amount");
		} else {
			handleShow();
		}
	}

	async function donateByCardOrCrypto() {
		let contribution_amount = contributionAmount;

		let usd_amount = 0;
		if (selectedCurrency !== "USD") {
			usd_amount = await convertContributionAmountToUSD(contribution_amount);
		} else {
			usd_amount = contribution_amount;
		}

		if (!contributionEmail) {
			setContributionEmailErr(t("project.emailRequired"));
		} else if (donationMethod === "donate-card") {
			console.log(t("project.amountNotEnough"), usd_amount);
			if (selectedCurrency === "USD" && contribution_amount < 28) {
				popupInfo(`${t("project.amountNotEnough")}`);
			} else if (selectedCurrency !== "USD" && usd_amount < 28) {
				console.log("usd_amount-1", usd_amount);
				const currency_rate = usd_amount / contribution_amount;
				popupInfo(
					`${t("project.amountShouldBe")}  ${(28 / currency_rate).toFixed(
						2
					)} ${selectedCurrency} ${t("project.orMore")}`
				);
			} else {
				document.getElementById("submit-email-form").disabled = true;
				if (usd_amount >= 5000) {
					donateByStripe(usd_amount);
				} else {
					donateByMercuryo(usd_amount);
				}
			}
		} else {
			document.getElementById("submit-email-form").disabled = true;
			donateByCrypto(usd_amount);
		}
	}

	function donateByStripe(contribution_amount) {
		const payload = {
			projectName: props.projectName,
			contributorEmail: contributionEmail,
			projectContractAddress: stakingAddress,
			contributionAmount: contribution_amount,
			projectId: id,
			projectURL: window.location.href,
			selectedIncentive: AutoIncentive(contribution_amount),
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

	function donateByCrypto(contribution_amount) {
		const payload = {
			projectName: props.projectName,
			contributorEmail: contributionEmail,
			projectContractAddress: stakingAddress,
			contributionAmount: contribution_amount,
			projectId: id,
			projectURL: window.location.href,
			selectedIncentive: AutoIncentive(contribution_amount),
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

	function donateByMercuryo(contribution_amount) {
		const payload = {
			contributionEmail: contributionEmail,
			contributionAmount: contribution_amount,
			stakingAddress: stakingAddress,
			projectId: id,
			selectedIncentive: AutoIncentive(contribution_amount)
				? AutoIncentive(contribution_amount)
				: 0,
			redirectURL: window.location.href,
		};
		axios
			.post(
				process.env.REACT_APP_BASE_URL + "/api/mercuryo/checkout_url/",
				payload
			)
			.then((res) => {
				if (res.status === 200) window.location.replace(res.data.checkout_url);
			})
			.catch((err) => console.log(err));
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

	const { Option } = Select;

	const mercuryoCurrencies = supportedCurrencies.supported_currencies;

	const currenciesInput = (
		<Select
			// defaultValue={language === "arabic" ? "AED" : "USD"}
			defaultValue={"AED"}
			style={{ border: "none" }}
			onChange={(value) => {
				setSelectedCurrency(value);
			}}
			bordered={false}
			id="contribution-currency"
			value={selectedCurrency}
		>
			{mercuryoCurrencies.map((currency) => (
				<Option value={currency} key={currency}>
					{currency}
				</Option>
			))}
		</Select>
	);

	function AutoIncentive(contribution_amount) {
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
						<Modal.Title>{t("project.paymentReceivedTitle")}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{t("project.paymentReceivedDescription")}</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setPaymentCompleted(false)}
						>
							{t("project.close")}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			{!!walletAddress && (
				<div>
					{t("project.balance")}: {formatFnd(balance)}FND ($
					{formatUsd(usdBalance || 0)})
				</div>
			)}
			{finishedTokenInfoUpdate ? (
				<div>
					{!!stakingOptions && stakingOptions[6] && (
						<span>
							<div>
								{t("project.pendingGains")}:{" "}
								{!!stakingData ? formatFnd(stakingData[0]) : "-"}FND{" "}
							</div>
							<div>
								{t("project.totalGains")}:{" "}
								{!!stakingData ? formatFnd(stakingData[1]) : "-"}FND{" "}
							</div>
						</span>
					)}
					{!!stakingData && (
						<div>
							{t("project.totalContributed")}: {formatFnd(stakingData[2])}FND ($
							{formatUsd(stakingData[3])})
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
												<Input
													className="contribute-amount"
													addonAfter={currenciesInput}
													id="contribute-amount"
													placeholder={"100"}
													autoComplete="off"
													type="text"
													bordered={false}
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
													pattern="^[0-9]*[.]?[0-9]*$"
													style={{
														backgroundColor: "transparent",
														border: "none !important",
														width: "100%",
														height: "100%",
														fontSize:
															!allowance || allowance <= 0 ? "1 rem" : "1.2rem",
														color: "black",
														outline: "none",
														// paddingLeft: "10px",
													}}
													value={contributionAmount}
													onChange={(e) => {
														console.log(e, e.target.value);
														setContributionAmount(e.target.value);
													}}
												></Input>

												<Button
													style={{
														backgroundColor: "#cd77d3",
														borderRadius: "35px",
														border: "none",
													}}
													size="sm"
													onClick={() => setInputValue(usdBalance || "0")}
												>
													{t("project.max")}
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
												{props.projectCategory === 2
													? t("project.donate")
													: t("project.contribute")}{" "}
												{t("project.byFnd")}
											</Button>
										) : (
											<Button
												id="contribute-fnd-btn-2"
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
												{props.projectCategory === 2
													? t("project.donate")
													: t("project.contribute")}{" "}
												{t("project.byFnd")}
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
											{props.projectCategory === 2
												? t("project.donate")
												: t("project.contribute")}{" "}
											{t("project.byCrypto")}
										</Button>
									</Col>
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
											{props.projectCategory === 2
												? t("project.donate")
												: t("project.contribute")}{" "}
											{t("project.byCard")}
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
								{t("project.claim")}
							</Button>
						</Row>
					)}

					{txHash && (
						<div
							style={{
								backgroundColor: "#09ce00",
								color: "white",
								padding: "5px",
							}}
						>
							<p style={{ margin: "0", padding: "0" }}>
								{t("project.transactionHash")}:{" "}
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

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t("project.enterEmail")}:</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>{t("project.email")}</Form.Label>
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
						{t("project.close")}
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
						{t("project.submit")}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
