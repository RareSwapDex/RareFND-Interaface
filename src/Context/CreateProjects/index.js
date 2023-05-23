import { createContext, useState } from "react";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectProvider = ({ children }) => {
	const [projectData, setProjectData] = useState({});

	const saveProjectData = (data) => {
		setProjectData({ ...projectData, data });
	};

	return (
		<ProjectContext.Provider value={{ projectData, saveProjectData }}>
			{children}
		</ProjectContext.Provider>
	);
};
