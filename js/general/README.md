## new 操作符的实现原理

**new 操作符的执行过程：**

1. 首先创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象。
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
   具体实现：

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null; // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  } // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype); // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments); // 判断返回对象
  let flag =
    result && (typeof result === "object" || typeof result === "function"); // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

# for in 和 for of

`for…of` 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的`for…in`的区别如下

- `for…of` 遍历获取的是对象的键值，`for…in` 获取的是对象的键名；
- `for… in` 会遍历对象的整个原型链，性能非常差不推荐使用，而 `for … of` 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，`for…in` 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，`for…of` 只返回数组的下标对应的属性值；

总结：

> `for...in` 循环主要是为了遍历对象而生，不适用于遍历数组；

> `for...of` 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。
