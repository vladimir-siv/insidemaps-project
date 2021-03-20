import https from "https";

import { Exception } from "../exceptions/exception";
import { URI } from "../services/uri";
import { RequestData } from "./requestdata";
import { ResponseData } from "./responsedata";

export class HttpsClient
{
	request(reqData: RequestData): Promise<ResponseData>
	{
		if (!reqData.URL.startsWith("https://"))
		{
			throw new Exception("Only 'https' is allowed.");
		}

		let { hostname, path } = URI.parse(reqData.URL);
		
		let options =
		{
			hostname: hostname,
			port: 443,
			path: path,
			method: reqData.Method,
			headers: reqData.Headers
		};

		return new Promise((resolve, reject) =>
		{
			let req = https.request(options, response =>
			{
				let data = "";
				response.on("data", chunk => data += chunk);
				response.on("end", () => resolve(new ResponseData(response, data)));
				response.on("error", err => reject(err));
			});

			req.on("error", err => reject(err));
			if (reqData.Body !== null) req.write(reqData.Body);
			req.end();
		});
	}
}
