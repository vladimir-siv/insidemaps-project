import * as React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Organization from "../../models/organization";

import Path from "../../system/path";
import App from "../../App";

export interface OrganizationsPageProps { }
export interface OrganizationsPageState { organizations: Organization[] }

export default class OrganizationsPage extends React.Component<OrganizationsPageProps, OrganizationsPageState>
{
	state: OrganizationsPageState =
	{
		organizations: []
	};
	
	constructor(props: OrganizationsPageProps)
	{
		super(props);
		
		fetch("api/organizations").then(response =>
		{
			response.text().then(data =>
			{
				this.setState({ organizations: JSON.parse(data).organizations });
			});
		});
	}

	navigateToOrganization = (organization: Organization) =>
	{
		let router = App.Get().Router();
		router.navigate(new Path([ 1, 0 ], organization));
	}

	render()
	{
		return (
			<React.Fragment>
			<Box color="text.primary">
				<h4>Here is the list of all organizations</h4>
			</Box>
			<Container maxWidth="xs">
				<List>
				{
					this.state.organizations.map
					(
						organization =>
						(
							<ListItem
								key={organization.Id}
								button
								onClick={ () => this.navigateToOrganization(organization) }
							>
								<ListItemText
									primary={ organization.Name }
									style={{ textAlign: "center" }}
								/>
							</ListItem>
						)
					)
				}
				</List>
			</Container>
			</React.Fragment>
		);
	}
}
