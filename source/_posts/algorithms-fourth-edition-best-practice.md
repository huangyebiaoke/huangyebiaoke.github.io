---
uuid: 50221947-2522-be91-2f0f-07469e407352
title: <算法第四版>最佳实践
reward: true
toc: true
date: 2019-06-30 03:12:11
tags:
  - Java
  - algorithm
---

![sort-algorithm](/assets/blogimg/sort-algorithm-banner.png)
### bucket sort

**桶排序**的基本思路是遍历一个待排的数组,把每个数出现的次数记录到一个新的数组里面,那这个新的数组里的下标就是待排序的数组的值.

设待排数组是arr,记录待排数组的桶是bucket让我们来理一下思路:

1. 新建一个数组,数组的大小是arr.length-1;
2. 循环遍历arr这个数组,在循环体里面将arr数出现的次数记录到bucket这个数组里面;
3. 遍历bucket这个数组,判断值是多少就输出多少次bucket的下标;

以下是Java代码:

```java
public static void bucketSort(int [] arr){
        int[] bucket=new int[max(arr)+1];
        for (int i = 0; i < arr.length; i++) {
            bucket[arr[i]]++;
        }
        int count=0;
        for (int i=0;i<bucket.length;i++){
            for (int j = 1; j <= bucket[i]; j++) {
                arr[count++]=i;
            }
        }
    }
```

以上只是一个简单的桶排序,*不能排序负数和小数*,但它的时间复杂度也仅仅是`T(N)=O(N+M)`;

### buble sort

**冒泡排序**的的思路就是遍历数组,交换(*swap*)相邻两个元素,使余下未排序数组部分最大(或最小)的元素浮到最前或最后;
这样排序一个长度为N的数组所需要的时间复杂度`T(N)=O(N<sup>2</sup>)`

以下是java代码:

```java
    public static void bubbleSort(int [] arr){
        for (int i = arr.length; i > 0; i--) {
            for (int j = 0; j < i-1; j++) {
                if (arr[j]>arr[j+1]){
                    swap(arr,j,j+1);
                }
            }
        }
    }
```

冒泡排序的缺点很明显,在全部无序的情况下,时间复杂度太高了(因为它只能交换相邻两个元素);
而且上述的示例有一个需要改进的地方就是:设想一个数组前半部分是有序的,但是如果有序的话检查一次就够了(前面在排序后半部分的元素中已经检查过了),所以我们可以设一个布尔型的flag值,有序就直接跳过,这样能大大缩短代码运行时间;

### selection sort

**选择排序**和冒泡排序有点类似,它的基本思路就是把数组看成两部分:一部分有序,一部分无序;
把后面无序的部分的最小值放到前半部分的最后面(*冒泡排序是交换相邻的元素*)

以下是java代码:

```java
    public static void selectionSort(int[] arr){
        for (int i = 0; i < arr.length; i++) {
            for (int j = i+1; j < arr.length; j++) {
                if (arr[j]<arr[i]){
                    swap(arr,j,i);
                }
            }
        }
    }
```

选择排序的时间复杂度也是`O(N<sup>2</sup>)`

### insertion sort

**插入排序**的基本思路是选择后面没排序的部分的第一个元素,插入到前半部分有序的合适位置(和选择排序正好相反);

*让我们来理一下思路吧:*

1. arr[0]是有序的;
2. 遍历余下的将arr[1]放到前面有序部分的合适位置(arr[0]前面或后面);
3. 每次把余下部分的第一个放到前面有序的合适位置(重复1,2步骤);
4. 直到余下的部分没有元素.

以下是java代码:

```java
    /**
     * thought the arr as two part, the front part is ordered and the end part is unordered;
     * in the loop each time put the fist element of the end part to the appropriate position in the front part;
     * until the outer loop is over;
     * @param arr the array wait to sort;
     */
    public static void insertionSort(int[] arr){
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[i]<arr[j]){
                    int tmp=arr[i];
                    for (int k = i; k > j; k--) {
                        arr[k]=arr[k-1];
                    }
                    arr[j]=tmp;
                    break;
                }
            }
        }
    }
```

由于有两层循环,所以它的时间复杂度也是`O(N<sup>2</sup>)`,不过和选择排序不同的是它是*稳定的排序*;

### quick sort

**快速排序**采用分治法(*divide-and-conquer method*),利用递归(*recursion*)对数组作拆分处理;
分治法的基本思路就是:大事化小,小事化无;

让我们来理一下思路吧:

1. 随便找一个元素看作基准点(为了方便起见我们不妨把arr[0]看作基准点);
2. 基准点左边的数比基准点小,右边的数比它大;
3. 循环调用,直到每部分只有两数,左边小,右边大;

java代码如下:

```java
    /**
     * <quote>Quicksort is a divide-and-conquer method for sorting.</quote>
     * divide the arr to two parts, set the leftest element as the standard position;
     * find the smaller element than standard position from the right;
     * find the larger element than standard position from the left;
     * @param arr the arr wait to sort
     * @param left left guard
     * @param right right guard
     */
    public static void quickSort(int[] arr,int left,int right){
        if (left>right) return;
        int i=left,j=right,pos=arr[left];
        while(i!=j){
            while(i<j&&arr[j]>=pos){
                j--;
            }
            while(i<j&&arr[i]<=pos){
                i++;
            }
            if (i<j){
                swap(arr,i,j);
            }
        }
        arr[left]=arr[i];
        arr[i]=pos;
        quickSort(arr,left,i-1);
        quickSort(arr,i+1,right);
    }
```

由于快排是跳跃交换元素位置的(和冒泡排序不同),所以它的平均时间复杂度是`O(NlogN)`;
没接触到递归的同学可能觉得快排有点抽象,可以参照<啊哈,算法>或<算法第四版>(实际上我也在用这两本教材),你也可以看看发明者关于快排的论文;

### summary

以下是每种算法的平均时间复杂度:

| name           | T(N)             |
| -------------- | ---------------- |
| bucket sort    | O(N+M)           |
| buble sort     | O(N<sup>2</sup>) |
| selection sort | O(N<sup>2</sup>) |
| insertion sort | O(N<sup>2</sup>) |
| quick sort     | O(NlogN)         |

还有其他的希尔排序,堆排序,计数排序,基数排序啊有待同学们去一一探索,这里就不再一一赘述了.
