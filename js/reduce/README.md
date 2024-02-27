# reduce

## reduce 介绍

> reduce() 是 JavaScript 数组的一个高阶函数，它可以对数组中的每个元素进行累积操作，并返回一个最终的结果。
> reduce() 方法接受两个参数，以及一个可选的初始值参数：

1. 累积函数（accumulator function）：

累积函数是一个回调函数，用于对数组中的每个元素进行累积操作。
累积函数接受四个参数：

- `accumulator`：累积器，用于存储累积的结果。
- `currentValue`：当前元素的值。
- `currentIndex`：当前元素的索引（可选）。
- `array`：原始数组（可选）。
- 累积函数必须返回一个值，该值将作为下一次迭代的累积器的值。

2. 初始值（可选）：

- 初始值是可选的，用于作为第一次调用累积函数时的累积器的初始值。
- 如果没有提供初始值，则将使用数组的第一个元素作为初始值，并从数组的第二个元素开始迭代。
  下面是 `reduce() `方法的基本语法：

```js
array.reduce((accumulator, currentValue, currentIndex, array) => {
  // 累积操作
}, initialValue);
```

> 需要注意的是，reduce() 方法不会修改原始数组，而是返回一个最终的累积结果。

## reduce 常用场景

**reduce() 的使用场景包括但不限于以下几种：**

1. 求和或累加：可以使用 reduce() 对数组中的元素进行求和或累加操作。

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // 输出 15
```

2. 求乘积或累乘：可以使用 reduce() 对数组中的元素进行求乘积或累乘操作。

```js
const numbers = [1, 2, 3, 4, 5];
const product = numbers.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);
console.log(product); // 输出 120
```

3. 数组转换：可以使用 reduce() 将数组转换为其他形式的数据结构，如对象、字符串等。

```js
const fruits = ["apple", "banana", "orange"];
const fruitObject = fruits.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = currentValue.length;
  return accumulator;
}, {});
console.log(fruitObject); // 输出 { apple: 5, banana: 6, orange: 6 }
```

4. 过滤和映射：可以使用 reduce() 结合条件判断和映射操作，对数组进行过滤和转换。

```js
const numbers = [1, 2, 3, 4, 5];
const evenSquares = numbers.reduce((accumulator, currentValue) => {
  if (currentValue % 2 === 0) {
    accumulator.push(currentValue * currentValue);
  }
  return accumulator;
}, []);
console.log(evenSquares); // 输出 [4, 16]
```

5. 数据统计：可以使用 reduce() 对数组中的元素进行统计，如计算平均值、最大值、最小值等。

```js
const numbers = [1, 2, 3, 4, 5];
const statistics = numbers.reduce(
  (accumulator, currentValue) => {
    accumulator.sum += currentValue;
    accumulator.count++;
    accumulator.average = accumulator.sum / accumulator.count;
    accumulator.max = Math.max(accumulator.max, currentValue);
    accumulator.min = Math.min(accumulator.min, currentValue);
    return accumulator;
  },
  { sum: 0, count: 0, average: 0, max: -Infinity, min: Infinity }
);
console.log(statistics); // 输出 { sum: 15, count: 5, average: 3, max: 5, min: 1 }
```

## reduceRight

`reduceRight()` 方法是 Array 对象的一个方法，与 `reduce()` 方法类似，但是它从数组的末尾开始迭代元素，而不是从数组的开头。

`reduceRight()` 方法的语法和参数与 `reduce()` 方法相同，只是迭代的方向不同。

以下是 `reduceRight()` 方法的基本语法：

```js
array.reduceRight((accumulator, currentValue, currentIndex, array) => {
  // 累积操作
}, initialValue);
```

与 `reduce()` 方法类似，`reduceRight()` 方法也接受一个累积函数和一个可选的初始值参数。累积函数的参数和返回值也与 reduce() 方法相同。

下面是一个示例，演示了 `reduceRight()` 方法的使用：

```js
const numbers = [1, 2, 3, 4, 5];
const concatenatedString = numbers.reduceRight(
  (accumulator, currentValue) => accumulator + currentValue.toString(),
  ""
);
console.log(concatenatedString); // 输出 "54321"
```

> 需要注意的是，reduceRight() 方法也不会修改原始数组，而是返回一个最终的累积结果。
