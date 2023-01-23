const { formidableHelper } = require("./scripts/formidableHelper"),
	ejsHelper = require("./scripts/ejsHelper"),
	{ mimetypeHelper } = require("./scripts/mimetypeHelper"),
	formHelper = require("./scripts/formHelper"),
	{ deleteImg } = require("./scripts/deleteImg");

const controller = {
	getHomePage: (req, res) => ejsHelper.renderHome(req, res),

	getContent: (req, res) => mimetypeHelper(req, res),

	getFeed: (req, res) => ejsHelper.renderFeed(req, res),

	uploadImages: (req, res) => formidableHelper(req, res),

	deleteImage: (req, res) => deleteImg(req, res),

	getFormPage: (req, res) => formHelper.getPage(req, res),

	sendFormData: (req, res) => formHelper.sendData(req, res),
};

module.exports = controller;
