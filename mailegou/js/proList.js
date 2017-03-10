$(function(){
	
	//修改全部商品分类向下滑动
	$('.allPro').hover(function(){
		$('.menubox').stop(true).slideDown('fast')
	},function(){
		$('.menubox').stop(true).slideUp('fast')
	})
	
	//事件委托,点击购买
	$('.goodsList').on('click','.btn .addCar',function(){
		//目标li
		var $that = $(this).parents('li');
		
		var img = $that.find('.pic img').attr('src');
		var title = $that.find('p a').text();
		var price = $that.find('.price-info strong').text().replace(/\D*/g,'');
		var num = 1;
		var goodObj = {
			"title":title,
			"num":num,
			"img":img,
			"price":price
		}
		console.log(goodObj);
		
		
		//判断存不存在 cookie('car'),如果不存在就创建，存在就给car值添加数据
		var strCookie = $.cookie('car');//这里获取到的cookie值是字符串
		
		var cookieObj = strCookie ? JSON.parse(strCookie) : [];
//		console.log(cookieObj);
		
		var bool = true;
		//如果不存在的话 没必要遍历 ，我懒得改了，遍历一边也没问题
		$.each(cookieObj, function() {
			if(this.title==goodObj.title){
				this.num = this.num*1+(goodObj.num)*1;
				bool=false;
			}
		});
		//如果商品不存在就 添加一个商品对象，如果存在，就给num+1
		if(bool){
			cookieObj.push(goodObj);
		}
		
		$.cookie("car", JSON.stringify(cookieObj),{
			"expires":1,
			"path":"/"
		})
		//cookie是 json字符串 / 插件处理的
		console.log($.cookie('car'));
		
		var goCart = confirm("购买成功,去结算?");
		if(goCart){
			window.open('myCart.html')
		}
		
		//点击的同同时刷新购物车,找不到别的文件的函数？？？因为作用域
		getCookie();
	})
	
	
	
})




















   