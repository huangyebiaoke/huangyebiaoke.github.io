---
uuid: 6b137a36-b56a-00d7-19b9-ea5d63ae394a
title: 跳跳球
date: 2017-10-06 16:12:38
tags:
  - H5
  - canvas
  - JS
---
这些天没什么事读了《HTML5游戏开发》这本书，做一下实例：
<img src="/assets/blogimg/item_game_tiaotiaoball_ball.png">
<!--more-->
1.<a href="/item/game/tiaotiaoball/settime">计时器：</a>
``` bash
<html>
<head>
    <meta charset="UTF-8"> <!--解决中文乱码的问题-->
    <script>
        function init() {
            setInterval("document.f.display.value=String(Number(document.f.display.value)+1)",1000);
        }//定时器 每隔一秒加一次
        /*function incre() {
         document.f.display.value=String(Number(document.f.display.value)+1);

         }*/

    </script>
</head>
<body onload="init()">
    <form name="f"><!--不写form总报错 不知道为啥-->
        <input name="display" type="text" value="0"/>
    </form>
</body>
</html>
```
2.<a href="/item/game/tiaotiaoball/ball1">用canvas插入img：</a>
``` bash
<html>
<head>
	<title>ball</title>
	<script type="text/javascript">
	var img1=new Image();
	var img2=new Image();
	img1.src="../../images/cool.jpg";
	img2.src="../../images/dog.gif";
	var ctx;
	function init(){
		ctx=document.getElementById("canvas").getContext('2d');
		ctx.drawImage(img1,10,20,50,50);
        ctx.drawImage(img2,150,20,100,100);
	}
	</script>
</head>
<body onload="init();">
	<canvas id="canvas" width="400" height="400" style="background-color: aqua;">
		your browser don't support convas
	</canvas>
</body>
</html>
```
3.<a href="/item/game/tiaotiaoball/ball">跳跳球：</a>
``` bash
<html>
<head>
	<title>ball</title>
	<meta charset="utf-8">
	<script type="text/javascript">
	var boxx=50,boxy=50,boxw=300,boxh=300;//盒子左上角据左边画布的距离，盒子左上角据上边画布的距离，盒子的宽高；
	var ballx=20,bally=20,ballvx=2,ballvy=4,ballr=6;//球的初始位置（相对盒子），球的位移，球的半径；
	var hshang=boxy+ballr,hxia=boxh+boxy-ballr,hzuo=boxx+ballr,hyou=boxw+boxx-ballr;//里面的小盒子 用于检测碰撞；
	var ctx;//保存上下文 不太懂上下文是啥
	function init(){
		ctx=document.getElementById("canvas").getContext('2d');//获取canvas的上下文
		ctx.fillStyle="rgb(200.0.0)";//设置填充颜色
		ctx.lineWidth=6; //设置线宽
		moveball();//先显示ball
		setInterval(moveball,10); //setTimeout()只执行一次事件 不能重复调用moveball事件；
	}
	function moveball() {
		ctx.clearRect(boxx,boxy,boxw,boxh);//擦除整个盒子包括ball 第一次运行不会有任何影响
		moveandcheck();
		ctx.beginPath();
		ctx.arc(ballx,bally,ballr,0,2*Math.PI,true);//画圆
		ctx.fill();
		ctx.strokeRect(boxx,boxy,boxw,boxh);//画盒子
    }
    function moveandcheck() {//检测碰撞
		var perballx=ballx+ballvx,perbally=bally+ballvy;
		if(perballx>hyou) {//如果超过小盒子的右边
		    ballvx=-ballvx;//改变水平方向
		    perballx=hyou; //"设置下一个x等于这个边界值" 没看懂啥意思；
		}
        if(perballx<hzuo) {
		    perballx=hzuo;
            ballvx=-ballvx;
        }
        if(perbally>hxia) {
		    perbally=hxia;
            ballvy=-ballvy;
        }
        if(perbally<hshang) {
            perbally=hshang;
            ballvy=-ballvy;
        }
        ballx=perballx;
		bally=perbally;
    }
    function change() {
	    ballvx=Number(document.f.vx.value);
	    ballvy=Number(document.f.vy.value);
    }//在form标签里调用onsubmit="return change();"需要设置return false不然会整个刷新页面
	</script>
</head>
<body onload="init();">
	<canvas id="canvas" width="400" height="400" style="background-color: aqua;">
		your browser don't support convas
	</canvas>
	<form name="f" id="f">
		水平速度:<input name="vx" id="vx" type="number" value="2">
		垂直速度:<input name="vy" id="xy" type="number" value="4">
		<input type="button" value="change" onclick="change()">
	</form>
</body>
</html>
```
附：
1.[The Essential Guide to HTML5---using games to learn html5 and javascript](http://www.friendsofed.com/downloads.html)