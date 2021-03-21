import React from "react";
import "./App.css";

import Header from "./components/layout/header";
import Drawer from "./components/layout/drawer";
import Router from "./components/layout/router";

import Path from "./system/path";

import { EventHandler } from "./common/events";

export interface AppProps { }
export interface AppState { }

export default class App extends React.Component<AppProps, AppState>
{
	private static instance: App;
	public static Get(): App { return this.instance; }

	private header: React.RefObject<Header> = React.createRef();
	private drawer: React.RefObject<Drawer> = React.createRef();
	private router: React.RefObject<Router> = React.createRef();

	public Router(): Router
	{
		return this.router.current as Router;
	}

	componentDidMount()
	{
		App.instance = this;

		let header = this.header.current;
		let drawer = this.drawer.current;
		let router = this.router.current;

		if (drawer !== null)
		{
			let handler = new EventHandler(drawer.openDrawer);
			header?.menuItemClick.subscribe(handler);
		}

		if (router !== null)
		{
			let handler = new EventHandler((id: number) => router?.navigate(new Path([ id ])));
			drawer?.pageClick.subscribe(handler);
		}
	}

	render()
	{
		return (
			<div className="App">
				<Header ref={this.header}/>
				<Drawer ref={this.drawer}/>
				<Router ref={this.router}/>
			</div>
		);
	}
}
