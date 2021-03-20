import { FormatException } from "../exceptions/formatexception";

export class URI
{
	static parse(uri: string) : { hostname: string, path: string }
	{
		let protocolIndex = uri.indexOf("://");

		if (protocolIndex < 0) throw new FormatException("Invalid URI format.");

		uri = uri.substring(protocolIndex + 3);

		let domainIndex = uri.indexOf("/");

		if (domainIndex < 0) throw new FormatException("Invalid URI format.");

		let hostname = uri.substring(0, domainIndex);
		let path = uri.substring(domainIndex);

		return { hostname, path };
	}
}
