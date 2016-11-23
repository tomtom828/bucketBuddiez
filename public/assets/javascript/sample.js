$(document).ready(function () {
	var tiles = $('.tile');
	for (var i = 0; i < tiles.length; i++) {
		$(tiles[i]).tiler('Styles/images/dest' + ((i % 8) + 1) + '.jpg');
	}
	$(".button-collapse").sideNav();

	var cardsHolder = $('.destinationCards');
	for (var i = 0; i < cardsHolder.length; i++) {
		var width = $(cardsHolder[i]).find('.card').length * 305;
		$(cardsHolder[i]).css('width', width);
		$(cardsHolder[i]).css('display', 'block');

		//$($('.destinationHolder')[i]).slimScroll({
		//	width: $(cardsHolder[i]).find('.card').length * 305 + 'px';
		//});

		//$($('.destinationHolder')[i]).slimScroll({
		//	//width: auto
		//});

	}

});