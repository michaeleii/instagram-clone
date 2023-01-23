const database = require("../../database/data.json");
const data = { db: database };

const getData = () => data;

const getUserData = (username) =>
	database.filter((user) => user.username === username)[0];

const dbHelper = {
	uploadImage: (filename, i) => {
		database[i].photos.push(filename);
		database[i].stats.posts++;
	},
	deleteImage: (deleteIndex, i) => {
		database[i].photos.splice(deleteIndex, 1);
		database[i].stats.posts--;
	},
};

const filterDb = (username, operation, parameter) => {
	for (let i = 0; i < database.length; i++) {
		if (database[i].username == username) {
			dbHelper[operation](parameter, i);
		}
	}
	return JSON.stringify(database, null, 4);
};

module.exports = { filterDb, getData, getUserData };
