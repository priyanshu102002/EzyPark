const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
	const url =
		"mongodb+srv://priyanshukr449:V0wyA9yqz6IOyZub@ezyparkdb.rxygru1.mongodb.net/ezyparking";

	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection.once("open", async () => {
		console.log("Connected to database");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error connecting to database  ", err);
	});
};

module.exports = {
	connectDB,
};
