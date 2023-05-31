import config from "./config/index";
import app from "./app";

// getting-started.js
const mongoose = require("mongoose");

async function main() {
	try {
		await mongoose.connect(config.database_url as string);
		console.log("Connected");

		app.listen(config.port, () => {
			console.log(
				`Application  listening on port ${config.port}`
			);
		});
	} catch (error) {
		console.log("Failed to connect database", error);
	}

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();

