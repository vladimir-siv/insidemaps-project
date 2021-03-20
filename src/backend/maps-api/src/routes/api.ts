import express from "express";
import { Context } from "../dependency/context";
import { Organization } from "../models/organization";
import { Project } from "../models/project";

export const router = express.Router();

router.get("/organizations", async (req, res, next) =>
{
	let client = Context.ResolveClient();
	
	let response = await client.req("/organizations");
	let json = JSON.parse(response.Body);
	
	let organizations: Organization[] = [];

	for (let id of json.data)
	{
		response = await client.req("/organizations/" + id);
		json = JSON.parse(response.Body);

		organizations.push
		(
			new Organization
			(
				json.data.id,
				json.data.name,
				new Date(json.data.createdAt)
			)
		);
	}

	res.json({ organizations });
});

router.get("/projects/:organizationId", async(req, res, next) =>
{
	let client = Context.ResolveClient();

	let id = req.params.organizationId;

	console.log("fetching projects . . .");
	let response = await client.req("/organizations/" + id + "/projects?updatedSince=2021-03-19T00:00:00Z&status=all");
	let json = JSON.parse(response.Body);
	console.log("fetched " + json.data.length + " projects!");

	let projects: Project[] = [];

	for (let id of json.data)
	{
		response = await client.req("/projects/" + id);
		json = JSON.parse(response.Body);

		projects.push
		(
			new Project
			(
				id,
				json.data.name,
				json.data.status,
				json.data.package,
				json.data.street,
				json.data.city,
				json.data.state,
				json.data.country,
				new Date(json.data.createdAt)
			)
		);
	}

	res.json({ projects });
});
