$(function() {
	getCookie();

	$('.cart-nav-list').click(function() {
		getCookie();
	})
})

function getCookie() {
	$('.gouOrder').remove();
	if($.cookie('car')){
		var cookie = JSON.parse($.cookie('car'));
	}else{
		console.log("无cookie")
		return;
	}
	
	console.log(cookie);
	var $cartListDiv = $('.cart-order-list');
	var num = 0;
	for(var i = 0; i < cookie.length; i++) {
		var concat = $('<div class="gouOrder"><div class="cartItem"><img src="' + cookie[i].img + '"/></div><div class="proInfo"><h3 class="title">' + cookie[i].title + '</h3><p class="priceCount">' + cookie[i].price + '.00 <em>x</em>' + cookie[i].num + '</p></div></div>')
		num += cookie[i].num * 1;
		$cartListDiv.append(concat);
	}
	$('.cart-nav-list .allNum').text(num);
}