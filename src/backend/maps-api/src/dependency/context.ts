import { IMClient } from "../im-api/imclient";

export class Context
{
	// This should not be done like this & master key should probably be
	// stored somewhere secure, as well as session keys, but for the sake
	// of simplicity & easy access, this temporary setup has been made.

	// Master token could also be associated with the user ID from session,
	// but since session here was not required to be implemented, this could
	// represent an emulated session. For instance, master key could be stored
	// in a database, encrypted with AES with user password.

	// Session tokens (which are stored inside /storage folder) could also
	// be encrypted similarly. The reason they are stored there are purly
	// for reuse purposes (so that we don't need to generate new tokens
	// if we already have one available).

	private static Client: IMClient = new IMClient("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6InA3c2RYcVVIdm8iLCJpYXQiOjE1ODYzNDcwNDgsImV4cCI6MTYxNzg4MzA0OH0.w3quhvR49MS6m5Jch6w0Y2r_H_h1TvCiujYWaB0XlzY");

	public static ResolveClient(): IMClient
	{
		return this.Client;
	}
}
