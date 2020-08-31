---
uuid: 6d1c8800-4454-24b2-40f1-4c92e07a3c62
title: 关于mysql
date: 2018-03-26 16:52:37
tags: MySQL
---
![login mysql](/assets/blogimg/p10-1.png "login mysql")
### 如何开启mysql的远程连接
1.直接修改user表
``` plsql
    use mysql;//选择mysql库
    update user set host='%' where user='root';//把user表内的root用户的host设置为任意ip
    flush privileges;//刷新数据库
```
2.root用户远程连接数据库
``` plsql
	grant all privileges on *.* to 'user'@'%' identified by 'password' with grant option;
	flush privileges;
```
上面第一行代码的意思是允许user这个用户在任意ip使用password这个密码登陆mysql，如果没有user这个用户就会创建一个；

让我们来查一下可以远程登陆的用户吧:
![select](/assets/blogimg/p10-2.png "select")
这样就可以在本地使用`mysql -h *** -u root -p`连接远程数据库啦，也可以使用图形化工具如**Navicat for MySQL**管理你的数据库了；
如果你的mysql还不可以远程连接的话，你可能需要进入`/etc/mysql/my.conf`把`bind-address = 127.0.0.1`改为`bind-address = 0.0.0.0`或者直接用#注释掉。

### 关于一些sql语法；

| operation  |  usage |
| :------------ | :------------ |
|  创建数据库 |  CREATE DATABASE STUDENTS |
|  删除数据库 |  DROP DATABASE STUDENTS |
|  创建数据表 |  CREATE TABLE table_name (column_name column_type); |
|  删除数据表 | DROP TABLE table_name  |
|增(insert)|INSERT INTO table_name ( field1, field2,...fieldN )VALUES( value1, value2,...valueN );|
|删(delete)|DELETE FROM stu_info WHERE stu_no = '035';|
|查(select)|select * from stu_info;|
|改(update)|UPDATE stu_info SET field1=value1 WHERE...|


其中关于创建数据表：
``` plsql
CREATE TABLE IF NOT EXISTS `stuInfo`(
   `stuId` INT UNSIGNED AUTO_INCREMENT,//自增；
   `stuNo`  CHAR(6)  NOT  NULL,
   `stuName` VARCHAR(40) NOT NULL,
   `stuAge` INTEGER,
   `stuAddress` VARCHAR(100) NOT NULL,
   `subDate` DATE,//上传时间NOW();
   PRIMARY KEY ( `stuId` )//主键;
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
其中关于往数据表中增加一条数据：
``` plsql
INSERT INTO stu_info(stu_no,stu_name,stu_age,submission_date) VALUES('032','Ford',22,SYSDATE);
```
往数据表中增加多条数据：
``` plsql
INSERT INTO table_name  (field1, field2,...fieldN)
VALUES
(valueA1,valueA2,...valueAN),
(valueB1,valueB2,...valueBN),
(valueC1,valueC2,...valueCN)
......;
```
改数据表中的数据：
``` plsql
UPDATE stu_info SET stu_age = 26, submission_date = '2012-09-18'WHERE stu_no= '035';
```
![select](/assets/blogimg/p10-3.png "select")

more...click [runoob.com](http://www.runoob.com/mysql/mysql-tutorial.html)
demo...click [here](http://www.madeai.cn:8888/test)
