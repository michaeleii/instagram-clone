const { instrument } = require("@socket.io/admin-ui");
const { readFile } = require("fs/promises");
const { getUserData } = require("./scripts/databaseHelper");
const handler = require("./handler"),
	httpServer = require("http").createServer(handler),
	io = require("socket.io")(httpServer, {
		cors: {
			origin: ["http://localhost:3000/", "https://admin.socket.io"],
			credentials: true,
		},
	});

const PORT = process.env.PORT || 3000;

global.io = io;

const feed = io.of("/feed");

const onConnection = (socket) => {
	socket.on("photo-submitted", (username) => {
		feed.in(username).emit("uploaded");
	});
};

io.on("connection", onConnection);

feed.on("connection", (socket) => {
	socket.on("join-room", (room) => {
		socket.join(room);
	});
});

instrument(io, { auth: false });

httpServer.listen(PORT, () => console.log(`server is running at ${PORT}`));
