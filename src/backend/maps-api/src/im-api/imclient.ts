import fs from "fs";
import crypto from "crypto";

import { HttpsClient} from "../common/https/client";
import { RequestData } from "../common/https/requestdata";
import { ResponseData } from "../common/https/responsedata";
import { HttpsException } from "../common/exceptions/httpsexception";

// Storage operations could be abstracted away in some kind of StorageController,
// but since there is not much logic need for it, I decided to place it here.

export class IMClient
{
	private readonly IMAPI: string = "https://www.insidemaps.com/api/v2";
	private readonly STORAGE: string = "./storage/";

	private MasterToken: string;
	private SessionToken: string;

	private MTHash: string;
	private Client: HttpsClient;

	constructor(masterToken: string)
	{
		if (!fs.existsSync(this.STORAGE))
		{
			fs.mkdirSync(this.STORAGE);
		}

		this.MasterToken = masterToken;
		this.SessionToken = "";

		let SHA256 = crypto.createHash("sha256");
		SHA256.write(masterToken);
		this.MTHash = SHA256.digest("base64").replace("/", "#_");
		this.Client = new HttpsClient();
	}

	private saveSessionToken(): void
	{
		// Session keys should probably be encrypted here before writing them to the file
		fs.writeFileSync(this.STORAGE + this.MTHash, this.SessionToken); 
	}

	private loadSessionToken(): void
	{
		// Likewise they should be decrypted here when read
		this.SessionToken = fs.readFileSync(this.STORAGE + this.MTHash, "utf8");
	}

	private async getNewToken(): Promise<void>
	{
		let response = await this.Client.request
		(
			new RequestData
			(
				this.IMAPI + "/sessionToken",
				"GET",
				{ "Authorization": "Bearer " + this.MasterToken },
			)
		);

		let body = JSON.parse(response.Body);
		this.SessionToken = body.data;
		this.saveSessionToken();
	}

	public async request(reqData: RequestData): Promise<ResponseData>
	{
		if (this.SessionToken == "")
		{
			try
			{
				this.loadSessionToken();
			}
			catch
			{
				await this.getNewToken();
			}
		}

		reqData.URL = this.IMAPI + reqData.URL;
		if (reqData.Headers == null) reqData.Headers = { };
		reqData.Headers["Authorization"] = "Bearer " + this.SessionToken;
		let response = await this.Client.request(reqData);
		
		if (response.Meta.statusCode == 401)
		{
			await this.getNewToken();
			response = await this.Client.request(reqData);
		}

		if (response.Meta.statusCode != 200)
		{
			throw new HttpsException("Server did not respond with status code 200.");
		}

		return response;
	}

	public req(path: string, method: string = "GET"): Promise<ResponseData>
	{
		// This is just a shortcut method for common cases
		return this.request(new RequestData(path, method));
	}
}
