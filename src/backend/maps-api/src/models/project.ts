export class Project
{
	constructor
	(
		public Id: string,
		public Name: string,
		public Status: string,
		public Package: string,
		public Street: string,
		public City: string,
		public State: string,
		public Country: string,
		public CreatedAt: Date
		// We can add more properties if we need them inside our model
	)
	{

	}
}
