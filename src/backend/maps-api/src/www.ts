// NOTE: This file represents the entry point to express app which setups the server.
// The "real" entry point is the 'app.ts' file.

import http from "http";
import debug from "debug";

import { app } from "./app";

let binder = process.env.PORT || "3000";
let port = parseInt(binder);

app.set("port", isNaN(port) ? binder : port);

let server = http.createServer(app);
server.listen(port);

server.on("error", (error: any) =>
{
	if (error.syscall !== "listen")
	{
		throw error;
	}

	let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code)
	{
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
});

server.on("listening", () =>
{
	let addr = server.address();
	let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
	debug("maps-api:server")("Listening on " + bind);
});
