//轮播tu
$(function() {
	var picNum = $('.main-banner div').length;
	var i = 0;
	var rgb = ['rgb(90, 53, 123)', 'rgb(190, 231, 253)', 'rgb(222, 210, 250)', 'rgb(254, 205, 237)', 'rgb(252, 231, 204)'];
	console.log(rgb[0])
	picMove();

	var timer = setInterval(function() {
		i++;
		if(i > picNum - 1) {
			i = 0;
		}
		picMove();
	}, 3700)

	function picMove() {
		$('.marketbtn li').eq(i).stop(true).animate({
			'bottom': 12
		})
		$('.marketbtn li').eq(i).siblings().stop(true).animate({
			'bottom': 0
		})
		$('.sildeImg').css({
			'background-color': rgb[i],
			'opacity': 0.6,
			'filter': 'alpha(opacity=60)'
		}).animate({
			'opacity': 1,
			'filter': 'alpha(opacity=100)'
		})

		$('.main-banner div').eq(i).siblings().find('img').stop(true).animate({
			'opacity': 0,
			'filter': 'alpha(opacity=0)'
		}, 300)

		$('.main-banner div').eq(i).find('img').stop(true).css({
			'width': 840,
			'height': 500,
			'left': -15,
			'top': -10,
		}).animate({
			'opacity': 1,
			'filter': 'alpha(opacity=100)'
		}, 300).animate({
			'width': 810,
			'height': 480,
			'left': 0,
			'top': 0,
		}, 3000)
	}

	$('.marketbtn li').mouseenter(function() {
		clearInterval(timer);

		var index = $(this).index();
		console.log(index);
		i = index;
		picMove();

	})

	$('.marketbtn li').mouseleave(function() {
		timer = setInterval(function() {
			i++;
			if(i > picNum - 1) {
				i = 0;
			}
			picMove();
		}, 3700)

	})

	//楼层自动轮播图
	var layerUlnode = $('.brList ul');

	var layerTime = setInterval(function() {
		var leff = parseInt(layerUlnode.css('left'));
		if(parseInt(layerUlnode.css('left')) == -180) {
			//这里是设置全部ul
			layerUlnode.css('left', 0)
		}

		layerUlnode.animate({
			'left': "-=90"
		})
	}, 4000)

})

//鼠标滚动事件  出现搜索栏 楼梯效果 二维码
$(function() {
	//顶部搜索栏
	var scroll = true;

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		console.log(scrollTop)

		//大于等于1800时出现顶部搜索
		if(scrollTop >= 1800) {

			if($('.flyHeader').is(':hidden')) {
				$('.flyHeader').addClass('hide').css('display', 'block').stop(true).animate({
					'top': 0
				}, 600)
			}

		} else {

			if($('.flyHeader').hasClass('hide')) {
				$('.flyHeader').removeClass('hide');
				$('.flyHeader').stop(true).animate({
					'top': -40
				}, 600, function() {
					$('.flyHeader').hide();
				});
			}
		}

		//二维码
		if(scrollTop >= 500) {
			if($('.leftApp').is(':hidden')) {
				$('.leftApp').addClass('hide');
				$('.leftApp').css('display', 'block').animate({
					'opacity': 1,
					'filter': 'alpha(opacity = 100)'
				}, 2000)
			}
		} else {
			if($('.leftApp').hasClass('hide')) {
				$('.leftApp').removeClass('hide');
				$('.leftApp').animate({
					'opacity': 0,
					'filter': 'alpha(opacity = 0)'
				}, 1000, function() {
					$('.leftApp').css('display', 'none')
				})
			}
		}

		if(scrollTop > 2800) {
			$('.leftApp').css({
				'position': 'absolute',
				'top': 2900
			})
		} else {
			$('.leftApp').css({
				'position': 'fixed',
				'top': '200px'
			})
		}

		//楼梯效果
		if(scrollTop > 3600) {
			$('.mui-left').css({
				'position': 'fixed',
				'top': 200
			})
		}
		if(scrollTop < 3600) {
			$('.mui-left').css({
				'position': 'absolute',
				'top': 3800
			})
		}

		if(scrollTop > 8300) {
			$('.mui-left').css({
				'position': 'absolute',
				'top': 8400
			})
		}

		//楼梯点击效果

		//		console.log($('.floor_1').offset())

		$('.nav-warp li').click(function() {
			scroll = false;
			var $that = $(this);
			var index = $(this).index();

			var scrollTop = $('.floor').eq(index).offset().top - 60;
			//			console.log(scrollTop);
			$('html,body').stop(true).animate({
				'scrollTop': scrollTop
			}, 800, function() {

				scroll = true;
			})
			//点击后立即处理颜色 
			$that.find('div').css({
				'display': 'none'
			});

			$that.find('font').css({
				'display': 'block',
			});
			$that.siblings('li').find('div').removeAttr('style');
			$that.siblings('li').find('font').removeAttr('style');
		})

		//不同楼层位置，左图标颜色变化,显示文字
		if(scroll) {
			$('.floor').each(function() {

				var thisTop = $(this).offset().top - 300;
				//			console.log(thisTop)
				if(scrollTop > thisTop) {
					var index = $(this).index('.floor');
					$('.nav-warp li').eq(index).find('div').css({
						'display': 'none'
					});

					$('.nav-warp li').eq(index).find('font').css({
						'display': 'block',
					});

					//					$('.nav-warp li').eq(index).siblings('li').find('div').css('display', 'block');
					//					$('.nav-warp li').eq(index).siblings('li').find('font').css({
					//						'display': 'none',
					//					});
					$('.nav-warp li').eq(index).siblings('li').find('div').removeAttr('style');
					$('.nav-warp li').eq(index).siblings('li').find('font').removeAttr('style');
				}

			})
		}

	})

})