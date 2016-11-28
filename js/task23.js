window.onload = function() {
	var divArr = document.getElementsByTagName('div');
	var rootNode = document.querySelector('#root');
	var btnArr = document.getElementsByTagName('button');
	var inputNode = document.getElementsByTagName('input')[0];
	var arr = [];
	var textArr = [];
	var current = null;

	//前序遍历 (递归)
	function preOrder(node, targetText) {
		arr.push(node);
		//字节点数不为0
		var childNode = node.childNodes;
//		console.log(arr)
		if(node.childNodes.length != 0) {
			for(var i = 0; i < childNode.length; i++) {
				//				console.log(childNode[i])

				if(childNode[i].nodeType == 3 && childNode[i].nodeValue.trim()) {
					var search = childNode[i].nodeValue.trim();
					textArr.push(childNode[i].nodeValue.trim());
					if(search==targetText){
					}
				}
				if(childNode[i].nodeType == 1) {
					preOrder(childNode[i], targetText);
					//					return;
				}
			}
		}
	}
//	preOrder(rootNode, undefined);

	function startTraverse(targetText) {
		var i = 0;
		timer = setInterval(function() {
			//清除前一个元素背景色
			if(i > 0) {
				arr[i - 1].style.backgroundColor = 'initial';
			}

			if(i >= arr.length) {
				clearInterval(timer);
				console.log("gg");
				return;
			}
			arr[i].style.backgroundColor = 'rgba(255,0,0,0.6)';
			
			var cc = textArr[i];
//			console.log(cc,targetText)
			if(textArr[i] == targetText) {
				console.log(arr[i])
				arr[i].style.background = "gray";
				clearInterval(timer);
				return;
			}
			i++;
		}, 500)
	}
	btnArr[0].onclick = function(){
		arr = [];
		preOrder(rootNode,undefined);
		startTraverse(undefined);
	}
	btnArr[1].onclick = function() {
		arr = [];
		var search = inputNode.value;
		console.log(search);
		preOrder(rootNode,search);
		startTraverse(search);
	}
}