const feedSocket = io.connect(`/feed`);
const username = location.search.replace("?username=", "");

feedSocket.emit("join-room", username);

feedSocket.on("uploaded", () =>
	setTimeout(() => window.location.reload(), 1000)
);
