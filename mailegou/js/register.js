$(function() {
	var reg = [0,0,0,0,0];
	$('#phone').keyup(function() {
		var phoneNum = $('#phone').val();
		var test = /\D/g.test(phoneNum);
		if(test) {
			$('#phone').val("");
			$('#mobile_err').text('请输入手机号码');
		}
	})
	$('#phone').blur(function() {
			var phoneNum = $('#phone').val();
			var test = /^1[34578]\d{9}$/.test(phoneNum);
			if(test) {
				$('#mobile_err').text('可以使用');
				$('#mobile_err').css('color', '#090');
				reg.splice(0,1,1);
				
			} else {
				$('#mobile_err').text('您输入的手机号码格式错误，请重新输入! ');
				reg.splice(0,1,0);
			}
		})
		//密码
	$('.password').blur(function() {
			var num = $('.password').val();
			var test = /.{6,20}/.test(num);
			if(!test) {
				$('#pwd_err').text('密码长度必须为6-20个字符');
				reg.splice(1,1,0);
			} else {
				$('#pwd_err').text('');
				reg.splice(1,1,1);

			}
		})
		//验证密码
	$('.surePassword').blur(function(){
		surePassword();
	})
	
	function surePassword() {
			var num1 = $('.password').val();
			var num2 = $('.surePassword').val();
			
			if(num1 !== num2) {
				$('#sure_err').text('两次输入的密码不一致，请重新输入');
				reg.splice(2,1,0);
			} else {
				$('#sure_err').text('');
				reg.splice(2,1,1);
			}
			if(num2==""){
				$('#sure_err').text('请再次输入密码');
				reg.splice(2,1,0);
			}
		}
	
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
				reg.splice(3,1,0);
			} else {
				$('#code_err').text('');
				$('.mobile_em').addClass('yes');
				reg.splice(3,1,1);
			}
		})
		//交易条款 checkbox
	$('.check').click(function() {
		var status = $('.check').prop('checked');
		if(!status) {
			$('.subBtn').css('background-color', '#ccc')
			reg.splice(4,1,0);
			
		} else {
			$('.subBtn').css('background-color', '#e83917');
			reg.splice(4,1,1);
		}
	})
	
	
	$('.subBtn').click(function(e) {
		var status = $('.check').prop('checked');
		if(status){
			reg.splice(4,1,1);
		}
		surePassword();
		var test = reg.join("");
		console.log(test)
		if(test==='11111'){
			$('#sms_err').text('注册成功！');
			//保存cookie
			setCookie();
			//弹窗提示去登录
			var login = confirm("注册成功,现在去登录？");
			if(login){
				window.location.href = 'login.html';
			}
			//刷新页面，去掉页面的注册信息
			history.go(0)
		}else{
			$('#sms_err').text('请输入完整信息！')
		}
//		console.log(reg,test)
	})

})
function setCookie(){
	var phoneNum = $('#phone').val();
	var passwordNum = $('.password').val();
	var cookie = [phoneNum,passwordNum,false];
	
	var userCookie = $.cookie('user',JSON.stringify(cookie),{
		'expires':1,
		"path":"/"
	});
	console.log($.cookie('user'))
}
