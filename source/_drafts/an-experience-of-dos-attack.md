---
uuid: 34813239-4eac-7e21-a1d6-a79b1e76c152
title: 记一次"dos"攻击
reward: false
date: 2018-10-23 14:49:21
tags:
  - jsp
  - ajax
---

### background

    2018'10'22'22:00整,我完成了老师布置的家庭作业(只做到了version2),[链接在此]((http://madeai.cn:8888/chatroom2/).从23:03:37至23:09:46就有人故意刷屏,大概刷了4000多条数据(当时我正在吃晚饭:sob:),这是后台的记录:

![backward-data](https://i.loli.net/2018/10/23/5bcec8c7caf96.png)

<!--more-->

等我吃完饭回宿舍后发现同学给我的消息:![dialog](https://i.loli.net/2018/10/23/5bcecc3407a1f.png)

说是ddos(*Distributed Denial of Service*)其实就是简单的dos(*Denial of Service*),说白了就是在同一时间段向服务器发起大量的http请求(刚刚算了一下**8.73535**次/m),利用web程序本身的设计缺陷来将带宽占满,让别人不能访问web服务;
