const formidable = require("formidable"),
	path = require("./paths"),
	{ writeFile, rename } = require("fs").promises,
	{ filterDb } = require("./databaseHelper"),
	{ PLAIN_TEXT } = require("../util/util");

const options = {
	multiples: true,
	keepExtensions: true,
	uploadDir: path.upload,
};

const form = formidable(options);

const formidableHelper = (req, res) => {
	form.parse(req, async (err, fields, files) => {
		if (err) {
			const ERROR = err.httpCode || 400;
			res.writeHead(ERROR, PLAIN_TEXT);
			return res.end(String(err));
		}
		try {
			const userWhoUploaded = fields.upload;
			const uploadsFilePath = files.upload.filepath;
			const filename = files.upload.newFilename;

			const userPhotoPath = path.userPhoto(userWhoUploaded, filename);

			const jsonDb = filterDb(userWhoUploaded, "uploadImage", filename);

			await writeFile(path.database, jsonDb);
			await rename(uploadsFilePath, userPhotoPath);
			const photoPath = path.photo(userWhoUploaded, filename);

			res.writeHead(301, { location: `/` });
			res.end();
		} catch (error) {
			console.log(error);
		}
	});
};

module.exports = { formidableHelper };
