import { Exception } from "./exception";

export class HttpsException extends Exception
{
	constructor(message: string)
	{
		super(message);
	}
}
