---
uuid: 12cdc198-71b1-495a-00f4-29f0189a6517
title: 官网信息更新获得通知
reward: false
toc: false
date: 2020-03-10 12:19:53
tags:
 - Java
---
### background
国家线还没出, 众多2020考研学子们一定异常焦急地等待官网的通告, 想着复试名单什么时候出, 但又不能时时刻刻盯着官网的通知栏; 别担心, 让代码来帮助你...
我们需要代码帮我们完成这样几件事:

1. 每隔10min检查一下官网的通知栏
2. 抓取第一条通知
3. 将抓取到的通知与上一条抓取的通知比对
    - 如果不相同则将这次的通知发送到用户的手机上, 将上一条通告覆盖并重复以上步骤
    - 如果相同则不进行操作, 重复以上三个步骤

### jsoup
>jsoup is a Java library for working with real-world HTML. It provides a very convenient API for fetching URLs and extracting and manipulating data, using the best of HTML5 DOM methods and CSS selectors.


jsoup是一个HTML解析器, 他能像CSS选择器一样选取DOM节点, 做到类似于XPath的效果;

使用jsoup获得网页内容就一句话`Document doc = Jsoup.connect(TARGET_URL).get();`
![example](/assets/blogimg/example_2020-03-10.jpg)
如何选到`<a>`标签中的Text呢?
1. 先获取到它们的父级标签`<td class="tablexu">`
``` java
Element element = doc.select("td.tablexu").first();
```
3. 在`<a>`标签所组成的集合里面选取第一个标签并获取标签内的文字, 也就是最新的通告
 ``` java
String newMsg=element.select("a").first().text();
```
### Timer
**Timer**是javaAPI中的一个定时器, 它能每隔一段时间开启一个子线程处理任务(C#中也有类似的API);

java代码如下:
``` java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class Main {
    public final static String TARGET_URL="http://jky.yangtzeu.edu.cn/tzgg.htm";
    public final static String TARGET_URL2="http://yjsc.yangtzeu.edu.cn/zsgz/tzgg.htm";
    public final static String MSG_URL;

    private static String oldMsg="";
    public static void main(String[] args) {
        Timer timer=new Timer();
        timer.schedule(new FooTimerTask(),1000,1000*60*10);
    }
    static class FooTimerTask extends TimerTask {
        @Override
        public void run() {
            try {
                Document doc = Jsoup.connect(TARGET_URL2).get();
                Element element = doc.select("td.tablexu").first();
                String newMsg=element.select("a").first().text();
                if (!newMsg.equals(oldMsg)){
                    System.out.println(newMsg);
                    System.out.println(sendGet(MSG_URL+"?text="+newMsg.replace(" ","")+"&desp=[点击这里](http://yjsc.yangtzeu.edu.cn/"+element.select("a").attr("href").replace("..","")+")"));
                    oldMsg=newMsg;
                }
            }catch(Exception e) {
                System.err.println(sendGet(MSG_URL+"?text=get website message failed!!!&desep="+e.getMessage()));
            }
        }
    }

    public static String sendGet(String urlName){
        String result = "";
        try{
            URL realUrl = new URL(urlName);
            URLConnection conn = realUrl.openConnection();
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.connect();
            Map<String, List<String>> map = conn.getHeaderFields();
            for (String key : map.keySet()) {
                System.out.println(key + "-->" + map.get(key));
            }
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("get request failed!!" + e);
            e.printStackTrace();
        }
        return result;
    }
}

```

### 题外话
 - 怎么把通知发送到手机上?
    - 可以借助于微信或者QQ的API(我用的是Server酱)
    - 可以用做一个AndroidAPP用Socket和部署在服务器上的脚本建立连接;
 - 怎么部署
    - 将项目打包成可执行的jar包扔到装有JDK的服务器上运行
    - 服务器甚至不需要开放相应的端口(省去了很多麻烦)