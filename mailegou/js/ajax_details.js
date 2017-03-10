$(function(){
	var address = location.href.replace(/\?.*/g, "");
	var name = location.search.replace(/^\?\d+_/g,"");
//	console.log(name);
	var jsonNum = name;
	var count = 0;
	
	if(jsonNum>1){
		jsonNum = 1;
	}
	$.ajax({
		type: "GET",
		url: '../data/details_' + jsonNum + '.json',
		async: true,
		success: function(response) {
			update(response);
		}
	})
	
	function update(response) {
		var jsonObj = response;
		$('.viewPic img').attr('src',jsonObj.viewPic);
		$('.selected').text(jsonObj.selected);
		$('.goodsName h1').text(jsonObj.title);
		$('.goodsName span').text(jsonObj.text0);
		$('.SGoodsPrice').text(jsonObj.SGoodsPrice);
		$('.unit-price').text(jsonObj.unitprice);
		$('.oldPrice dd del').text(jsonObj.del);
		$('.ass1 span').eq(0).find('em').text(jsonObj.em1);
		$('.ass1 span').eq(1).find('em').text(jsonObj.em2);
		$('.ass1 span').eq(2).find('em').text(jsonObj.em3);
		
		$('.wrapBox li').each(function(index){
			$(this).find('img').attr('src',jsonObj.liArr[index]);
		})
	}
})
