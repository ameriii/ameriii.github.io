//  [\u4e00 - \u9fa5] 中文字符    [^(\u4e00-\u9fa5)^(a-zA-Z)^(0-9)]   pattern.test(text)||

var data = [];
var div = document.getElementById("list");
function getData() {
    var text = document.getElementsByTagName("textarea")[0].value.trim();
    if (text == "") { alert(123); return false; }                               //trim()方法会去掉换行符等空白符？ 所以当输入换行符是 显示==""，为true
    var word = text.split(/[^(\u4e00-\u9fa5)^(a-zA-Z)^(0-9)]+/g);               //不适用于字符串开头结尾有分隔符的情况！    
    if (word[0] == "") { word.shift(); }                                        //以下两个判断用于删除数组开头结尾的空项。
    if (word[word.length - 1] == "") { word.pop();}
    data = data.concat(word);
    render();
}

function render() {
    var innerHtml = "";
    for (var i in data) {
        var shuju = "<div>" + data[i] + "</div>";
        innerHtml += shuju;
    }
    div.innerHTML = innerHtml;
}

var innerDiv = div.getElementsByTagName("div");
function searchData() {
    render();
    var input = document.getElementsByTagName("input")[0].value.trim();
    var pattern = new RegExp(input,"g");
    for (var i in data) {
        var matches = String(data[i]).match(pattern);
        if (matches != null) {
            //innerDiv[i].setAttribute("style","color:red;");        //indexOf如何找到与字符串相匹配的字符段所在的位置？？？
            innerDiv[i].innerHTML = String(data[i]).replace(pattern, "<span style='color:red;'>" + input + "</span>");            //使用构造函数创建的正则表达式，不能使用$1?;
            //alert(innerDiv[i].firstChild.nodeValue);
        }
    }
}



//改变某部分字体的颜色的方法， 此方法不适用于多个子匹配字符串的情况。
//var dd = document.getElementsByTagName("p")[0];
//var pp = document.getElementsByTagName("p")[0].firstChild.nodeValue;
//var pa = new RegExp("67","g");
//var input = 67;
//dd.innerHTML = String(pp).replace(pa, "<span style='color:red;'>"+input+"</span>");    //用input不能用 $1？？ 
////dd.innerHTML = String(pp).replace(pa, input+1);

//问题点：
//还存在的问题是，因为不能用$1 只能用input代替，而input 并不一定与$1的值一样。 如 输入23|32，正则匹配其中之一，而input为整个。








var btn = document.getElementsByTagName("button");
btn[0].addEventListener("click", getData);
btn[1].addEventListener("click", searchData);