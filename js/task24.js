window.onload = function() {
	var divArr = document.getElementsByTagName('div');
	var rootNode = document.querySelector('#root');
	var btnArr = document.getElementsByTagName('button');
	var inputArr = document.getElementsByTagName('input');
	var arr = [];
	var textArr = [];
	var current = "";

	//	console.log(rootNode.firstChild.childNodes.length)
	console.log(rootNode.className)
		//前序遍历 (递归)
	function preOrder(node) {
		//删除节点class属性
		node.removeAttribute('class');
		arr.push(node);
		var childNodes = node.childNodes;
		var childNodesLength = childNodes.length;
		if(childNodesLength) {
			for(var i = 0; i < childNodesLength; i++) {
				if(childNodes[i].nodeType == 3 && childNodes[i].nodeValue.trim()) {
					textArr.push(childNodes[i].nodeValue.trim());

				}
				if(childNodes[i].nodeType == 1) {
					preOrder(childNodes[i]);
				}
			}
		}
	}
	preOrder(rootNode);
//	console.log(arr);
//	console.log(textArr);

	function startTraverse(targetText) {
		var i = 0;
		var length = arr.length
		var timer = setInterval(function() {

			//清除前一个元素背景色
			if(arr[i - 1]) {
				arr[i - 1].removeAttribute('class');
			}
			if(i >= length) {
				clearInterval(timer);
				console.log("gg")
				return;
			}
			var text = arr[i].firstChild.nodeValue.trim();
			//查找文本节点是否为查询值
			if(text == targetText) {
				arr[i].setAttribute('class', 'target');
				clearInterval(timer);
				return;
			}

			arr[i].setAttribute('class', 'changeColor');
			i++;
		}, 400)

	}
	
	var targetNode = null;
	window.onclick = function(evt){
		var oEvent = evt||event;
		var target = oEvent.target;
		
		//删除所有节点的class属性,遍历的时候带了去除class功能
		if(target.nodeName=='DIV'){
			preOrder(rootNode);
		}
		
		if(target.nodeName=='DIV'){
			target.setAttribute('class','target');
			targetNode = oEvent.target;
		}
		
	}
	
	
	
	
	btnArr[0].onclick = function() {
		arr = [];
		preOrder(rootNode);
		startTraverse();
	}
	btnArr[1].onclick = function() {
		var targetText = inputArr[0].value.trim();
		arr = [];
		preOrder(rootNode);
		if(targetText) {
			startTraverse(targetText);
		} else {
			startTraverse();
		}
	}
	//删除节点
	btnArr[2].onclick = function(){
		if(targetNode){
			targetNode.parentNode.removeChild(targetNode);
			targetNode = null;
		}

	}
	//添加节点
	btnArr[3].onclick = function(){
		var addText = inputArr[1].value.trim();
		if(targetNode){
			var newDiv = document.createElement('div');
			var textNode = document.createTextNode(addText);
//			newDiv.setAttribute('class','target');
			console.log(newDiv)
			newDiv.appendChild(textNode);
			targetNode.appendChild(newDiv);
			targetNode.removeAttribute('class');
			targetNode = null;
		}
	}
}

//	preOrder(rootNode, undefined);