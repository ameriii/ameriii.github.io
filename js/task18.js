var list = document.getElementById("list");
var arr = [];
function render() {                        /*列出此数组*/
    list.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = arr[i];
        list.appendChild(div);
    }
}

function addNum() {
    var num = document.getElementsByTagName("input")[0].value.trim();
    if (num == parseFloat(num)) {
        if (this.name=="leftin") {
            arr.unshift(num);
            render();
        } else if (this.name == "rightin") {
            arr.push(num);
            render();
        } 
    } else {
        alert("请输入数字")
    }
}

function dltNum() {
    if (arr.length != 0) {
        if (this.name == "leftout") {
            var dlt = arr.shift();
            render();
            alert("你删除的数字是：" + dlt);
        } else if (this.name == "rightout") {
            var dlt = arr.pop();
            render();
            alert("你删除的数字是：" + dlt);
        }
    } else {
        alert("队列为空无法执行删除操作")
    }
}


var btn = document.getElementsByTagName("button");
btn[0].onclick = addNum;
btn[1].onclick = addNum;
btn[2].onclick = dltNum;
btn[3].onclick = dltNum;