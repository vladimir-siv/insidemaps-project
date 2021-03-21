import * as React from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Routes from "../../system/routes";

import { Event } from "../../common/events";
import { ReactEventArgs } from "../../common/events";

export interface DrawerProps { }
export interface DrawerState { open: boolean }

export default class Drawer extends React.Component<DrawerProps, DrawerState>
{
	public pageClick = new Event<number>();

	state: DrawerState =
	{
		open: false
	};

	private shouldSkipEvent(event: ReactEventArgs): boolean
	{
		return event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift");
	}

	public openDrawer = (event: ReactEventArgs) =>
	{
		if (this.shouldSkipEvent(event)) return;
		this.setState({ open: true });
	}

	public closeDrawer = (event: ReactEventArgs) =>
	{
		if (this.shouldSkipEvent(event)) return;
		this.setState({ open: false });
	}

	public toggleDrawer = (event: ReactEventArgs) =>
	{
		if (this.shouldSkipEvent(event)) return;
		this.setState({ open: !this.state.open });
	}

	render()
	{
		return (
			<div>
				<React.Fragment>
					<SwipeableDrawer
						anchor="left"
						open={this.state.open}
						onClose={this.closeDrawer}
						onOpen={this.openDrawer}
					>
						<div
							role="presentation"
							onClick={this.closeDrawer}
							onKeyDown={this.closeDrawer}
						>
							<List>
								{
									Routes.map
									(
										(route) =>
										(
											<ListItem
												key={ route.id }
												button
												onClick={ () => this.pageClick.fire(route.id) }
												style={{ width: 220 }}
											>
												<ListItemIcon>{ route.icon }</ListItemIcon>
												<ListItemText primary={ route.name } />
											</ListItem>
										)
									)
								}
							</List>
						</div>
					</SwipeableDrawer>
				</React.Fragment>
			</div>
		);
	}
}
