//For the modal popup in index.ejs

//Reference: www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
const modal = document.querySelectorAll("#myModal");

// Get the button that opens the modal
const btn = document.querySelectorAll("#popupButton");

// Get the <span> element that closes the modal
const span = document.querySelectorAll(".close");

// When the user clicks on the button, open the modal
for (let i = 0; i < modal.length; i++) {
	btn[i].onclick = () => (modal[i].style.display = "block");

	// When the user clicks on <span> (x), close the modal
	span[i].onclick = () => (modal[i].style.display = "none");

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener("click", (event) => {
		if (event.target == modal[i]) {
			console.log("closed");
			modal[i].style.display = "none";
		}
	});
}
