(function ($) {

	$.fn.tiler = function (imageUrl) {
		this.active = false;
		var that = this;

		this.append('<div class="card-content white-text"><div class="imgDiv"></div><div class="plusMinusIcon"><a class="btn btn-floating waves-effect waves-light"><i class="material-icons">add</i></a></div></div>');
		this.addClass('card blue-grey darken-1');
		this.find('.imgDiv').css('background-image', 'url(' + imageUrl + ')');			

		this.find('.plusMinusIcon .btn').click(function () {
			if (that.active) {
				that.removeClass('activeTile');
				that.addClass('darken-1');
				that.removeClass('lighten-2');
				that.find('.plusMinusIcon .btn .material-icons').html('add');
			}
			else {
				that.addClass('activeTile');
				that.removeClass('darken-1');
				that.addClass('lighten-2');
				that.find('.plusMinusIcon .btn .material-icons').html('remove');
			}
			that.active = !that.active;
		});
	};

}(jQuery));