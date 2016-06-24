var list = document.getElementById("list");
var arr = [];//


function render() {                        /*列出此数组*/
    list.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var div = document.createElement("div");
        div.innerText = arr[i];
        div.setAttribute("style", "height:" + arr[i] + "px;");
        list.appendChild(div);
    }
}

//function render() {
//    var str = arr.reduce(function (prev, cur) {
//        return prev + "<div style='height:" + v + "px'></div>"
//    }, "");
//    list.innerHTML = str;
            //这么做不能用append 加入到div中去了

//}

function addNum() {
    var num = document.getElementsByTagName("input")[0].value.trim();
    if (num >= 10 && num <= 100) {
        if (arr.length <= 60) {
            if (num == parseFloat(num)) {
                if (this.name == "leftin") {
                    arr.unshift(num);
                    render();
                } else if (this.name == "rightin") {
                    arr.push(num);
                    render();
                }
            } else {
                alert("请输入数字")
            }
        } else {
            alert("队列元素不得超过60个")
        }
    } else {
        alert("输入数字应为10-100之间")
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

function randomNum() {
    for (var i = 0; i < 50; i++) {
        var num = Math.ceil(Math.random() * 300);
        arr[i] = num;
    }
    render();
}



function bubbleSort() {
    if (arr.length == 0) { alert("队列为空无法排序"); return false;}
    var Clock;
    var count = 0, j = 0;
    Clock = setInterval(              //没有setinterval 就没有循环了。不能设置循环 因为设置时间间隔，循环并不停止，所以用setinterval来充当循环条件。
        function () {
            if (count == arr.length) { clearInterval(Clock); }
            if (j == arr.length - 1 - count) { j = 0; count++; }
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                render();
            }
            j++;
        }, 100);
}




var btn = document.getElementsByTagName("button");
btn[0].onclick = addNum;
btn[1].onclick = addNum;
btn[2].onclick = dltNum;
btn[3].onclick = dltNum;
btn[4].onclick = randomNum;
btn[5].onclick = bubbleSort;