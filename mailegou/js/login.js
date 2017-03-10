$(function() {
	var verif = false;
	var cookie = $.cookie('user');
	console.log(cookie);
	//存在cookie将 帐号写上
	if(cookie) {
		var cookieObj = JSON.parse(cookie);
		$('#phone').val(cookieObj[0]);
		if(cookieObj[2]) {
			$('.password').val(cookieObj[1]);
		}
	}
	
	//点击登录 验证和cookie是否相同，相同则登录成功
	$('.subBtn').click(function() {
		if(!cookie){
			$('.alertmsg').text('别输入了，没cookie，无法验证帐号');
			return;
		}
		
		if(!verif){
			$('#code_err').text('验证码有误，请重新输入')
			return;
		}else{
			$('#code_err').text('');
		}
		
		var username = $('#phone').val();
		var userpass = $('.password').val();
		
		if(cookieObj[0] === username && cookieObj[1] === userpass) {
			cookieObj[2] = true;
			//cookie保存为true
			$.cookie('user', JSON.stringify(cookieObj), {
				'expires': 1,
				'path': '/'
			})
			$('.alertmsg').text('登录成功!')
			window.location.href = 'index.html';
			console.log($.cookie('user'));
		} else {
			$('.alertmsg').text('帐号,密码输入错误!');
			vCode();
		}
	})

	//验证码
	vCode();

	function vCode() {
		var num = "";
		for(var i = 0; i < 4; i++) {
			num += parseInt(Math.random() * 10);
		}
		$('.validateCode').text(num);
	}
	$('.change').click(function(e) {
			vCode();
			e.preventDefault();
		})
		//验证验证码
	$('.importCode').blur(function() {
		var num1 = $('.validateCode').text();
		var num2 = $('.importCode').val();
		if(num1 !== num2) {
			$('#code_err').text('验证码有误，请重新输入');
			vCode();
			verif = false;
		} else {
			$('#code_err').text('');
			$('.mobile_em').addClass('yes');
			verif = true;
		}
	})

})