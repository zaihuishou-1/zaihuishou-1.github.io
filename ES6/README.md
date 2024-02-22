# ES6

## Symbol 类型和 Symbol 属性

- Symbol 是一种新的原始数据类型，用于创建唯一的标识符
- Symbol 属性是对象中使用 Symbol 作为键创建的属性

```js
const sym = Symbol("description");
const obj = {
  [sym]: "value",
};
console.log(obj[sym]); // value
console.log(obj); // { a: 1, b: 2, c: 3 }
```

## Promise.allSettled()

- Promise.allSettled()方法返回一个在所有给定的 promise 已被解析或被拒绝后决议的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

```js
const promises = [
  Promise.resolve("resolved"),
  Promise.reject("rejected"),
  Promise.resolve("resolved"),
];

Promise.allSettled(promises)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

// 输出结果:
// [
// { status: 'fulfilled', value: 'resolved' },
// { status: 'rejected', reason: 'rejected' },
// { status: 'fulfilled', value: 'resolved' }
// ]
```

## Object.entries()

当使用 Object.entries()时，可以传入一个对象作为参数。例如：

```js
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj);
console.log(entries); // [["a", 1], ["b", 2], ["c", 3]]
```

## Object.fromEntries()

当使用 Object.fromEntries()时，可以传入一个键值对数组作为参数。例如：

```js
const entries = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];
const obj = Object.fromEntries(entries);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

## BigInt

- BigInt 是一种新的原始数据类型，用于表示任意精度的整数。
- JavaScript  所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript  是无法精确表示的，这使得  JavaScript  不适合进行科学和金融方面的精确计算。二是大于或等于 2 的 1024 次方的数值，JavaScript  无法表示，会返回  Infinity。

```js
const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
console.log(bigIntValue); // 9007199254740992n

const a = 2172141653n;
const b = 15346349309n;
// BigInt 可以保持精度
a * b; // 33334444555566667777n
// 普通整数无法保持精度
Number(a) * Number(b); // 33334444555566670000
```

## WeakMap 和 WeakSet

- WeakMap 是一种集合类型，其中键必须是对象，并且在没有其他引用时会被垃圾回收。
- WeakSet 是一种集合类型，其中元素必须是对象，并且在没有其他引用时会被垃圾回收。

```js
const wm = new WeakMap();
const obj = {};
wm.set(obj, "value");
console.log(wm.get(obj)); // value

const ws = new WeakSet();
ws.add(obj);
console.log(ws.has(obj)); // true
```

## at 和 flat

- at()方法返回指定索引处的元素。
- at 方法用于获取数组指定索引位置的元素，支持负数索引。
- flat()方法将嵌套的数组扁平化为一个新的数组。
- flat 方法用于将多维数组扁平化为一维数组，可以指定扁平化的层数。

```js
const arr3 = [1, 2, 3, 4, 5];
console.log(arr3.at(2)); // 3

const arr4 = [1, [2, [3]]];
console.log(arr4.flat()); // [1, 2, [3]]
```

## Array.of、Array.from

- Array.of()方法创建一个具有可变数量参数的新数组实例。
- Array.of 方法用于创建一个由参数组成的新数组。它与 Array 构造函数不同之处在于，当参数只有一个且为数字时，Array.of 会创建一个只包含该数字的数组，而不是创建指定长度的空数组。
- Array.from()方法从类似数组或可迭代对象创建一个新的数组实例。
- Array.from 方法将类似数组或可迭代对象转换为真正的数组。它可以接收第二个参数来进行映射或筛选操作。

```js
const arr1 = Array.of(1, 2, 3);
console.log(arr1); // [1, 2, 3]

const str = "Hello";
const arr = Array.from(str);
console.log(arr); // 输出: ['H', 'e', 'l', 'l', 'o']

const nums = [1, 2, 3, 4, 5];
const doubled = Array.from(nums, (num) => num * 2);
console.log(doubled); // 输出: [2, 4, 6, 8, 10]
```

## 实现 promise

> ### 状态

Promise 有三个状态，分别为：

- pending 初始状态
- fulfilled 成功状态
- rejected 失败状态 Promise 的只有在 pending 状态下，才能转更为其他状态，当状态变更后，无法再变更为其他状态。

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(excutor) {
  // 初始状态为 pending
  this.status = PENDING;
}
```

> ### 立即执行的函数

Promise 接收一个立即执行的函数（执行器：excutor），该函数接收两个回调函数，resolve(成功回调)与 reject(失败回调)。

- resolve 成功回调，将状态改为 fulfilled，并赋予成功的值
- reject 失败回调，将状态改为 rejected，并赋予失败的原因

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(excutor) {
  // 初始状态为 pending
  this.status = PENDING;
  // 成功的值
  this.value = undefined;
  // 失败的原因
  this.reason = undefined;
  // then 的回调函数集合，后面会用到
  fulfilledCallback = [];
  rejectedCallback = [];

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  };

  const reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  };

  try {
    excutor(resolve, reject);
  } catch (err) {
    throw err;
  }
}
```

> ### then 方法

```js
new Promise((...) => {...}).then(res => {}, err => {})
```

- then 用来处理成功或失败状态下的回调，并根据回调的值返回一个新的 Promises

- 接收两个回调函数
  - onResolve 成功处理函数
  - onReject 失败处理函数
- 返回一个新的 Promise
- 当状态为 fulfilled 时，执行 onResolve，并返回一个新的 Promise，新 Promise 的结果由 onResolve 决定
- 当状态为 rejected 时，执行 onReject，并返回一个新的 Promise，新 Promise 的结果由 onReject 决定
- 当状态为 pending 时，将 onResolve 与 onReject 两个函数保存起来，等待状态变更后再执行对应的函数。
  - 由于状态为 pending 时，需要保存两个回调函数，所以需要新建两个数组来保存。

```js
MyPromise.prototype.then = function (onResolve, onReject) {
  return new MyPromise((resolve, reject) => {
    // 将公用重复部分提取成一个方法
    function handleFunc(func, value) {
      try {
        const result = func(value);
        // 如果返回一个 Promise
        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    }

    if (this.status === FULFILLED) {
      setTimeout(() => {
        handle(onResolve, this.value);
      });
    }

    if (this.status === REJECTED) {
      setTimeout(() => {
        handle(onReject, this.reason);
      });
    }

    // 状态为 pending，将回调函数保存到前面定义的函数集合中
    if (this.status === PENDING) {
      // 保存到 fulfilledCallback
      this.fulfilledCallback.push((value) => {
        handle(onResolve, value);
      });
      // 保存到 rejectedCallback
      this.rejectedCallback.push((reason) => {
        handle(onReject, reason);
      });
    }
  });
};
```

当状态由 pending 状态变更到其他状态后，then 的回调函数还不会被执行，需要修改执行器 excutor 的两个回调函数，resolve、reject

```js
function MyPromise(excutor) {
  // 省略一部分代码
  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      setTimeout(() => {
        // 状态变更后执行 then 的回调函数
        this.fulfilledCallback.forEach((fn) => fn(value));
      });
    }
  };

  const reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      setTimeout(() => {
        this.rejectedCallback.forEach((fn) => fn(reason));
      });
    }
  };

  try {
    excutor(resolve, reject);
  } catch (err) {
    throw err;
  }
}
```

> ### reject 方法

```js
MyPromise.reject(reason);
```

返回一个给定原因的失败的 Promise

```js
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};
```

> ### resolve 方法

```js
MyPromise.resolve(value);
```

返回一个解析过 的 Promise，如果值为另一个 Promise，那么将直接返回这个 Promise。

- 返回一个新的 Promise，注意：该 promise 的状态有可能是成功或失败。

  - 如果是普通值，那么将解析为成功状态并返回该值
  - 如果值是一个 Promise，那么状态将由这个 Promise 决定

```js
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    // 如果 value 是一个 Promise，那么结果将由这个 Promise 决定
    if (value instanceof MyPromise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
};
```

> ### all 方法

```js
MyPromise.all([promise1, promise2]).then(
  ([p1, p2]) => {},
  (reason) => {}
);
```

等待所有 promise 都成功或有一个失败后，返回一个所有 promise 的成功结果的数组或返回一个失败的原因。

- 接收一个数组，数组的元素可以是一个 promise，也可以是一个普通值
- 返回一个新的 promise
- 只要有一个失败，promise.all 就会完全失败。并返回失败状态的 promise
- 成功状态下，存入多少个 Promise 就返回多少个成功的结果，并且结果的位置与传入 Promise 的位置相同

```js
MyPromise.all = function (promises) {
  let results = new Array(promises.length);
  let fulfilledCount = 0;
  return new MyPromise((resolve, reject) => {
    // 如果传入的promise数组为空数组，返回一个带空数组结果的成功的 promise
    if (promises.length === 0) {
      resolve([]);
    }

    // 处理成功的返回
    function fulfilledHandle(value, index) {
      fulfilledCount++;
      results[index] = value;
      if (fulfilledCount === promises.length) {
        resolve(results);
      }
    }
    promises.forEach((promise, index) => {
      // 如果数组中的元素是一个 promise
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            fulfilledHandle(res, index);
          },
          (reason) => {
            reject(reason);
          }
        );

        // 不是 promise，直接添加到成功的结果集
      } else {
        fulfilledHandle(res, index);
      }
    });
  });
};
```
