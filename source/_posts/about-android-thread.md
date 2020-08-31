---
uuid: b2cdf1b8-1a3a-a96e-d83b-5a636c295d36
title: 关于Android线程
reward: true
date: 2019-02-14 06:05:32
toc: true
tags:
  - Java
  - Android
---
![banner](/assets/blogimg/andy-lg.png)
### background
众所周知,android只能在主线程中更新UI视图,而一些诸如网络请求,socket通讯和Json解析之类比较耗时的操作一般放在子线程(用线程池来管理便于回收)中处理,否则会阻塞(zu se)UI线程.那么子线程中处理的结果怎么显示出来呢?有三种方法:
- 使用RunOnUiThread切回主线程;
- 用handler来进行消息传递;
- 继承AsyncTask类,在onPostExecute方法中更新UI.

### RunOnUiThread
可以把RunOnUiThread看成是一个特殊的线程,如果RunOnUiThread运行在主线程,则立即执行里面的代码,否则将Runable对象添加到消息处理队列;
具体事例如下:
``` java
new Thread(new Runnable() {
            @Override
            public void run() {
                //模拟耗时操作;
                try {
                    Thread.sleep( 2000 );
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                //切回UI线程;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //更新UI视图;
                    }
                });
            }
        }).start();
```
### handler
我们用handler携带message来进行子线程和主线程间的通讯,在这里我把handler看成是一个hook或者signal;
handler的初始化:
```java
Handler handler=new Handler(){
    public void handlerMessage(message msg){
        super.handlerMessage(msg);
        switch(msg.what){
            case 0:
                doSomething(msg.getData().getString("key"));
                break;
            case 1:
                doAnotherthing((Cast)msg.obj);
                break;
            default:
        }
    }
};
```
在这里message的用法有两种,一种是使用`message.obj`来传递具体的数据,还有一种是把数据放在<font color="red">bundle</font>里面再用`message.setData`来传递<font color="red">bundle</font>.
#### 利用message.obj来携带数据
``` java
Message msg=Message.obtain();
msg.what=1;
msg.obj=new Cast();
msg.arg1=123;
msg.arg2=1234;
handler.sendMessage(msg);
```
#### 利用bundle来携带数据
``` java
Message msg=new Message();
msg.what=0;
Bundle bundle=new Bundle();
bundle.putString("key","value");
msg.setData(bundle);
handler.sendMessage(msg);
```
### AsyncTask
顾名思(si)义,AsyncTask是异步任务;它的基本用法如下:
``` java
//传入三个泛型参数,分别是: a传入给后台任务的strings, b用于显示进度条, c返回结果;
class Task extends AsyncTask<String,String,String>{
    @Override
    protected void onPreExecute(){
    }
    @Override
    protected void doInBackground(String... strings){

    }
    @Override
    protected void postExecute(String string){

    }
}
```
- `onPreExecute()`中进行UI界面的初始化工作,列如显示进度条或onloading的Gif动画;
<img src="/assets/blogimg/2019-02-14.png" width="30%" alt="onloading">
- `doInBackground()`中处理耗时操作,不能进行UI操作;
- `postExecute()`中后台任务执行完后要进行的事,列如提关闭进度条或显示任务执行结果.
---
关于AsyncTask的更多信息请参考郭霖老师的<<第二行代码>>第十章第二节.
