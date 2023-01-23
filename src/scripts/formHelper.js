const { createReadStream } = require("fs");
const path = require("./paths");

const getPage = (req, res) => {
	createReadStream(path.form).pipe(res);
};
const sendData = (req, res) => {
	let body = "";

	req.on("data", function (data) {
		body += data;
	});

	req.on("end", function () {
		let post = qs.parse(body);
		console.log(post);
	});
};
module.exports = { getPage, sendData };
