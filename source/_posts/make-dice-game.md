---
uuid: 4f04e36e-bb79-92d4-0562-519d58de7dcb
title: 扔骰（tou）子小游戏
date: 2017-10-05 22:09:18
tags:
  - H5
  - canvas
  - JS
---
这些天没什么事读了《HTML5游戏开发》这本书，做一下实例：
### demo1:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>craps</title>
    <script>
        function init() {
            var ctx=document.getElementById("canvas").getContext('2d');
            ctx.beginPath();

            ctx.fillStyle = "rgb(200,0,200)";
            ctx.arc(200,20,200,0,0.5*Math.PI,true);
            ctx.lineWidth=5;
            ctx.closePath();
            ctx.strokeStyle = "rgb(200,0,0)";
            ctx.stroke();
            ctx.fill();

        }
    </script>
</head>
<body onload="init();" >
    <canvas id="canvas" width="400" height="400" style="background-color: aqua;">
      your explor don't support h5 cavas
    </canvas>

</body>
</html>
```
### demo2:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>craps</title>
    <script>
        var sw=50;//骰子的宽高
        var sh=50;
        var cw=400;//画布的宽高
        var ch=300;
        var sx=50;//骰子的距画布的位置
        var sy=50;
        var pd=6;//圆点半径
        var ctx;//保存上下文变量
        function init() {
            //var rs=1+math.floor(math.random()*6);
            var rs=5;
            drewface(rs);
        }


            function drewface(n) {
                ctx=document.getElementById("canvas").getContext('2d');
                ctx.lineWidth=5;
                ctx.clearRect(sx,sy,sw,sh);
                ctx.strokeRect(sx,sy,sw,sh);
                ctx.fillStyle = "rgb(0,0,0)";
                switch (n){
                    case 1: drew1(); break;
                    case 2: drew2(); break;
                    case 3: drew2(); drew1();  break;
                    case 4: drew4();  break;
                    case 5: drew4(); drew1(); break;
                    case 6: drew4(); drew2mid(); break;
                }

                /*ctx.beginPath();

                ctx.arc(200,20,200,0,0.5*Math.PI,true);
                ctx.lineWidth=5;
                ctx.closePath();
                ctx.strokeStyle = "rgb(200,0,0)";
                ctx.stroke();
                ctx.fill();*/
                function drew1() {
                    var px=sx+0.5*sw;
                    var py=sy+0.5*sh;
                    ctx.beginPath();
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.fill();
                }
                function drew2() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+sh-3-pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
                function drew4() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+sh-3-pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+3+pd;
                    py=sy+sh-3-pd;
                    ctx.closePath();/*注意要先结束左上角和右下角圆点的绘制不然会产生交叉感染*/
                    ctx.fill();
                    ctx.beginPath()
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
                function drew2mid() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+0.5*sh;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+0.5*sh;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
            }

    </script>
</head>
<body onload="init();" >
    <canvas id="canvas" width="400" height="300">
      your explor don't support h5 cavas
    </canvas>
</body>
</html>
```
### demo3:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>craps</title>
    <script>
        var sw=50;//骰子的宽高
        var sh=50;
        var cw=400;//画布的宽高
        var ch=300;
        var sx=50;//骰子的距画布的位置
        var sy=50;
        var pd=6;//圆点半径
        var ctx;//保存上下文变量
        function init() {
            var rs=1+Math.floor(Math.random()*6);
            drewface(rs);
            document.f.point.value=rs;
        }


            function drewface(n) {
                ctx=document.getElementById("canvas").getContext('2d');
                ctx.lineWidth=5;
                ctx.clearRect(sx,sy,sw,sh);
                ctx.strokeRect(sx,sy,sw,sh);
                ctx.fillStyle = "rgb(0,0,0)";
                switch (n){
                    case 1: drew1(); break;
                    case 2: drew2(); break;
                    case 3: drew2(); drew1();  break;
                    case 4: drew4();  break;
                    case 5: drew4(); drew1(); break;
                    case 6: drew4(); drew2mid(); break;
                }

                /*ctx.beginPath();

                ctx.arc(200,20,200,0,0.5*Math.PI,true);
                ctx.lineWidth=5;
                ctx.closePath();
                ctx.strokeStyle = "rgb(200,0,0)";
                ctx.stroke();
                ctx.fill();*/
                function drew1() {
                    var px=sx+0.5*sw;
                    var py=sy+0.5*sh;
                    ctx.beginPath();
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.fill();
                }
                function drew2() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+sh-3-pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
                function drew4() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+sh-3-pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+3+pd;
                    py=sy+sh-3-pd;
                    ctx.closePath();/*注意要先结束左上角和右下角圆点的绘制不然会产生交叉感染*/
                    ctx.fill();
                    ctx.beginPath()
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+3+pd;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
                function drew2mid() {
                    var px;
                    var py;
                    ctx.beginPath()
                    px=sx+3+pd;
                    py=sy+0.5*sh;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    px=sx+sw-3-pd;
                    py=sy+0.5*sh;
                    ctx.arc(px,py,pd,0,2*Math.PI,true);
                    ctx.closePath();
                    ctx.fill();
                }
            }

    </script>
</head>
<body onload="init();" >
    <canvas id="canvas" width="400" height="300">
      your explor don't support h5 cavas
    </canvas>
    <form name="f">
        <input type="submit" value="扔骰子">
        你的点数是<input name="point" type="text" value=" ">
    </form>
</body>
</html>
```
附：
1.[The Essential Guide to HTML5---using games to learn html5 and javascript](http://www.friendsofed.com/downloads.html)