//Preloads Transition animations, to stop them from playing on window load.

$(window).load(function () {
	$("body").removeClass("preload");
});
