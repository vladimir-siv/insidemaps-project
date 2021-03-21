import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { Event } from "../../common/events";
import { ReactEventArgs } from "../../common/events";

export interface HeaderProps { }
export interface HeaderState { }

export default class Header extends React.Component<HeaderProps, HeaderState>
{
	public menuItemClick = new Event<ReactEventArgs>();

	render()
	{
		return (
			<AppBar position="static" color="secondary">
				<Toolbar>
					<IconButton
						edge="start"
						style={{ color: "white" }}
						onClick=
						{
							e =>
							{
								if (this.menuItemClick !== null)
								{
									this.menuItemClick.fire(e);
								}
							}
						}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						style={{ flexGrow: 1 }}
					>
						MAPS UI
					</Typography>
					<Button
						startIcon={<ExitToApp />}
						style={{ color: "white" }}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}
