$(document).ready(function() {
		$('.fancybox')
			.attr('rel', 'media-gallery')
			.fancybox({
				helpers : {
					media : {},
					buttons : {}
				}
		});
});