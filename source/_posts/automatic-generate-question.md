---
uuid: f3a3e7b1-0306-72c3-968e-7ddd2f8d890a
title: 自动出题机
reward: true
date: 2018-09-24 12:01:24
toc: true
tags:
  - PHP
  - JS
  - MySQL

---
### background

    学校开始了新一轮的信息技术大赛,我们班的科技委员下发了3191道复习题,当时excel格式的复习题无论在PC和移动端看起来都不太方便,所以就想用一个空闲的时间弄一个自动出题机(带评分功能的).

### step1:mysql大法好

  关于mysql表的设计,总共有两张表(暂时),一张examination表存的是问题,答案,题号,难度之类的:

![5ba86bc0380f6](https://i.loli.net/2018/09/24/5ba86bc0380f6.png)

还有一张exam_report表存用户提交之后产生的数据,比如:内网ip,外网ip,agent,提交时间,分数和多少道题没做.

![5ba86cdf6f9e0](https://i.loli.net/2018/09/24/5ba86cdf6f9e0.png)

然后把excel导入数据库.

### step2:后端API的设计(PHP是web最牛逼的语言)

1. 先来说一下需求吧,首先是像从数据库中随机抽取100道题,在把这些题目转为json格式(这里有一个不理想的地方是答案也一起包含进去了,这个在v2.0中改进)向前端提供.然后从前端接受json格式的分数等用户信息.

2. 需求弄清楚就好办了,在时间紧迫和项目比较小的情况下用PHP做后端是比较理想的.结果向前端提供题目数据的`handle.php`减掉注释只用了<font color="red">26-9</font>行,从前端接收信息的`report.php`只用了<font color=red>20-4</font>行.让我不禁感叹PHP是web开发对新人最友好的后端语言!!![5ba8724b10653](https://i.loli.net/2018/09/24/5ba8724b10653.jpg)

### step3:前端页面设计(主要用jquery)

前端css用的很少主要是展示一个原型,在v2.0后会用现成的工具继续美化,主要是用js生成的页面

![5ba873882c817](https://i.loli.net/2018/09/24/5ba873882c817.png)

做完之后评分和给出答案(后续在v2.0会添加一些feature):![5ba873edaca3d](https://i.loli.net/2018/09/24/5ba873edaca3d.png)

### end

这不是一篇科普向的博文,主要是说明一个idea.然后在v2.0中需要添加的功能:

- **todo list**

	- 单独列为一个项目用`http://www.exam.madeai.cn`

	- 添加rank排行榜

	- 添加评论系统

	- css美化页面

	- 更友好的交互体验

然后是传送门:[信息技术大赛出题机](http://www.madeai.cn/exam)
