const url = require("url"),
	{ unlink, writeFile } = require("fs").promises,
	path = require("./paths"),
	{ filterDb } = require("./databaseHelper");

const deleteImg = async (req, res) => {
	const deleteObj = url.parse(req.url, true);
	const username = deleteObj.query.username;
	const imageFilePath = deleteObj.query.imgpath;
	const deleteIndex = deleteObj.query.delete;
	const fullImageFilePath = path.fullImage(imageFilePath);

	const jsonDb = filterDb(username, "deleteImage", deleteIndex);

	await writeFile(path.database, jsonDb);
	await unlink(fullImageFilePath);

	res.writeHead(301, { location: `/feed?username=${username}` });
	res.end();
};

module.exports = { deleteImg };
