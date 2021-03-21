import express from "express";
import { Context } from "../dependency/context";
import { Organization } from "../models/organization";
import { Project } from "../models/project";
import { ResponseData } from "../common/https/responsedata";

export const router = express.Router();

router.get("/organizations", async (req, res, next) =>
{
	let client = Context.ResolveClient();
	
	let response = await client.req("/organizations");
	let json = JSON.parse(response.Body);
	
	let organizations: Organization[] = [];

	let requests: Promise<ResponseData>[] = [];

	for (let id of json.data)
	{
		let request = client.req("/organizations/" + id);
		requests.push(request);
	}

	for (let request of requests)
	{
		response = await request;
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

router.get("/projects/:organizationId/:startDate/:endDate", async(req, res, next) =>
{
	let client = Context.ResolveClient();

	let id = req.params.organizationId;
	let updatedSince = req.params.startDate;
	let updatedTo = req.params.endDate;
	
	let response = await client.req("/organizations/" + id + "/projects?updatedSince=" + updatedSince + "&updatedTo=" + updatedTo + "&status=all");
	let json = JSON.parse(response.Body);
	
	let projects: Project[] = [];
	
	let requests: Promise<ResponseData>[] = [];
	let counter = 0;

	for (let id of json.data)
	{
		let request = client.req("/projects/" + id);
		requests.push(request);

		// Limit the number of projects a user can fetch at one point.
		// Ideally, some sort of pagination should be made here.
		if (++counter == 150) break;
	}

	for (let request of requests)
	{
		response = await request;
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
