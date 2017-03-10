$(function() {
	var cookie = $.cookie('user');
	if(cookie) {
		var cookieObj = JSON.parse(cookie);
	}

	if(cookie && cookieObj[2]) {
		//登录成功
		$('.tl .loginTag').text('amer 已登录');
		$('.tl .login').text('退出').addClass('logged');
		forbidClick();
	} else {
		$('.tl .loginTag').text('请登录');
		$('.tl .login').text('免费注册').removeClass('logged');
	}

	function forbidClick() {
		$('.loginTag').click(function(e) {
			console.log("已登录，别点了")
			e.preventDefault();
			return false;
		});

		$('.login').one('click', function(e) {
			e.preventDefault();
			$('.tl .loginTag').text('请登录');
			$('.tl .login').text('免费注册').removeClass('logged');
			cookieFalse();
			$('.loginTag').click(function() {
				window.location.href = 'login.html';
			});

		});
	}
	
	
	//将cookie改为false
	function cookieFalse(){
		var cookieObj = JSON.parse( $.cookie('user') );
		cookieObj[2] = false;
		$.cookie('user',JSON.stringify(cookieObj),{
			'expires':1,
			'path':'/'
		})
	}
	
})