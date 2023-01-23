const path = require("path");

const home = path.join(__dirname, "..", "views", "index.ejs");
const feed = path.join(__dirname, "..", "views", "feed.ejs");
const form = path.join(__dirname, "..", "views", "form.html");

const upload = path.join(__dirname, "..", "uploads");
const database = path.join(__dirname, "..", "..", "database", "data.json");

const userPhoto = (userWhoUploaded, filename) =>
	path.join(__dirname, "..", "photos", `${userWhoUploaded}`, filename);

const photo = (userWhoUploaded, filename) =>
	path.join("photos", userWhoUploaded, filename);

const fullImage = (imageFilePath) => path.join(__dirname, "..", imageFilePath);

module.exports = {
	home,
	feed,
	form,
	upload,
	database,
	userPhoto,
	photo,
	fullImage,
};
