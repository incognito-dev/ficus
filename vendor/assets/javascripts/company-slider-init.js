$(document).ready(function(){
	$('.slider-company').lightSlider({
		auto: true,
		item:1,
		// mode: 'fade',
        slideMargin:0,
        pager: false,
        loop:true,
        pause: 2500,
	});
	$('.fancybox')
		.attr('rel', 'media-gallery')
		.fancybox({
			helpers : {
				media : {},
				buttons : {}
			}
	});
});