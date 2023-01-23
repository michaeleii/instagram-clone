const { parse } = require("url"),
	{ DEFAULT_HEADER } = require("./util/util.js"),
	controller = require("./controller"),
	{ createReadStream } = require("fs"),
	path = require("path");

//ROUTE AREA -> URL
const allRoutes = {
	// GET: localhost:3000/
	"/:get": (req, res) => controller.getHomePage(req, res),

	// GET: localhost:3000/form
	"/form:get": (req, res) => controller.getFormPage(req, res),

	// POST: localhost:3000/form
	"/form:post": (req, res) => controller.sendFormData(req, res),

	// POST: localhost:3000/images
	"/images:post": (req, res) => controller.uploadImages(req, res),

	// GET: localhost:3000/delete
	"/delete:get": (req, res) => controller.deleteImage(req, res),

	// GET: localhost:3000/feed
	// Shows instagram profile for a given user
	"/feed:get": (req, res) => controller.getFeed(req, res),

	//Gets the css, browser javascript, images .png and jpg
	"/loadContent:get": (req, res) => controller.getContent(req, res),

	// 404 routes
	default: (req, res) => {
		const errorPage = path.join(__dirname, "views", "404.html");
		res.writeHead(404, DEFAULT_HEADER);
		createReadStream(errorPage, "utf8").pipe(res);
	},
};

function handler(req, res) {
	const { url, method } = req;
	const { pathname } = parse(url, true);
	const pathExtension = path.extname(pathname);
	const key =
		pathExtension == ""
			? `${pathname}:${method.toLowerCase()}`
			: `/loadContent:${method.toLowerCase()}`;

	const chosen = allRoutes[key] || allRoutes.default;

	return Promise.resolve(chosen(req, res)).catch(handlerError(res));
}

function handlerError(res) {
	return (error) => {
		console.log("Something bad has  happened**", error.stack);
		res.writeHead(500, DEFAULT_HEADER);
		res.write(
			JSON.stringify({
				error: "internet server error!!",
			})
		);

		return res.end();
	};
}

module.exports = handler;
