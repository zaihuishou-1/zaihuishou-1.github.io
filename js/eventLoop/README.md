## async/await

async/await 其实是 Generator 的语法糖，它能实现的效果都能用 then 链来实现，它是为优化 then 链而开发出来的。

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
async1();
console.log("script end");
// 输出顺序：script start -> async1 start -> async2 -> script end -> async1 end
```

```js
async function async1() {
  console.log("async start"); // 2
  await async2();
  console.log("async1 end"); // 6
}

async function async2() {
  console.log("async2"); // 3
}

console.log("script start"); // 1

setTimeout(function () {
  console.log("setTimeout1"); // 8
  new Promise(function (resolve) {
    console.log("promise3"); // 9
    resolve();
  }).then(function () {
    console.log("promise4"); // 10
  });
}, 0);

setTimeout(() => {
  console.log("setTimeout2"); // 11
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1"); // 4
  resolve();
}).then(function () {
  console.log("promise2"); // 7
});

console.log("script end"); // 5
```

---

```js
async function testAsy() {
  return "hello world";
}
let result = testAsy();
console.log(result);
```

所以，async 函数返回的是一个 Promise 对象。async 函数（包含函数语句、函数表达式、Lambda 表达式）会返回一个 Promise 对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。

async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，当然应该用原来的方式：`then()` 链来处理这个 Promise 对象，就像这样：

```js
async function testAsy() {
  return "hello world";
}
let result = testAsy();
console.log(result);
result.then((v) => {
  console.log(v); // hello world
});
```

那如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。
