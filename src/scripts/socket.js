let socket = io.connect("http://localhost:3000/");

const form = document.querySelectorAll("#imgUpload");
const submit = document.querySelectorAll("#submit");
for (let i = 0; i < form.length; i++) {
	form[i].addEventListener("submit", () => {
		const username = submit[i].value;
		socket.emit("photo-submitted", username);
	});
}

// socket.on("uploaded", () => {
// 	window.location.reload();
// });
// let gallery = document.getElementById("gallery");
// let uploadedImage = document.createElement("img");

// socket.on("image uploaded", (path) => {
// 	uploadedImage.onload = () => {
// 		uploadedImage.src = path;
// 		gallery.appendChild(uploadedImage);
// 	};
// });
// socket.on("image uploaded", (msg) => console.log(msg));
