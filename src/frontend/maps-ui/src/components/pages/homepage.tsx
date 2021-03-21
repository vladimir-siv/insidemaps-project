import * as React from "react";

import Box from "@material-ui/core/Box";

export interface HomePageProps { }
export interface HomePageState { }

export default class HomePage extends React.Component<HomePageProps, HomePageState>
{
	render()
	{
		return (
			<Box color="text.primary">
				<h4>Welcome to MAPS UI</h4>
				<p>This is a potential home page for the application. Some content can be added here.</p>
			</Box>
		);
	}
}
