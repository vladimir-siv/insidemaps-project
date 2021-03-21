import * as React from "react";

import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import Path from "../../system/path";
import Routes from "../../system/routes";

export interface RouterProps { }
export interface RouterState { route: Path }

export default class Router extends React.Component<RouterProps, RouterState>
{
	state: RouterState =
	{
		route: new Path([ 0 ])
	};

	public navigate = (route: Path) =>
	{
		this.setState({ route });
	}

	public arg = () =>
	{
		return this.state.route.arg;
	}

	render()
	{
		let names: string[] = [];

		let current = Routes[this.state.route.path[0]];
		names.push(current.name);

		for (let i = 1; i < this.state.route.path.length; ++i)
		{
			current = current.subpages[this.state.route.path[i]];
			names.push(current.name);
		}

		return (
			<Container>
				<Breadcrumbs
					style={{ flexGrow: 1, paddingTop: 20 }}
				>
					{
						this.state.route.path.map
						(
							(id, index) =>
							(
								<Typography key={index} color="inherit">
									{ names[index] }
								</Typography>
							)
						)
					}
				</Breadcrumbs>
				{ current.component }
			</Container>
		);
	}
}
