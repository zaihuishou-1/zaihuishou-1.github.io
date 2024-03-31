# 冒泡排序

## 冒泡排序

> 冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。重复进行直到没有再需要交换的元素，这意味着数列已经排序完成。

```js
function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 1, 3, 2, 0]));
```

## 快速排序

> 快速排序是一种高效的排序算法，它使用分治策略来对一个数组进行排序。以下是快速排序的基本步骤

- 选择一个基准元素，通常是数组的第一个或最后一个元素。

- 找出比基准小的数组集合，再找出比基准大的数组集合

- 分别在小的集合和大的集合内再取一个基准

- 重复上面步骤，连接数组

- 直到所有子数组只剩下一个元素为止。

```js
/**
 * 计算两个数的和
 * @param {number[]} arr
 * @return {number[]}
 */
function quickSort(arr) {
  console.log(arr);
  if (arr.length <= 1) {
    return arr;
  }
  // 取基准值
  let goal = arr[0];
  let minArr = arr.slice(1).filter((item) => item <= goal);
  let maxArr = arr.slice(1).filter((item) => item > goal);
  return quickSort(minArr).concat(goal).concat(quickSort(maxArr));
}
// 使用示例
let numbers = [3, 6, 8, 10, 1, 2, 1, 4, 5, 9];
console.log(quickSort(numbers)); // 输出: [1, 1, 2, 3, 4, 5, 6, 8, 9, 10]
```

**快速排序是一个不稳定的排序算法，因为它可能改变值相同的元素的相对位置。**
