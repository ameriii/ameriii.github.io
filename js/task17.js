/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day",
   
}

/**
 * 渲染图表
 */
function renderChart() {
    var div00 = document.getElementsByClassName("aqi-chart-wrap")[0];
    var colorStr = ["#aaa", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999"];
    div00.innerHTML = "";
    for (var datStr in chartData) {
        var crtdiv = document.createElement("div");
        crtdiv.setAttribute("title", datStr + " 污染指数为： " + chartData[datStr]);
        var color = colorStr[Math.floor(Math.random() * 10)];
        //color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16); 用于随机颜色，html中加了border，遇到白色与背景相同无碍。
        crtdiv.setAttribute("style", "height:" + chartData[datStr] + "px;" + "background:" + color + ";display:inline-block");
        div00.appendChild(crtdiv);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化          
    var input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked && input[i].value != pageState.nowGraTime) {
            pageState.nowGraTime = input[i].value;                            /*设置当前页面值*/
        }
    }
    // 设置对应数据
    
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    var optStr = document.getElementById("city-select").getElementsByTagName("option");
    for (var i = 0; i < optStr.length; i++) {
        if (optStr[i].selected) {
            pageState.nowSelectCity = optStr[i].value;                   /*设置当前页面值*/
            
        }
    
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

    var radio = document.getElementById("form-gra-time").getElementsByTagName("input");
    for (var i=0; i <radio.length; i++) {
        radio[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select");
    for (var city in aqiSourceData) {
        if (pageState.nowSelectCity == -1) {
            pageState.nowSelectCity = city;
        }
        var option = document.createElement("option");
        option.innerText = city;
        option.setAttribute("value", city);
        citySelect.appendChild(option);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = citySelectChange;                         /*onchange 事件会在域的内容改变时发生。响应设置的函数*/


}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var cityAqiData = aqiSourceData[pageState.nowSelectCity];
    if (pageState.nowGraTime === "day") {
        chartData = cityAqiData;
    }
    
    if (pageState.nowGraTime === "week") {
        chartData = {};
        var aqiSum = 0;
        var dayNum = 0;
        var strStartDate = "";
        for (var strdate in cityAqiData) {
            var date = new Date(strdate);
            var day = date.getDay();
            // 一周从周日开始，也就是day为0
            if (day === 0) {
                
                if (aqiSum > 0) {
                    var aqi = Math.floor(aqiSum / dayNum);
                    var key = strStartDate + "-" + strdate + "平均";
                    chartData[key] = aqi;
                }
                dayNum = 0;
                aqiSum = 0;
                strStartDate = strdate;
            } else {
                if (strStartDate === "") {
                    strStartDate = strdate;
                }
            }
            dayNum++;
            aqiSum += cityAqiData[strdate];
        }

        if (aqiSum > 0) {
            var aqi = Math.floor(aqiSum / dayNum);
            var key = strStartDate + "-" + strdate + "平均";
            chartData[key] = aqi;
        }
    }

    if (pageState.nowGraTime === "month") {
        chartData = {};
        var curMonth = -1;
        var dayNum = 0;
        var aqiSum = 0;
        for (var strdate in cityAqiData) {
            var date = new Date(strdate);
            var month = date.getMonth();
            if (month !== curMonth) {
                if (dayNum > 0) {
                    var aqi = Math.floor(aqiSum / dayNum);
                    var key = date.getFullYear() + "年" + date.getMonth() + "月" + "平均";
                    chartData[key] = aqi;
                }
                curMonth = month;
                dayNum = 0;
                aqiSum = 0;
            }
            dayNum++;
            aqiSum += cityAqiData[strdate];
        }
        if (dayNum > 0) {
            var aqi = Math.floor(aqiSum / dayNum);
            var key = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + "平均";
            chartData[key] = aqi;
        }
    }

    


    

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
    
}

init();