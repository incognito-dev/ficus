$(document).ready(function(){
	/* ----------------- hamburger icon ---------------- */
	$('.navbar-collapse').on('hidden.bs.collapse', function () {
	  $('.nav-menu__icon').removeClass('open');
	});
	$('.navbar-collapse').on('show.bs.collapse', function () {
	  $('.nav-menu__icon').addClass('open');
	});
	
	/* ----------------- Header object select ---------------- */
	$("#header .object .option").on("click", function(e) {
		$('#header .object .option_text').text($(this).text()); 
		$("#header .select_obj").val($(this).data("value"));
	});
	$("#header .object .option_text").on("focusout",function(e){
		setTimeout(function(){
			$("#header .object").removeClass('open');
		}, 100);
    });
	$("#header .object .option_text").on("click", function(e) {
		$(this).parents().eq(1).addClass('open');
	});
	/* ----------------- UI datepicker ---------------- */
	if(document.getElementById("datepicker") !== null) {
		$("#datepicker").datepicker({
			format: 'dd.mm.yyyy',
		});
	}

});
/* ----------------- Open modal in modal ---------------- */
// $(document).on('show.bs.modal', function (event) {
//     if (!event.relatedTarget) {
//         $('.modal').not(event.target).modal('hide');
//     };
//     if ($(event.relatedTarget).parents('.modal').length > 0) {
//         $(event.relatedTarget).parents('.modal').modal('hide');
//     };
// });

// $(document).on('shown.bs.modal', function (event) {
//     if ($('body').hasClass('modal-open') == false) {
//         $('body').addClass('modal-open');
//     };
// });
