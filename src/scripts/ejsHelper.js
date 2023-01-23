const { renderFile } = require("ejs"),
	{ getUserData, getData } = require("./databaseHelper"),
	path = require("./paths"),
	{ DEFAULT_HEADER } = require("../util/util"),
	url = require("url");

const ejsHelper = {
	renderHome: async (req, res) => {
		try {
			const data = getData();
			const html = await renderFile(path.home, data);
			res.writeHead(200, DEFAULT_HEADER);
			res.end(html);
		} catch (err) {
			ejsHelper.renderError;
		}
	},
	renderFeed: async (req, res) => {
		try {
			const userClicked = url.parse(req.url, true).query.username;
			const user = getUserData(userClicked);
			const userData = { user: user };
			const html = await renderFile(path.feed, userData);
			res.writeHead(200, DEFAULT_HEADER);
			res.end(html);
		} catch (err) {
			ejsHelper.renderError;
		}
	},
	renderError: (req, res) => {
		const errorPage = path.join(__dirname, "..", "views", "404.html");
		res.writeHead(404, DEFAULT_HEADER);
		createReadStream(errorPage, "utf8").pipe(res);
	},
};

module.exports = ejsHelper;
