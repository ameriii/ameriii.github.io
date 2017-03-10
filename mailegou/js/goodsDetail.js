$(function() {
	//手动轮播
	$('.control').on('click', function() {
		var $ulNode = $('.wrapBox ul');
		var leftNum = $ulNode.position().left;
		//		console.log($ulNode.position().left);
		if($(this).is('.cL')) {
			if(Math.round(leftNum) >= 0) {
				$ulNode.css('left', -360).animate({
					'left': '+=120'
				})
			} else {
				$ulNode.animate({
					'left': '+=120'
				})
			}

		} else {
			//			console.log(Math.round(leftNum));
			if(Math.round(leftNum) <= -360) {
				$ulNode.css('left', 0).animate({
					'left': '-=120'
				})
			} else {
				$ulNode.animate({
					'left': '-=120'
				})
			}

		}
	})

	//鼠标hover切换大图
	$('.wrapBox li').mouseenter(function() {
		var newPic = $(this).find('img').attr('src').replace(/small/, 'big');
		$('.viewPic img').attr('src', newPic)

	})

	var $glass = $('.glass');
	var $viewPic = $('.viewPic');
	var $viewPicWidth = $viewPic.width();
	var $viewPicheight = $viewPic.height()
	var $zoomDiv = $('.zoomDiv');
	//鼠标移入大图 显示放大效果
	$(window).mousemove(function(e) {

		if(e.pageX > $viewPic.offset().left && e.pageX < $viewPic.offset().left + $viewPicWidth && e.pageY > $viewPic.offset().top && e.pageY < $viewPic.offset().top + $viewPicheight) {
			var gwidth = $glass.width();
			var gheight = $glass.height();
			//			if($zoomDiv.position().left>)
			$glass.css({
				'display': 'block',
				'left': function() {
					if(e.pageX - $viewPic.offset().left <= gwidth / 2) {
						var left = 0;
					} else if(e.pageX - $viewPic.offset().left >= $viewPic.width() - gwidth / 2) {
						var left = Math.round($viewPicWidth - gwidth);
					} else {
						var left = Math.round(event.pageX - $viewPic.offset().left - gwidth / 2);
					}
					return left;
				},
				'top': function() {
					if(e.pageY - $viewPic.offset().top <= gheight / 2) {
						var top = 0;
					} else if(e.pageY - $viewPic.offset().top >= $viewPicheight - gheight / 2) {
						var top = Math.round($viewPicheight - gheight);
					} else {
						var top = Math.round(event.pageY - $viewPic.offset().top - gheight / 2);
					}
					return top;
				}
			});

			//这里控制放大图片框
			$zoomDiv.css({
				'display': 'block',
				'background': 'url(' + $('.viewPic img').attr('src') + ') no-repeat',
				'background-position-x': function() {
					var left = -Math.round($glass.position().left * 2.28);

					return left;
				},
				'background-position-y': function() {
					var top = -Math.round($glass.position().top * 2.28);
					return top;
				}
			})

		} else {
			$glass.css({
				'display': 'none'
			});
			$zoomDiv.css({
				'display': 'none'
			});
		}

	})

	//选择段位
	$('.sumChoose .dd').on('click', 'a', function(e) {
		e.preventDefault();
		$(this).addClass('hover').siblings('a').removeClass('hover');
		$(this).parent('.oDiv').siblings().find('a').removeClass('hover');
	})

	//选择购买数量
	$('#dddiv input').keyup(function() {
		var oldValue = $('#dddiv input').val();
		var num = oldValue.replace(/\D/g, '');
		console.log(num>30)
		if(num>30){
			$('#dddiv span').css('display','block');
		}else{
			$('#dddiv span').css('display','none');
		}
		if(oldValue != num || num == ''||num==0) {
			if(parseInt(num)>0) {
				return $('#dddiv input').val(parseInt(num));
			} else {
				return $('#dddiv input').val(parseInt(1));
			}
		} else {
			return;
		}
	})
	//加减数量
	$('#dddiv .minus').click(function(){
		var oldValue = $('#dddiv input').val();
		var newValue = parseInt(oldValue)-1;
		if(newValue<=0){
			alert('一件都不买, 还点个毛啊！');
			$('#dddiv input').val(1);
		}else{
			$('#dddiv input').val(newValue);
		}

		
	})
	
	$('#dddiv .add').click(function(){
		var oldValue = $('#dddiv input').val();
		var newValue = parseInt(oldValue)+1;
		if(newValue>=99){
			$('#dddiv input').val(99);
		}else{
			$('#dddiv input').val(newValue);
		}
	})
	
	
	
	
	
	
})