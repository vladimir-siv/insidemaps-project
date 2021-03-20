export class RequestData
{
	constructor
	(
		public URL: string,
		public Method: string,
		public Headers: any = null,
		public Body: string | null = null
	)
	{
		
	}
}
