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
export interface OrganizationsPageState { }

export default class OrganizationsPage extends React.Component<OrganizationsPageProps, OrganizationsPageState>
{
	organizations: Organization[] = [];
	
	constructor(props: OrganizationsPageProps)
	{
		super(props);
		
		const response = JSON.parse('{"organizations":[{"Id":"IMXmiLCBks","Name":"danicatest","CreatedAt":"2017-06-19T11:25:26.731Z"},{"Id":"9I2G5Floqi","Name":"niksaOrganizacija","CreatedAt":"2017-09-25T14:37:16.965Z"},{"Id":"yvOGXBTZB2","Name":"testBuda","CreatedAt":"2020-07-28T16:19:16.801Z"},{"Id":"p7sdXqUHvo","Name":"danicaOrganizacija","CreatedAt":"2017-05-31T10:42:15.598Z"}]}');

		this.organizations = response.organizations;
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
					this.organizations.map
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
