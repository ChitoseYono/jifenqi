var sum1 = 0,
	sum2 = 0,
	sum3 = 0,
	sum4 = 0;
var count = 1;
var no = document.getElementById("no");
var oprow = document.getElementById("operationrow");
var point1 = document.getElementById("pointplayer1");
var point2 = document.getElementById("pointplayer2");
var point3 = document.getElementById("pointplayer3");
var point4 = document.getElementById("pointplayer4");
var tbody = document.querySelector("tbody");

var btn0 = document.getElementById("start");
var btn1 = document.getElementById("add");
var btn2 = document.getElementById("finish");

var div1 = document.getElementById("init");
var div2 = document.getElementById("game");
div2.style.display = "none";

//填名字逻辑
btn0.onclick = function() {
	var players = new Array(4);
	for (var i = 1; i <= 4; i++) {
		players[i - 1] = document.getElementById("name" + i).value;
		if (players[i - 1] == "") {
			alert("请输入玩家名字！");
			return;
		}
	}
	for (var i = 1; i <= 4; i++) {
		document.getElementById("player" + i).innerText = players[i - 1];
	}
	div1.style.display = "none";
	div2.style.display = "";
}

//下一局逻辑
btn1.onclick = function() {
	//取值并验证
	tmp1 = parseInt(point1.value);
	tmp2 = parseInt(point2.value);
	tmp3 = parseInt(point3.value)
	tmp4 = parseInt(point4.value);
	if(isNaN(tmp1)||isNaN(tmp2)||isNaN(tmp3)||isNaN(tmp4)){
		alert("请输入全部分数！");
		return;
	}
	//序号处理
	nowno = no.innerText;
	count = count + 1;
	no.innerText = count;
	//分数积累
	sum1 = sum1 + tmp1;
	sum2 = sum2 + tmp2;
	sum3 = sum3 + tmp3;
	sum4 = sum4 + tmp4;
	//重置
	point1.value = "";
	point2.value = "";
	point3.value = "";
	point4.value = "";
	//插入行
	var tr = document.createElement('tr');
	var td0 = document.createElement('td');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	var td4 = document.createElement('td');
	td0.innerHTML = nowno;
	td1.innerHTML = sum1;
	td2.innerHTML = sum2;
	td3.innerHTML = sum3;
	td4.innerHTML = sum4;
	tr.append(td0);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(td4);
	tbody.insertBefore(tr, oprow);
}

//结算逻辑
btn2.onclick = function() {
	
	//取值并验证
	tmp1 = parseInt(point1.value);
	tmp2 = parseInt(point2.value);
	tmp3 = parseInt(point3.value)
	tmp4 = parseInt(point4.value);
	if(isNaN(tmp1)||isNaN(tmp2)||isNaN(tmp3)||isNaN(tmp4)){
		alert("请进行游戏后再结算！");
		return;
	}
	
	//分数积累
	sum1 = sum1 + tmp1;
	sum2 = sum2 + tmp2;
	sum3 = sum3 + tmp3;
	sum4 = sum4 + tmp4;
// 	var tr = document.createElement('tr');
// 	var td0 = document.createElement('td');
// 	var td1 = document.createElement('td');
// 	var td2 = document.createElement('td');
// 	var td3 = document.createElement('td');
// 	var td4 = document.createElement('td');
// td0.innerHTML = "结算";

	//结算初始化
	var won = [0, 0, 0, 0];
	var flag = 0;

	var values = [sum1, sum2, sum3, sum4];
	values.sort(function(value1, value2) {
		return value1 - value2;
	});

	//玩家得分排序
	order = [0, 0, 0, 0]
	tmp = 0;
	for (var i = 0; i < 4; i++) {
		val = values[i];
		switch (val) {
			case sum1:
				order[tmp] = 1;
				break;
			case sum2:
				order[tmp] = 2;
				break;
			case sum3:
				order[tmp] = 3;
				break;
			case sum4:
				order[tmp] = 4;
				break;
			default:
				break;
		}
		tmp = tmp + 1;
	}

	//计算各值
	for (var i = 0; i < 4; i++) {
		for (var j = i + 1; j < 4; j++) {
			values[j] -= values[i];
			won[i] += values[j];
			won[j] -= values[j];
		}
	}
// 	no.innerText = "";
// 	point1.value = "";
// 	point2.value = "";
// 	point3.value = "";
// 	point4.value = "";
	alert("第一名玩家" + document.getElementById("player" + order[0]).innerText + "得分为" + won[0] + "\n" +
		"第二名玩家" + document.getElementById("player" + order[1]).innerText + "得分为" + won[1] + "\n" +
		"第三名玩家" + document.getElementById("player" + order[2]).innerText + "得分为" + won[2] + "\n" +
		"第四名玩家" + document.getElementById("player" + order[3]).innerText + "得分为" + won[3] + "\n" +
		"点确定重新游戏");
		
	location.reload();
}
