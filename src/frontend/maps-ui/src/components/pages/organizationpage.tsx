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
export interface OrganizationPageState { }

export default class OrganizationPage extends React.Component<OrganizationPageProps, OrganizationPageState>
{
	projects: Project[] = [];

	constructor(props: OrganizationPageProps)
	{
		super(props);

		const response = JSON.parse('{"projects":[{"Id":"d9KtN1EO8n","Name":"Vcaxx upload test","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"a","CreatedAt":"2019-04-22T07:15:23.153Z"},{"Id":"cpixNOJikf","Name":"aaa","Status":"finished","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"Serbia","CreatedAt":"2019-03-04T13:39:11.042Z"},{"Id":"AC2iUjj8JQ","Name":"test spin upload fail","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-03-04T13:27:07.495Z"},{"Id":"lGwdkddAPi","Name":"test change floor - fix","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-02-22T13:29:04.526Z"},{"Id":"d7zEsOU2oA","Name":"test change floor","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-02-22T13:15:32.274Z"},{"Id":"Tif4ai77b0","Name":"new recovery 2","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:54:21.897Z"},{"Id":"jBDfUb8jFd","Name":"new recovery 1","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:48:20.381Z"},{"Id":"De7sDm0zts","Name":"recovery 3","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:41:45.310Z"},{"Id":"Tk9qnLX8D6","Name":"recovery 1","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:25:36.336Z"},{"Id":"IATmHSeeYF","Name":"no floor","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-01-23T17:04:57.372Z"},{"Id":"P9XeMJkOwb","Name":"no room 2","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-01-23T17:00:55.307Z"},{"Id":"ASnh2wH1Gu","Name":"no room","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-01-23T16:47:22.874Z"},{"Id":"uzHjIKiOzD","Name":"no spin","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-01-23T16:35:22.244Z"},{"Id":"AbfdpZ7bhT","Name":"Per spin project","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-01-14T13:56:15.184Z"},{"Id":"f5RtwSsRVh","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-12-06T17:38:53.259Z"},{"Id":"ClYeENvkJ5","Name":"10 Nušićeva","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-12-03T18:03:40.164Z"},{"Id":"chAs4mt4lC","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-11-30T18:14:41.417Z"},{"Id":"PPSBC5KUpI","Name":"2 created 1 edited","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"Serbia","CreatedAt":"2018-11-05T17:32:35.969Z"},{"Id":"FnwIP6ANi9","Name":"1 created 2 edited","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"Serbia","CreatedAt":"2018-11-05T17:32:17.892Z"},{"Id":"6Nykc4oVzn","Name":"niksa 3","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-11-02T14:38:18.315Z"},{"Id":"ozPP8HmJzb","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-11-02T14:34:37.346Z"},{"Id":"djOQwUQ9ue","Name":"12 Nušićeva","Status":"processing","Package":"STANDARD","Street":"12 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-11-02T14:12:03.156Z"},{"Id":"stk5UTHYXq","Name":"nesto","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"a","CreatedAt":"2018-11-02T14:11:41.852Z"},{"Id":"KhRZIHGdY9","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-29T14:24:16.857Z"},{"Id":"wDUNcIE7rl","Name":"Čavketov pasaž","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-24T16:46:26.621Z"},{"Id":"nmOLUdn085","Name":"Čavketov pasaž","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-24T16:44:41.946Z"},{"Id":"ooyRcZvH2d","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T17:49:35.733Z"},{"Id":"PIlHEetyau","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T17:21:12.320Z"},{"Id":"Wt9FcGKTCr","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T17:09:16.556Z"},{"Id":"iwvHMAn4xF","Name":"5 Nušićeva","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T17:02:53.591Z"},{"Id":"4v2JhTsCxW","Name":"maprtag😘","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T16:44:47.604Z"},{"Id":"83zZqC3WxD","Name":"wrong status bug test","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-22T16:43:56.939Z"},{"Id":"qUbUF5lKy1","Name":"Čavketov pasaž","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-22T16:36:33.952Z"},{"Id":"HdybeITeEa","Name":"one spin uploading","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-18T15:35:04.093Z"},{"Id":"bRjxxPp6aP","Name":"bad status after update","Status":"processing","Package":"STANDARD","Street":"12 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-18T15:30:21.347Z"},{"Id":"kunZcuVzBQ","Name":"wierd project status bug test","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"a","CreatedAt":"2018-10-18T14:23:28.025Z"},{"Id":"2oqUO0N4XE","Name":"dandandan","Status":"processing","Package":"STANDARD","Street":"12 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-16T10:47:53.852Z"},{"Id":"gkqWPLWFIA","Name":"Test connections joca","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-15T12:44:05.406Z"},{"Id":"5cZ7SWmpVj","Name":"latest capture pattern test","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-09-21T11:27:15.624Z"},{"Id":"2uxaJ7qzMb","Name":"New capture pattern test","Status":"processing","Package":"STANDARD","Street":"no address","City":"11120 ","State":"","Country":"Serbia","CreatedAt":"2018-09-14T16:40:31.855Z"},{"Id":"2VfzJo6mq6","Name":"120 pano test","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-09-10T15:16:52.140Z"},{"Id":"WSC3upxPWz","Name":"1 Branka Krsmanovića","Status":"processing","Package":"STANDARD","Street":"1 Branka Krsmanovića","City":"Beograd","Country":"Serbia","CreatedAt":"2018-09-06T17:33:55.254Z"},{"Id":"B7LnxRprRS","Name":"test floor","Status":"created","Package":"STANDARD","Street":"1 Branka Krsmanovića","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-09-06T17:17:04.318Z"},{"Id":"5EMrMiXdeL","Name":"1 Branka Krsmanovića","Status":"processing","Package":"STANDARD","Street":"1 Branka Krsmanovića","City":"Beograd","Country":"Serbia","CreatedAt":"2018-09-06T17:10:26.588Z"},{"Id":"DxaYtC6ME0","Name":"Test unlock floors","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-09-06T13:36:06.515Z"},{"Id":"ORtoKinHvj","Name":"Чавкетов пасаж","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","Country":"Serbia","CreatedAt":"2018-06-12T11:01:13.428Z"},{"Id":"pT74bRKADB","Name":"recovery 2","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:22:09.047Z"},{"Id":"GCiKTuXGE8","Name":"Second Not Submitted!!!!","Status":"finished","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-24T14:56:42.215Z"},{"Id":"7EdJDpSACu","Name":"asetirazni","Status":"processing","Package":"Standard","Street":"12a Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-06-19T12:16:34.122Z"},{"Id":"c7uhs8BlfJ","Name":"19 Dečanska","Status":"processing","Package":"STANDARD","Street":"19 Dečanska","City":"Beograd","Country":"Serbia","CreatedAt":"2019-06-24T11:15:36.638Z"},{"Id":"ng7dRAk6DZ","Name":"First Submitted!!!!","Status":"finished","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-24T14:50:33.513Z"},{"Id":"YKGptHf5OL","Name":"no project","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-23T17:14:27.257Z"},{"Id":"Mb6MIu3ghd","Name":"10 Nušićeva","Status":"processing","Package":"STANDARD","Street":"10 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2019-01-18T16:16:07.802Z"},{"Id":"KUgcgh1mFX","Name":"No Finished At Time","Status":"finished","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-24T14:59:34.579Z"},{"Id":"yXiFt3p5sn","Name":"propropro","Status":"processing","Package":"PRO","Street":"Чавкетов пасаж","City":"Belgrade","State":"","Country":"Serbia","CreatedAt":"2018-04-05T16:29:51.412Z"},{"Id":"MgLwvrzJ6j","Name":"Second Submitted!!!!","Status":"finished","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-24T14:53:55.299Z"},{"Id":"WznfcniAEm","Name":"First Not Submitted!!!!","Status":"finished","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-24T14:52:29.557Z"},{"Id":"nKqAXQv9Pk","Name":"joca matching project 1","Status":"processing","Package":"Standard","Street":"12 Dečanska","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2019-08-28T14:13:41.939Z"},{"Id":"T3YKiiSHGq","Name":"testing","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","State":"","Country":"Serbia","CreatedAt":"2018-06-12T10:41:09.868Z"},{"Id":"Ibow82KpKN","Name":"rock","Status":"processing","Package":"PRO","Street":"hardplace","City":"Belgrade","State":"","Country":"Serbia","CreatedAt":"2018-04-12T16:16:22.902Z"},{"Id":"SpyQ7obKkb","Name":"danicadanica","Status":"processing","Package":"STANDARD","Street":"ladana","City":"la","State":"","Country":"la","CreatedAt":"2018-03-26T11:23:34.821Z"},{"Id":"HQ8vto9Bfw","Name":"danadanica","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","Country":"Serbia","CreatedAt":"2018-08-17T14:11:36.500Z"},{"Id":"idyYLZjAox","Name":"960cmplafonsinle","Status":"processing","Package":"STANDARD","Street":"12 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-17T11:15:39.080Z"},{"Id":"mkFZWfuMdf","Name":"test5","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","State":"","Country":"Serbia","CreatedAt":"2018-06-18T15:12:32.318Z"},{"Id":"9cHi2R8FQA","Name":"300x2cm","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-17T17:31:06.467Z"},{"Id":"prbqkdn87I","Name":"Чавкетов пасаж","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","Country":"Serbia","CreatedAt":"2018-06-22T15:08:55.190Z"},{"Id":"2lmckaJVAE","Name":"Чавкетов пасаж","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","Country":"Serbia","CreatedAt":"2018-06-13T09:35:35.075Z"},{"Id":"BFYxFlStBW","Name":"empty rooms","Status":"processing","Package":"STANDARD","Street":"5 Nušićeva","City":"Beograd","State":"","Country":"Serbia","CreatedAt":"2018-10-22T13:41:49.405Z"},{"Id":"fPeTOCIVA4","Name":"herostandard","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","State":"","Country":"Serbia","CreatedAt":"2018-05-09T14:30:37.324Z"},{"Id":"NawfdCjvSt","Name":"Чавкетов пасаж","Status":"processing","Package":"STANDARD","Street":"Чавкетов пасаж","City":"Belgrade","Country":"Serbia","CreatedAt":"2018-08-17T12:03:33.829Z"},{"Id":"GmB0duyq6z","Name":"4 Косовска","Status":"processing","Package":"STANDARD","Street":"4 Косовска","City":"11000 ","Country":"Serbia","CreatedAt":"2018-05-11T11:02:07.056Z"},{"Id":"8nPDa5kwrj","Name":"600incsingletake","Status":"processing","Package":"STANDARD","Street":"Čavketov pasaž","City":"Beograd","Country":"Serbia","CreatedAt":"2018-10-17T11:09:13.816Z"},{"Id":"cVNS0lt6Dy","Name":"offline3","Status":"processing","Package":"STANDARD","Street":"a","City":"a","State":"","Country":"a","CreatedAt":"2018-10-18T14:42:18.795Z"}]}');
		
		this.projects = response.projects;
	}

	render()
	{
		const organization = App.Get().Router().arg() as Organization;

		const now = new Date();
		const before = new Date(now.getTime() - 48 * 60 * 60 * 1000);

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
					defaultValue={before.toISOString().replace("Z", "")}
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
					defaultValue={now.toISOString().replace("Z", "")}
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
				>
					Find Projects
				</Button>
				
				<Container maxWidth="sm">
					{
						this.projects.map
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
