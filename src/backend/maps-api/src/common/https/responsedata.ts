import http from "http";

export class ResponseData
{
	constructor
	(
		public Meta: http.IncomingMessage,
		public Body: string
	)
	{

	}
}
