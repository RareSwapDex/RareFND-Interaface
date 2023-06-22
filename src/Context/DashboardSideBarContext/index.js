import { createContext, useState } from "react";

const DashboardSideBarContext = createContext();

export default DashboardSideBarContext;

export const DashboardSideBarProvider = ({ children }) => {
	const [ShowDashboardSideBar, setShowDashboardSideBar] = useState(true);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const alterShowDashboardSideBar = () => {
		setShowDashboardSideBar(!ShowDashboardSideBar);
	};

	return (
		<DashboardSideBarContext.Provider
			value={{
				ShowDashboardSideBar,
				setShowDashboardSideBar,
				selectedTabIndex,
				setSelectedTabIndex,
			}}
		>
			{children}
		</DashboardSideBarContext.Provider>
	);
};
