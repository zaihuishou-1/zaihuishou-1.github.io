## 柯里化

柯里化（Currying）是一种将多个参数的函数转换为一系列只接受单个参数的函数的技术。通过柯里化，我们可以将一个接受多个参数的函数转换为一系列嵌套的函数，每个函数只接受一个参数。

> 以下是几个柯里化的应用举例：

## 参数复用和延迟执行：

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = add(5); // 创建一个接受一个参数的函数
console.log(add5(3)); // 输出: 8
console.log(add5(7)); // 输出: 12
```

在这个例子中，add 函数接受一个参数 `a`，返回一个新的函数，该函数接受参数 b，并返回 `a + b` 的结果。通过柯里化，我们可以先传递一个参数 5 给 `add` 函数，得到一个新的函数 `add5`，然后可以多次调用 `add5` 并传递不同的参数 b，实现参数复用和延迟执行的效果。

## 函数组合：

```js
function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(5)); // 输出: 100
```

## 部分应用：

```js
function greet(greeting, name) {
  return greeting + ", " + name + "!";
}

const sayHello = greet.bind(null, "Hello");
console.log(sayHello("John")); // 输出: Hello, John!
console.log(sayHello("Alice")); // 输出: Hello, Alice!
```
