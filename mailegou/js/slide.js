//头部效果js

$(function() {
	//我的麦乐购 下拉列表
	$('.myAccont').mouseenter(function() {
		$('.myAccont').addClass('changeColor');

		$('.countList').stop().slideDown(300);
		//改变箭头方向
		$('.myAccont > i').css({
			background: 'url(../img/index/icon_index.png) no-repeat -61px 0px'
		})
	})
	$('.myAccont').mouseleave(function(event) {

		$('.countList').stop().slideUp(300, function() {
			$('.myAccont').removeClass('changeColor');
			//改变箭头方向
			$('.myAccont > i').css({
				background: 'url(../img/index/icon_index.png) no-repeat -81px 0px'
			})
		});
	})
	
	//改变star收藏颜色
	$('.collection').mouseenter(function(){
		$('.collection i').css({
   			'background-position': '-42px -21px'
		})
	})
	$('.collection').mouseleave(function(){
		$('.collection i').css({
   			'background-position': '-66px -21px'
		})
	})
	
	//手机app
	$('.myGou').mouseenter(function(){
		$(this).addClass('changeColor');
		$('.myGou i').css('background-position','-38px 2px');
		$('.gouApp').stop().slideDown(200);
	})
	$('.myGou').mouseleave(function(){
		$('.myGou .gouApp').stop().slideUp(200,function(){
			$('.myGou').removeClass('changeColor');
			$('.myGou i').css('background-position','-18px 2px');
			
		});
	})
	
	//滑块滑动效果
	$('.navMain-list li').mouseenter(function(){

		var targetWidth = $(this).find('a').width();
		var target = $(this).position().left;
		$('.underLine').css('display','block').stop().animate({
			'left':target,
			'width':targetWidth
		})
	})
	
	$('.navMain-list li').mouseleave(function(){
		var targetWidth = $('.navMain-list li').eq(0).find('a').width();
		$('.underLine').stop(true).animate({
			'left':0,
			'width':targetWidth
		},function(){
			if(!$('.navMain-list .index').length){
				
				$('.underLine').css('display','none');
			}
		})
	})
	
	$('addCont').mouseenter(function(){
		$(this).css('display','block');
	})
	
	
	//左菜单栏动画
	$('.menu-list li').mouseenter(function(e){
		var index = $(this).index();
		$(this).css('background','#a90000').find('i').stop(true).animate({
			'padding-left':'8'
		},400)
		
		$(this).siblings('li').css('background','#cb3e25').find('i').stop(true).animate({
			'padding-left':'0'
		},200);
		
		
		$('.addCont').eq(index).css('display','block').stop(true).animate({
			'opacity':'0.95',
			'filter': 'alpha(opacity=95)',
			'left':'180'
		}).siblings('.addCont').css('display','none').stop(true).animate({
			'opacity':'0.5',
			'filter': 'alpha(opacity=50)',
			'left':'170'
		});
	});
	
	//在ul上绑定离开事件，这样离开li不会让滑动列表不消失,离开ul会让列表消失。
	//这时切换li，需要让对应的列表出现和消失. 切换li时能做到让对应的列表出现，自然也能让对应列表之外的 列表消失
	$('.leftmenu').on('mouseleave',function(){
		$('.addCont').css('display','none').stop(true).animate({
			'opacity':'0.5',
			'filter': 'alpha(opacity=50)',
			'left':'170'
		})
		
		$('.menu-list li').css('background','#cb3e25').find('i').stop(true).animate({
			'padding-left':'0'
		},200);
		
	})
	
	
	//右侧固定边栏
	

	$('.cart-nav-list-bot li').on('mouseenter',function(){
		//狗头变色
		$(this).find('.kefu').css('background-position','-3px -425px');
		//出现客服对话框
		$(this).find('.imgMove').css('display','block').stop(true).animate({
			'left':'-230',
			'width':'230'
		})
		$(this).find('.tagMove').css('display','block').stop(true).animate({
			'left':'-80',
			'width':'80'
		},'fast')
		$(this).find('.appMove').css('display','block').stop(true).animate({
			'left':'-240',
			'width':'240'
		},'fast')
	})
	
	$('.cart-nav-list-bot li').on('mouseleave',function(){
		$(this).find('.kefu').css('background-position','-2px -191px');
		//客服对话框消失
		$(this).find('div').stop(true).animate({
			'left':'0',
			'width':'0'
		},'fast',function(){
			$(this).css('display','none');
		});
		
	})
	
	//回到顶部
	$('.backTop').click(function(e){
		e.preventDefault();
//		var scrollTop = $(document).scrollTop;
//		console.log(scrollTop);
		$('html,body').animate({
			'scrollTop':0
		})
	})
	
	//阻止冒泡
	$('.gou-cart').click(function(e){
		e.stopPropagation()
	})
	
	$('.acount,.cart,.sameTag').click(function(e){
		e.preventDefault();
		console.log('gg')
		$('.gou-cart').animate({
			right:0
		},'fast')
	})
	
	$(document).click(function(e){
		$('.gou-cart').animate({
			right:-280
		},'fast')
	})
	
})