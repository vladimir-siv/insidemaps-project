import * as React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Organization from "../../models/organization";
import Project from "../../models/project";
import App from "../../App";

export interface OrganizationPageProps { }
export interface OrganizationPageState { projects: Project[], loading: boolean }

export default class OrganizationPage extends React.Component<OrganizationPageProps, OrganizationPageState>
{
	private startDate: HTMLDivElement | null = null;
	private endDate: HTMLDivElement | null = null;

	state: OrganizationPageState =
	{
		projects: [],
		loading: false
	};

	searchProjects = (organizationId: string) =>
	{
		let startDate = this.startDate?.querySelector("input")?.value;
		let endDate = this.endDate?.querySelector("input")?.value;

		let target = "api/projects/" + organizationId + "/" + startDate + "Z/" + endDate + "Z";
		
		this.setState({ projects: [], loading: true });

		fetch(target).then(response =>
		{
			response.text().then(data =>
			{
				this.setState({ projects: JSON.parse(data).projects, loading: false });
			});
		});
	}

	render()
	{
		const organization = App.Get().Router().arg() as Organization;

		const bull = <span
				style=
				{{
					display: "inline-block",
					margin: "0 2px",
					transform: "scale(0.8)",
				}}
			>
				•
			</span>;
		
		const loader = this.state.loading ? <CircularProgress style={{ marginTop: 20 }} /> : <div />;

		return (
			<React.Fragment>
				<Box color="text.primary">
					<h4>{organization.Name}</h4>
				</Box>

				<TextField
					ref={e => this.startDate = e}
					id="datetime-local"
					label="Start date"
					type="datetime-local"
					defaultValue={new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toISOString().replace("Z", "")}
					style={{ marginTop: 10 }}
					InputLabelProps=
					{{
						shrink: true,
					}}
				/>
				
				<br/>
				
				<TextField
					ref={e => this.endDate = e}
					id="datetime-local"
					label="End date"
					type="datetime-local"
					defaultValue={new Date().toISOString().replace("Z", "")}
					style={{ marginTop: 10 }}
					InputLabelProps=
					{{
						shrink: true,
					}}
				/>

				<br/>
				
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: 10 }}
					onClick={ () => this.searchProjects(organization.Id) }
					disabled={this.state.loading}
				>
					Find Projects
				</Button>

				<br />

				{ loader }
				
				<Container maxWidth="sm">
				{
					this.state.projects.map
					(
						project =>
						(
							<Card
								key={project.Id}
								variant="outlined"
								style={{ minWidth: 275, marginTop: 20 }}
							>
								<CardContent>
									<Typography variant="h4" color="textPrimary" gutterBottom>
										{project.Name}
									</Typography>
									<Typography variant="h6" component="h2">
										{project.Street}{bull}{project.City}{bull}{project.Country}
									</Typography>
									<Typography style={{ marginBottom: 12 }} color="textSecondary">
										Status: {project.Status}
									</Typography>
									<Typography variant="body2" component="p">
										Package: {project.Package}
									</Typography>
								</CardContent>
								<CardActions>
									<Typography component="p">{ new Date(project.CreatedAt).toLocaleString() }</Typography>
								</CardActions>
							</Card>
						)
					)
				}
				</Container>
			</React.Fragment>
		);
	}
}
