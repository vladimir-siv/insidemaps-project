import { Exception } from "./exception";

export class FormatException extends Exception
{
	constructor(message: string)
	{
		super(message);
	}
}
