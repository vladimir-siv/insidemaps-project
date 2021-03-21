import * as React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Organization from "../../models/organization";
import Project from "../../models/project";
import App from "../../App";

export interface OrganizationPageProps { }
export interface OrganizationPageState { projects: Project[], startDate: string, endDate: string }

export default class OrganizationPage extends React.Component<OrganizationPageProps, OrganizationPageState>
{
	state: OrganizationPageState =
	{
		projects: [],
		startDate: new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toISOString().replace("Z", ""),
		endDate: new Date().toISOString().replace("Z", "")
	};

	searchProjects = (organizationId: string) =>
	{
		let target = "api/projects/" + organizationId + "/" + this.state.startDate + "Z/" + this.state.endDate + "Z";

		fetch(target).then(response =>
		{
			response.text().then(data =>
			{
				this.setState({ projects: JSON.parse(data).projects });
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

		return (
			<React.Fragment>
				<Box color="text.primary">
					<h4>{organization.Name}</h4>
				</Box>
				<TextField
					id="datetime-local"
					label="Start date"
					type="datetime-local"
					value={this.state.startDate}
					style={{ marginTop: 10 }}
					InputLabelProps=
					{{
						shrink: true,
					}}
				/>
				
				<br/>
				
				<TextField
					id="datetime-local"
					label="End date"
					type="datetime-local"
					value={this.state.endDate}
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
				>
					Find Projects
				</Button>
				
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
