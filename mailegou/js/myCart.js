$(function() {
	//先刷新cookie 将物品添加到购物车
	var cookie = JSON.parse($.cookie('car'));
	console.log(cookie)
	for(var i = 0; i < cookie.length; i++) {
		CreateTr(cookie[i]);
	}
	allPrice();

	function allPrice() {
		var total = 0;
		$('.goodlist').each(function() {
			if($(this).find('td input[name="good"]').prop('checked')) {
				total += $(this).find('.totalPrice').text().slice(1) * 1;
			}
		});
		$('.acountR .money em').text('￥' + total + '.00');
	}
	//单间商品checked按钮控制
	$('.goodlist').on('click', 'td  input[name="good"]', function() {
		$(this).toggleClass('checked')
			//		if($(this).hasClass('checked'))
		$(this).prop('checked', $(this).hasClass('checked'));
		//遍历所有，判断全选应该为哪种状态
		var $goodsBtn = $('td  input[name="good"]');
		var check = true;
		$goodsBtn.each(function() {
			if(!$(this).prop('checked')) {
				check = false;
			}
		});
		//true 勾选  false不勾选
		if(check) {
			$('.myCart input[name="qx"]').prop('checked', 'checked');
			$('.myCart input[name="qx"]').addClass('checked');
		} else {
			$('.myCart input[name="qx"]').removeProp('checked', 'checked');
			$('.myCart input[name="qx"]').removeClass('checked');
		}
		allPrice();
	})

	//页面加载是全选按钮控制
	if($('.myCart input[name="qx"]').hasClass('checked')) {
		$('.myCart input[name="qx"]').prop('checked', 'checked');
	}

	//全选按钮控制
	$('.myCart input[name="qx"]').click(function() {
		console.log('11')
		$('input[name="qx"]').toggleClass('checked');
		$('input[name="qx"]').prop('checked', $('input[name="qx"]').hasClass('checked'));
		if($('input[name="qx"]').hasClass('checked')) {
			//			$('input[name="qx"]').attr('checked','checked');
			$('td input[name="good"]').prop('checked', 'checked');
			$('td input[name="good"]').addClass('checked')
		} else {
			//			$('input[name="qx"]').removeAttr('checked');
			$('td input[name="good"]').removeProp('checked');
			$('td input[name="good"]').removeClass('checked')
		}
		allPrice();
	})

	function CreateTr(obj) {
		var $tr = $('<tr class="goodlist"></tr>');
		var $td1 = $('<td><input type="checkbox" name="good"  checked="checked" class="checked" /><div><img src="' + obj.img + '"/></div><p>' + obj.title + '</p></td>');
		var $td2 = $('<td><span class="price">￥' + obj.price + '.00</span></td>');
		var $td3 = $('<td><div class="sunNum"><div class="dd dddiv"><a class="minus">-</a><input type="text" name="Amount" class="Amount" value="' + obj.num + '" maxlength="2" /><a class="add">+</a></div></div></td>')
		var $td4 = $('<td><span class="totalPrice">￥' + obj.price * 1 * obj.num + '.00</span></td>');
		var $td5 = $('<td><a href="#" class="delete">删除</a></td>');
		$tr.append($td1).append($td2).append($td3).append($td4).append($td5);
		$('.cartWrap table tbody').append($tr);
	}

	//选择购买数量
	$('.dddiv .Amount').keyup(function() {
			//		console.log($(this));
			var oldValue = $(this).val();
			var num = oldValue.replace(/\D/g, '');
			console.log(oldValue, num)
			if(oldValue != num || num == '' || num == 0) {
				if(parseInt(num) > 0) {
					return $(this).val(parseInt(num));
				} else {
					return $(this).val(parseInt(1));
				}
			} else {
				return;
			}
		})
		//加减数量
	$('.dddiv .minus').click(function() {
		var oldValue = $(this).next().val();
		var newValue = parseInt(oldValue) - 1;
		if(newValue <= 0) {
			alert('一件都不买, 还点个毛啊！');
			$(this).next().val(1);
		} else {
			$(this).next().val(newValue);
		}

	})

	$('.dddiv .add').click(function() {
		var oldValue = $(this).prev().val();
		var newValue = parseInt(oldValue) + 1;
		if(newValue >= 99) {
			$(this).prev().val(99);
		} else {
			$(this).prev().val(newValue);
		}
	})

	//点击总价变化
	$('.goodlist').on('change', '.Amount', function() {
		sumPrice($(this).parents('.goodlist'))
	});
	$('.goodlist').on('click', '.minus,.add', function() {
		sumPrice($(this).parents('.goodlist'))
	});

	function sumPrice(node) {
		var unit = node.find('.price').text().slice(1);
		var num = node.find('.Amount').val();
		var sum = unit * 1 * num;
		var total = 0;
		$(node).find('.totalPrice').text('￥' + sum + '.00');
		$('.totalPrice').each(function() {
			if($(this).parents('.goodlist').find('td input[name="good"]').hasClass('checked')) {
				total += $(this).text().slice(1) * 1;
			}
			//			console.log($(this),total)
		})
		$('.acountR .money em').text('￥' + total + '.00');
	}

	//点击删除单个物品，及cookie
	$('tbody').on('click', 'tr .delete', function(e) {
		console.log('g')
		e.preventDefault();
		var del = confirm("确定不购买该商品？")
		if(del) {
			//删除cookie
			var cookie = JSON.parse($.cookie('car'));
			var index = $(this).parents('.goodlist').index('.goodlist');
			//			console.log($(this).parents('.goodlist').index('.goodlist'))

			cookie.splice(index, 1);
			console.log(cookie)
			
//			$.cookie('car', {
//				'expires': -1
//			});
			$.cookie('car', JSON.stringify(cookie), {
				"expires": 1,
				"path": "/"
			});
			//删除节点
			$(this).parents('.goodlist').remove();
			allPrice()
		}
	})
})