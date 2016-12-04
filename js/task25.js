window.onload = function() {
	var rootNode = document.getElementById('root');
	var divArr = document.getElementsByTagName('div');
	var spanArr = document.getElementsByTagName('span');
	var btnArr = document.getElementsByTagName('button');
	var inputArr = document.getElementsByTagName('input');
	var arr = [];
	var textArr = [];
//		console.log(rootNode.firstElementChild);

	//	rootNode.setAttribute('style','display: block;')
	function preOrder(node, display) {
		//删除节点class属性
		node.removeAttribute('class');
		//遍历时给所有节点添加style display block;
		//第一遍遍历时给它全部hide,免得在html中一个个添加display
		if(display == 'hide') {
			if(node.id != 'root') {
				var attri = node.getAttribute('style');
//				console.log(attri)
				if(attri != 'display: none;') {
					node.setAttribute('style', 'display: none;')
				}
			}
		}else if(display == 'show'){
			if(node.id != 'root') {
				var attri = node.getAttribute('style');
//				console.log(attri)
				if(attri != 'display: block;') {
					node.setAttribute('style', 'display: block;')
				}
			}
		}

		arr.push(node);
		var childNodes = node.childNodes;
		var childNodesLength = childNodes.length;
		if(childNodesLength) {
			for(var i = 0; i < childNodesLength; i++) {
				if(childNodes[i].nodeType == 3 && childNodes[i].nodeValue.trim()) {
					textArr.push(childNodes[i].nodeValue.trim());

				}
				if(childNodes[i].nodeType == 1 && childNodes[i].nodeName == 'DIV') {
					if(display=='hide'){
						preOrder(childNodes[i],'hide');
					}else if(display=='show'){
						preOrder(childNodes[i],'show');
					}else{
						preOrder(childNodes[i]);
					}

				}
			}
		}
	}
	preOrder(rootNode, 'hide');
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
			var text = textArr[i];
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
	//机智的事件委托，这样可给新建的节点同样绑定了事件
	window.onclick = function(evt) {
		var oEvent = evt || event;
		var target = oEvent.target;
//		console.log(target)
		//删除所有节点的class属性,遍历的时候带了去除class功能
		if(target.nodeName == 'DIV') {
			preOrder(rootNode);
		}

		if(target.nodeName == 'DIV') {
			target.setAttribute('class', 'target');
			targetNode = oEvent.target;
		}
		if(target.nodeName == 'SPAN') {
			var nodeValue = target.firstChild.nodeValue;
			if(nodeValue == "+") {
				target.firstChild.nodeValue = "-";
				findSiblingsDiv(target, 'show');
			} else {
				target.firstChild.nodeValue = "+";
				findSiblingsDiv(target, 'hide');
			}
		}
	}

	btnArr[0].onclick = function() {
		arr = [];
		preOrder(rootNode,'show');
		startTraverse();
	}
	btnArr[1].onclick = function() {
			var targetText = inputArr[0].value.trim();
			arr = [];
			preOrder(rootNode,'show');
			if(targetText) {
				startTraverse(targetText);
			} else {
				startTraverse();
			}
		}
		//删除节点
	btnArr[2].onclick = function() {
			if(targetNode) {
				targetNode.parentNode.removeChild(targetNode);
				targetNode = null;
			}

		}
		//添加节点
	btnArr[3].onclick = function() {
		var addText = inputArr[1].value.trim();
		if(targetNode) {
			console.log(targetNode);
			var newDiv = document.createElement('div');
			var textNode = document.createTextNode(addText);
			//创建span
			var spanNode = createSpan();
			newDiv.appendChild(spanNode);
			newDiv.appendChild(textNode);
			targetNode.appendChild(newDiv);
			targetNode.removeAttribute('class');

			//添加节点的时候全部打开 ，所以 改为-，并且打开节点
			var targetSpan = targetNode.firstElementChild;
			targetSpan.innerHTML = '-';
			findSiblingsDiv(targetSpan, 'show');
			targetNode = null;
		}
	}

}

function createSpan() {
	var spanNode = document.createElement('span');
	spanNode.setAttribute('class', 'tag');
	spanNode.innerHTML = "+";
	return spanNode;
}

function findSiblingsDiv(node, display) {
	var arr = [];
	var parentNode = node.parentNode;
	var nodeList = parentNode.childNodes;
	for(var i = 0; i < nodeList.length; i++) {
		if(nodeList[i].nodeType == 1 && nodeList[i].nodeName == 'DIV') {
			arr.push(nodeList[i]);
			if(display == 'show') {
				nodeList[i].setAttribute('style', 'display: block;');
			} else if(display == 'hide') {
				nodeList[i].setAttribute('style', 'display: none;');
			}
		}
	}
//	console.log(arr);
	return arr;
}