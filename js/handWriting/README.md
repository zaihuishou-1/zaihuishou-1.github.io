# 实现数组 map

```js
Array.prototype.myMap = function (cb) {
  let res = [];
  for (let index = 0; index < this.length; index++) {
    res.push(cb(this[index], index, this));
  }
  return res;
};
```

# 实现数组 filter

```js
Array.prototype.myFilter = function (cb) {
  let res = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      res.push(this[index]);
    }
  }
  return res;
};
```

# 实现 call apply bind

> call

```js
Function.prototype.myCall = function (o, ...arguments) {
  o.fn = this;
  o.fn(...arguments);
  delete fn();
};
```

> apply

```js
Function.prototype.myCall = function (o, ...arguments) {
  o.fn = this;
  eval("o.fn(" + Array.from(...arguments).join() + ")");
  delete fn();
};
```

> bind

```js
Function.prototype.myBind = function (o) {
  o.fn = this;
  return function (...arguments) {
    o.fn(...arguments);
    delete o.fn;
  };
};
```

# 实现 new 操作符

```js
function myNew(fn, ...args) {
  let o = {};
  o.__proto__ = fn.prototype;
  const result = fn.call(o);
  return result instanceof Object ? result : o;
}
```

# 关于= 优先级问题

```js
var a = { n: 1 }; //创建对象{n:1}，赋值给a
var b = a; //b引用a的对象，实际上此时内存只有一个对象。变量a，b同时指向这个对象
a.x = a = { n: 2 }; //此时将这个对象的键值x赋值，赋值内容是运算表达式a={n:2}的运算结果{n:2}
//a={n:2}这个运算表达式又创建了一个对象{n:2}，同时让a指向这个对象
//此时内存中有两个对象 a指向于新的对象{n:2}，b指向于原对象{n:1,x:{n:2}}
console.log(a.x); // -->undefined
console.log(b.x); // -->{n:2}
```

# 实现递归深拷贝

```js
function deepClone(obj) {
  const objCopy = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        objCopy[key] = deepClone(obj[key]);
      } else {
        objCopy[key] = obj[key];
      }
    }
    return objCopy;
  } else {
    return obj;
  }
}
```
