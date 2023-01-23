const url = require("url"),
	{ createReadStream } = require("fs"),
	path = require("path"),
	mimetype = require("../../database/mimetype.json");

const mimetypeHelper = (req, res) => {
	const file = url.parse(req.url, true);
	const fileMimeType = mimetype[path.extname(req.url)];
	if (!fileMimeType) {
		return;
	}
	res.setHeader("Content-Type", fileMimeType);
	const filePath = path.join(__dirname, "..", file.pathname);
	createReadStream(filePath).pipe(res);
};

module.exports = { mimetypeHelper };
