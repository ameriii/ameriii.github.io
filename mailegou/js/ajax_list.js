//每36要分页 分页时显示 page page 要程序调
$(function() {
	var address = location.href.replace(/\?.*/g, "");
	var name = location.search.slice(1);
	var jsonNum = name;
	var count = 0;
	
	if(jsonNum>2){
		jsonNum = 2;
	}
	$.ajax({
		type: "GET",
		url: '../data/list_' + jsonNum + '.json',
		async: true,
		success: function(response) {
			update(response);
		}
	})

	function update(response) {
		var $ulNode = $('.goodsList ul');
		var arr = response;
		count = response.length;

		//小于36项时只有一页，不显示翻页栏
		if(count <= 36) {
			$('.page').css('display', 'none');
		} else {
			$('.page').css('display', 'block');
			pageAddEvent(response);
		}

		//i用来传输传入 商品详情页的信息,判断点击的是哪个商品，判断显示什么商品详情页面,后备用的
		var i = 0;
		//清空ul列表，再通过json添加数据
		$('.goodsList ul').html("");
		$.each(arr, function(index, date) {
			if(i >= 36) {

			} else {
				var $liNode = $('<li/>');
				$liNode.append('<a href="goodsDescription.html?' + name +'_' + i + '" class="pic" target="_blank"><img src="' + this.pic + '"/></a>');
				$liNode.append('<div class="price-info"><strong>' + this.totalPirce + '</strong><span>' + this.price + '</span></div>');
				$liNode.append('<p><a href="goodsDescription.html?' + name +'_' + i + '" target="_blank"><b>' + this.num + '<i></i></b> ' + this.msg + '</a></p><div class="activeTag"></div>');
				$liNode.append('<div class="ass"><span>' + this.sales + ' </span><span>' + this.comment + '</span></div>');
				$liNode.append('<div class="btn"><input class="addCar" type="button" value="加入购物车" /><a href="#">收藏</a></div>')
				$ulNode.append($liNode);
			}
			i++;
		});

	}
	//控制换页栏
	function pageAddEvent(response) {

		$('.page a:lt(3)').click(function(e) {
			$('.page a').eq(2).addClass('now').siblings().removeClass('now');
			$('.page div a:lt(3)').addClass('none');
			$('.page div a:gt(2)').removeClass('none');
			update(response);
			
			$(document).scrollTop(830);
			
			e.preventDefault();
		});

		$('.page a:gt(2)').click(function(e) {
			$('.page a').eq(3).addClass('now').siblings().removeClass('now');
			$('.page div a:lt(3)').removeClass('none');
			$('.page div a:gt(2)').addClass('none');
			e.preventDefault();

			var $ulNode = $('.goodsList ul');
			var arr = response;
			
			//i用来传输传入 商品详情页的信息,判断点击的是哪个商品，判断显示什么商品详情页面,后备用的
			var i = 0;
			//清空ul列表，再通过json添加数据
			$('.goodsList ul').html("");
			$.each(arr, function(index, date) {
				if(i >= 36) {
					var $liNode = $('<li/>')
					$liNode.append('<a href="goodsDescription.html?' + name +'_' + i + '" class="pic" target="_blank"><img src="' + this.pic + '"/></a>');
					$liNode.append('<div class="price-info"><strong>' + this.totalPirce + '</strong><span>' + this.price + '</span></div>');
					$liNode.append('<p><a href="goodsDescription.html?' + name +'_' + i + '"><b>' + this.num + '<i></i></b> ' + this.msg + '</a></p><div class="activeTag"></div>');
					$liNode.append('<div class="ass"><span>' + this.sales + ' </span><span>' + this.comment + '</span></div>');
					$liNode.append('<div class="btn"><input class="addCar" type="button" value="加入购物车" /><a href="#">收藏</a></div>')
					$ulNode.append($liNode);
				}
				i++;
			});
			$(document).scrollTop(830);
		})

	}

})