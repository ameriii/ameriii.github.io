$(function() {
	//商品列表序号
	var index = 0;
	
//	$('.menu-list li').eq(0).one('mouseenter', function(){
		ajaxChange($('.panel_1 .contBox'),1);
//	});
//	$('.menu-list li').eq(1).one('mouseenter', function(){
		ajaxChange($('.panel_2 .contBox'),2);
//	});
//	$('.menu-list li').eq(2).one('mouseenter', function(){
		ajaxChange($('.panel_3 .contBox'),3);
//	});
	
	function ajaxChange($node,n) {
		
		$.get('../data/productsList_'+n+'.json', function(response) {

			update(response,$node);
			
		})
	}
	function update(response,$node) {
			var arr = response;
			var $divNode = $node;
				//清空内容，准备更新内容
			$divNode.html("");
			
			for(var i = 0; i < arr.length; i++) {
				var $pNode = $('<p/>');

				for(var q = 0; q < arr[i].length; q++) {

					if(q == 0) {
						var $strongNode = $('<strong/>');
						var textNode = arr[i][q];
						$strongNode.text(textNode);
						$pNode.append($strongNode);
						
					} else {
						
						//判断字符串是否有?，来确定是否加类名
						if(/^on1\?/.test(arr[i][q])){
							
							var $aNode = $('<a href="productsList.html?'+index+'" class="on1" target="_blank"></a>');
							var textNode = arr[i][q].slice(4);
							
						}else{
							var $aNode = $('<a href="productsList.html?'+index+'" target="_blank"></a>');
							var textNode = arr[i][q];
							
						}

						$aNode.text(textNode);
						$pNode.append($aNode);
						
						index++;
					}

				}
				$divNode.append($pNode);
			}

		}
	
})