$(function() {

	function countDown() {
		//整点抢倒计时
		var dateNow = new Date();
		var nextDate = null;

		var time = dateNow.getTime();
		//年月日 小时
		var year = dateNow.getFullYear();
		var month = dateNow.getMonth();
		var getDate = dateNow.getDate();

		var hour = dateNow.getHours();

		//	console.log(time);

		if(hour >= 0 && hour < 9) {
			nextTime = 9;
			nextDate = dateNow.setHours(nextTime, 0, 0, 0);
			move(0);
			starMove();
		} else if(hour >= 9 && hour < 13) {
			nextTime = 13;
			nextDate = dateNow.setHours(nextTime, 0, 0, 0);
			move(1);
			starMove();
		} else if(hour >= 13 && hour < 17) {
			nextTime = 17;
			nextDate = dateNow.setHours(nextTime, 0, 0, 0);
			move(2);
			starMove();
		} else {
			nextDate = new Date(year, month, getDate + 1).getTime();
			move(3);
			starMove();
		}

		//距离下一场开始的毫秒数
		var diff = nextDate - time;

		var haomiao = diff % 1000;
		var miao = ((diff - haomiao) / 1000) % 60;
		var xiaoshi = parseInt(diff / 1000 / 60 / 60);
		var fenzhong = parseInt((diff - xiaoshi * 60 * 60 * 1000) / 1000 / 60);
		//		console.log(dateNow);
		//		console.log(xiaoshi, fenzhong, miao, haomiao)

		return [xiaoshi, fenzhong, miao, haomiao, (diff - haomiao) / 100];
	}

	//迭代调用自己
	function iteration() {
		var arrTime = countDown();
		//		console.log(arrTime)

		var arrTime0 = arrTime[0];
		var arrTime1 = arrTime[1];
		var arrTime2 = arrTime[2];
		var arrTime3 = arrTime[3];

		var em1 = $('.em1');
		var em2 = $('.em2');
		var em3 = $('.em3');
		var em4 = $('.em4');
		var em5 = $('.em5');
		var em6 = $('.em6');
		var em7 = $('.em7');

		em1.text(parseInt(arrTime[0] / 10));
		em2.text(arrTime[0] % 10);
		em3.text(parseInt(arrTime[1] / 10));
		em4.text(arrTime[1] % 10);
		em5.text(parseInt(arrTime[2] / 10));
		em6.text(arrTime[2] % 10);
		em7.text(parseInt(arrTime[3] / 100));

		var count = parseInt(arrTime[3] / 100);

		var timerSet = setInterval(function() {
			count--;
			if(count < 0) {
				count = 9;
				arrTime2 -= 1;

				if(arrTime2 < 0) {
					arrTime2 = 59;
					arrTime1 -= 1;

					if(arrTime1 < 0) {
						arrTime1 = 59;

						arrTime0 -= 1;
						if(arrTime0 < 0) {
							clearInterval(timerSet);
							iteration();
							return;
						}
						//小时变化
						em2.text(arrTime0 % 10);
						em1.text(parseInt(arrTime0 / 10));
					}
					//分钟变化
					em4.text(arrTime1 % 10);
					em3.text(parseInt(arrTime1 / 10));
				}
				//秒钟变化
				em6.text(arrTime2 % 10);
				em5.text(parseInt(arrTime2 / 10));
			}
			//毫秒变化
			em7.text(count);

		}, 100)
	}
	//	调用自己开始
	iteration();

	//整点抢 滑动效果
	var time4Arr = ['00:00', '09:00', '13:00', '17:00'];

	function move(num) {
		$('.time ul').animate({
			'left': -238
		}, function() {
			$('.time ul').css('left', '0');
			for(var i = 0; i < 6; i++) {
				if(num > 3) {
					num = 0;
				}

				$('.schedule')[i].innerHTML = time4Arr[num];
				num++;
			}

		})
	}

	//整点抢点击事件
	$('.time li').click(function() {
		$(this).css('background', '#cb351a').siblings().css('background', '#6c6c6c');
		$('.arrow-down').css({
			'left': parseInt($('.arrow-down').width() / 2) + ($(this).index() + 0.5) * parseInt($(this).width())
		})
		starMove();
	})

	//整点抢轮播
	$('.prev-boxleft').click(function(e) {
		e.stopPropagation();
		if(parseInt($('.carousel').css('left')) >= 0) {

				$('.carousel').css('left', '-3600px');
			}
		$('.carousel').animate({
			'left': '+=1200'
		}, function() {
			console.log(parseInt($('.carousel').css('left')) == 0)

			if(parseInt($('.carousel').css('left')) >= 0) {

				$('.carousel').css('left', '-3600px');
			}
			console.log($('.carousel').css('left'))
		})
	})

	$('.next-boxright').click(function(e) {
		e.stopPropagation();
		starMove();
	})

	function starMove() {
		if(parseInt($('.carousel').css('left')) <= -3600) {
				$('.carousel').css('left', '0')
			}

		$('.carousel').animate({
			'left': '-=1200'
		}, function() {
			if(parseInt($('.carousel').css('left')) <= -3600) {
				$('.carousel').css('left', '0')
			}

		})
	}

})