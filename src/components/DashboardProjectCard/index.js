import { Card } from "antd";

export default function DashboardProject(props) {
	const { project } = props;
	console.log(project);
	return (
		<div style={{ maxWidth: "800px" }}>
			<Card style={{ display: "flex", maxWidth: "80%" }}>
				<img
					alt={project.title}
					src={project.thumbnail}
					style={{ width: "35%" }}
				/>
				<div style={{ width: "65%" }}>
					<Card.Meta title={project.title} description={project.description} />
					<div>
						<a href={`/edit/${project.id}`}>Edit Project</a>
						<a href={`/view/${project.id}`}>View Project</a>
						<span>{project.status}</span>
					</div>
				</div>
			</Card>
		</div>
	);
}
