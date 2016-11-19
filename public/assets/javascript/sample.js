$(document).ready(function () {
	var tiles = $('.tile');
	for (var i = 0; i < tiles.length; i++) {
		$(tiles[i]).tiler('http://lorempixel.com/580/250/nature/' + ((i % 8) + 1));
	}
});