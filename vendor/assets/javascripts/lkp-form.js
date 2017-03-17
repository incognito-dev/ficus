$(document).ready(function(){
	// tinymce init and validate
	if(document.getElementById("tinymce-editor") !== null) {
		tinymce.init({
			selector:'#tinymce-editor',
			language: 'ru',
		 	plugins: "image",
		 	max_chars : "10",
		 	height : 150,
		});
	}
	// file name change
	$('#file').change(function(e){
		var val = $(this).val().toLowerCase();
		var regex = new RegExp("(.*?)\.(png|jpeg|jpg|gif)$");
	 	if(!(regex.test(val)) || $(this)[0].files[0].size > 1048576) {
			$(this).val('');
			$(this).prev().text('Файл не выбран.');
			$(this).next().css({
		      "color": "#FF0000",
		      "font-weight": "bold"
		    });
		} else {
			var FileName = $(this)[0].files[0].name;
			$(this).prev().text(FileName);
			$(this).next().removeAttr('style');
		}
	});

	// Inputs for subcategories add/delete
	var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".input_fields_add"); //Fields wrapper
    var workCounter = 1;
    var AdressCounter = 1
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();
    });
    
 	// Subcategory add/delete (action-form)
    $(".add_cat_button").click(function(e){ //on add input button click
        e.preventDefault();
        $(this).parent().append('<div><input type="text" name="newCat[]"><a href="#" class="remove_field btn-link">Удалить</a></div>'); //add input box
    });
    // YouTube video links add/delete (add-company)
 	$(".add_link_button").click(function(e){ //on add input button click
        e.preventDefault();
        $(this).parent().append('<div><input type="text" name="newLink[]"><a href="#" class="remove_field btn-link">Удалить</a></div>'); //add input box
    });
 	// Net Address add/delete (add-company)
 	$(".add_net_address_button").click(function(e){ //on add input button click
        e.preventDefault();
        $(this).parent().append('<div><input type="text" name="newNetAddress[]"><a href="#" class="remove_field btn-link">Удалить</a></div>'); //add input box
    });
 	
    // Work Time add/delete (add-company)
 	$(".add_work_button").click(function(e){ //on add input button click
        e.preventDefault();
        if(workCounter < max_fields){ //max input box allowed
            workCounter++; //text box increment
            $(this).parent().append('<div><div>Режим работы '+workCounter+'</div><input type="text" name="newWorkTime[]"><a href="#" class="remove_work_button btn-link">Удалить</a></div>'); //add input box
        }
    });
    $(wrapper).on("click",".remove_work_button", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();workCounter--;
    });

 	// Address add/delete (add-company)
 	$(".add_address_button").click(function(e){ //on add input button click
        e.preventDefault();
        if(workCounter < max_fields){ //max input box allowed
            AdressCounter++; //text box increment
            $(this).parent().append('<div><div>Адрес '+AdressCounter+'</div><input type="text" name="newAddress[]"><a href="#" class="remove_work_button btn-link">Удалить</a></div>'); //add input box
        }
    });
    $(wrapper).on("click",".remove_work_button", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove();AdressCounter--;
    });

    // City add/delete (add-company)
 	$(".add_city_button").click(function(e){ //on add input button click
        e.preventDefault();
        var select = $(this).prev().html();
        $(this).parent().append('<div>'+select+'<a href="#" class="remove_field btn-link">Удалить</a></div>');
    });

	// Add aress on Yandex map by input (add-company)
	if(document.getElementById("myMap") !== null) {
		var myMap;
		var search_result = [];

		ymaps.ready(function () {
		    myMap = new ymaps.Map("myMap", {
		        center: [56.85570581355954, 53.201285499999955],
		        zoom: 12,
		        behaviors: []
		    });
		});
	}
	function initInoutMap() {
		$(".address").keyup(function(){
			//по мере ввода фразы, событие будет срабатывать всякий раз
			var search_query = $(this).val();
			//массив, в который будем записывать результаты поиска
			search_result = [];
			//делаем запрос к геокодеру
			$.getJSON('http://geocode-maps.yandex.ru/1.x/?format=json&callback=?&geocode='+search_query, function(data) {
				//геокодер возвращает объект, который содержит в себе результаты поиска
				//для каждого результата возвращаются географические координаты и некоторая дополнительная информация
				//ответ геокодера легко посмотреть с помощью console.log();
				for(var i = 0; i < data.response.GeoObjectCollection.featureMember.length; i++) {
					//записываем в массив результаты, которые возвращает нам геокодер
					search_result.push({
						label: data.response.GeoObjectCollection.featureMember[i].GeoObject.description+' - '+data.response.GeoObjectCollection.featureMember[i].GeoObject.name,
						value:data.response.GeoObjectCollection.featureMember[i].GeoObject.description+' - '+data.response.GeoObjectCollection.featureMember[i].GeoObject.name,
						longlat:data.response.GeoObjectCollection.featureMember[i].GeoObject.Point.pos});
				}
				//подключаем к текстовому полю виджет autocomplete
				$(".address").autocomplete({
					//в качестве источника результатов указываем массив search_result
					source: search_result,
					select: function(event, ui){
						//это событие срабатывает при выборе нужного результата
						//координаты точек надо поменять местами
						//console.log(ui.item);
						var longlat = ui.item.longlat.split(" ");
						var inpLat = longlat[1];
						var inplong = longlat[0];
						$(this).nextAll().eq(1).val(inpLat);
						$(this).nextAll().eq(2).val(inplong);
						var myPlacemark = new ymaps.Placemark([longlat[1], longlat[0]],{
							balloonContentBody: ui.item.label,
							hintContent: ui.item.label
						});
						myMap.geoObjects.add(myPlacemark);
						myMap.setCenter([longlat[1], longlat[0]], 13);

					}
				});
			});
			
		});

		$.ui.autocomplete.filter = function (array, term) {
			return $.grep(array, function (value) {
				return value.label || value.value || value;
			});
		};
	}	
	initInoutMap();
	$(".input_map_add").click(function(e){ //on add input button click
        e.preventDefault();
        $(this).parent().append('<div><input class="address" name="mapAddress[]" type="text" value=""><input name="lat[]" type="hidden" value=""><input name="long[]" type="hidden" value=""><a href="#" class="remove_field btn-link">Удалить</a></div>'); //add input box
		initInoutMap();
    });

    // Gallery
    function getFileReader(input) {
     	if (input.files && input.files[0]) { 
			var reader = new FileReader(); 
         	reader.readAsDataURL(input.files[0]);
         	return reader;
      	} 
  	}
   	$('.gallery-item input').change(function(e) {
   		var currentLabel = $(this).next();
		var reader = getFileReader(this);
		var val = $(this).val().toLowerCase();
		var regex = new RegExp("(.*?)\.(png|jpeg|jpg)$");
		if(!(regex.test(val))) {
			$(this).val('');
			currentLabel.removeAttr('style');
			alert('Допустимый формат файлов jpg, png');
		} else {
			reader.onload = function (e) {
				currentLabel.css('background-image', 'url(' + e.target.result + ')');
			}
		}
	});

	// Gallery price (add-company)
	$('.gallery-price input').change(function(e) {
   		var val = $(this).val().toLowerCase();
		var regex = new RegExp("(.*?)\.(zip|rar|docx|doc|pdf|xls|xlsx)$");
	 	if(!(regex.test(val))) {
			$(this).val('');
			$(this).next().removeAttr('style').text('');
			alert('Допустимый формат файлов zip, rar, docx, pdf, excel');
		} else if ($(this)[0].files[0].size > 10000000){
			$(this).val('');
			$(this).next().removeAttr('style').text('');
			alert('Максимальный размер 10 Mb');
		} else {
			var FileName = $(this)[0].files[0].name;
			$(this).next().text(FileName);
			$(this).next().css('background','none');
		}

	});
});

