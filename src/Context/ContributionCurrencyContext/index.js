import { createContext, useState } from "react";

const ContributionCurrencyContext = createContext();

export default ContributionCurrencyContext;

export const ContributionCurrencyProvider = ({ children }) => {
	const [selectedCurrency, setSelectedCurrency] = useState(
		// language === "arabic" ? "AED" : "USD"
		"AED"
	);
	const [contributionAmount, setContributionAmount] = useState(null);

	return (
		<ContributionCurrencyContext.Provider
			value={{
				selectedCurrency,
				setSelectedCurrency,
				contributionAmount,
				setContributionAmount,
			}}
		>
			{children}
		</ContributionCurrencyContext.Provider>
	);
};
