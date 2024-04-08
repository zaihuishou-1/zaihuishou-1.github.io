## new 操作符的实现原理

**new 操作符的执行过程：**

```js
function newFun(Fun, ...args) {
  // 1.先创建一个空对象
  let newObj = {};
  // 2.把空对象和构造函数通过原型链进行链接
  newObj.__proto__ = Fun.prototype;
  // 3.把构造函数的this绑定到新的空对象身上
  const result = Fun.apply(newObj, args);
  // 4.根据构建函数返回的类型判断，如果是值类型，则返回对象，如果是引用类型，就要返回这个引用类型
  return result instanceof Object ? result : newObj;
}

function Person(name) {
  this.name = name;
}
Person.prototype.say = function () {
  console.log("123456");
};
const p1 = newFun(Person, "张三");
p1.say();
console.log(p1);
```

# for in 和 for of

`for…of` 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的`for…in`的区别如下

- `for…of` 遍历获取的是对象的键值，`for…in` 获取的是对象的键名；
- `for… in` 会遍历对象的整个原型链，性能非常差不推荐使用，而 `for … of` 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，`for…in` 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，`for…of` 只返回数组的下标对应的属性值；

总结：

> `for...in` 循环主要是为了遍历对象而生，不适用于遍历数组；

> `for...of` 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

# 匿名函数

- 1. 匿名函数作为函数表达式：

```js
const add = function (a, b) {
  return a + b;
};

console.log(add(2, 3)); // 输出: 5
```

- 2. 匿名函数作为回调函数：

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (number) {
  console.log(number);
});
```

- 3. 匿名函数作为立即执行函数：

```js
(function () {
  console.log("这是一个立即执行的匿名函数");
})();
```

- 4. 匿名函数作为事件处理函数：

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("按钮被点击了");
});
```

- 5. 匿名函数作为数组的映射函数：

```js
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(function (number) {
  return number * 2;
});

console.log(doubledNumbers); // 输出: [2, 4, 6, 8, 10]
```

# 精灵图和 base64 的区别

- 精灵图：把多张小图整合到一张大图上，利用定位的一些属性把小图显示在页面上，当访问页面可以减少请求，提高加载的速度。

- base64：传输 8Bit 字节代码的编码方式，把原本二进制形式转换为 64 个字符的单位，最后组成字符串。

- base64 是会和 HTML、CSS 一起下载到浏览器中，减少请求，减少跨域问题，但是一些低版本不支持，若 base64 体积比原图片大，不利于 CSS 的加载。

# setTimeout 的最小执行时间

HTML5 规定：

- setTimeout 最小执行时间是 4ms。

- setInterval 最小执行时间是 10ms，小于 10ms 它会自动调整为 10ms。

# mvvm 和 mvc

**1、通信方向：**

- MVVM 中的通信是双向的，这意味着视图（View）和模型（Model）之间的数据绑定是双向的，数据变化可以自动同步。
- 相比之下，MVC 中的通信是单向的，通常需要控制器（Controller）来处理用户输入并更新模型，然后由模型通知视图更新。

**2、数据绑定与视图更新：**

- MVVM 通过双向数据绑定机制实现了视图和视图模型之间的自动更新，减少了手动处理数据更新的代码量，提高了开发效率。
- 在 MVC 中，视图更新通常需要手动进行，这可能导致代码复杂度增加，且难以进行单元测试和自动化测试。

**3、性能优化：**

- MVVM 通过使用虚拟 DOM 来减少过度渲染，提高性能，特别是在数据频繁更新的情况下。
- MVC 可能会因为大量的 DOM 操作而导致页面渲染性能降低，影响用户体验。

**4、适用场景：**

- MVVM 更适合于具有复杂数据绑定和交互逻辑的应用程序，如单页应用（SPA）和现代前端框架（如 Angular, Vue.js）。
- MVC 则更适合于简单和较小规模的应用程序，以及后端开发思想的应用场景。

总结来说，MVVM 和 MVC 各有其优势和适用场景。MVVM 提供了更高效的双向数据绑定和视图更新机制，适合于复杂的前端应用，而 MVC 则因其单向通信和数据处理的简洁性，适用于规模较小或后端开发思想的项目。

# 深拷贝

> 递归方式(推荐使用)

```js
// 函数拷贝
const copyObj = (obj = {}) => {
  let newObj = null;
  // 判断是否需要继续进行递归
  if (typeof obj == "object" && obj !== null) {
    newObj = obj instanceof Array ? [] : {};
    // 进行下一层递归克隆
    for (let i in obj) {
      newObj[i] = copyObj(obj[i]);
    }
  } else {
    newObj = obj;
  }
  return newObj;
};

let obj = {
  numberParams: 1,
  funcParams: () => {
    console.log("I am a function!");
  },
  objParams: {
    prop1: 1,
    prop2: 2,
  },
};

const newObj = copyObj(obj);
obj.numberParams = 100; // 更改原对象的属性
console.log(newObj.numberParams); // 输出1
```

> JSON.stringify()；(深拷贝普通对象时推荐使用)

```js
let obj = {
  name: "张三",
  age: 18,
};

// 先转为json格式字符串，再转回来
let newObj = JSON.parse(JSON.stringify(obj));

obj.age = 20;
console.log(newObj.age); // 输出18
```

> 第三方库 lodash 的 cloneDeep()方法

```js
import lodash from "lodash";
let obj = {
  person: {
    name: "张三",
    age: 18,
    hobbies: ["跑步", "乒乓球", "爬山"],
  },
  p: 1,
};
const newObj = lodash.cloneDeep(obj);
obj.p = 20;
console.log(newObj.p); // 输出1
```

> JQuery 的 extend()方法(推荐在 JQ 中使用)

```js
let obj = {
  person: {
    name: "张三",
    age: 18,
    hobbies: ["跑步", "乒乓球", "爬山"],
  },
  p: 1,
};
const newObj = $.extend(true, {}, obj);
obj.p = 20;
console.log(newObj.p); // 输出1
```
