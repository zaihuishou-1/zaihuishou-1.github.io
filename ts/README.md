## 泛型（generic）

泛型是一种在定义函数、类或接口时使用类型参数的方式，以增加代码的灵活性和重用性。在 TypeScript 中，可以使用来创建泛型。

> 1. 函数中使用泛型：

```ts
function identity<T>(arg: T): T {
  return arg;
}

let result = identity<string>("Hello");
console.log(result); // 输出: "Hello"

let anotherResult = identity<number>(42);
console.log(anotherResult); // 输出: 42
```

> 2. 类中使用泛型：

```ts
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

let box1 = new Box<string>("Hello");
console.log(box1.getValue()); // 输出: "Hello"

let box2 = new Box<number>(42);
console.log(box2.getValue()); // 输出: 42
```

> 3. 接口中使用泛型：

```ts
interface Pair<T, U> {
  first: T;
  second: U;
}

let pair: Pair<string, number> = {
  first: "Hello",
  second: 42,
};
console.log(pair.first); // 输出: "Hello"
console.log(pair.second); // 输出: 42
```

## 类型断言（Type Assertion）

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 枚举（enum）

枚举：

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let selectedColor: Color = Color.Red;
```

常量枚举：

```ts
const enum Color {
  Red,
  Green,
  Blue,
}

let selectedColor: Color = Color.Red;
```

枚举和常量枚举的区别:

- `枚举`可以包含计算得出的值，而常量枚举则在编译阶段被删除，并且不能包含计算得出的值，它只能包含常量成员。
- `常量枚举`在编译后会被删除，而普通枚举会生成真实的对象。

## 联合类型和交叉类型

`联合类型`表示一个值可以是多种类型中的一种，而`交叉类型`表示一个新类型，它包含了多个类型的特性。

- 联合类型示例：

```ts
// typescript
let myVar: string | number;
myVar = "Hello"; // 合法
myVar = 123; // 合法
```

- 交叉类型示例：

```js
interface A {
  a(): void;
}
interface B {
  b(): void;
}
type C = A & B; // 表示同时具备 A 和 B 的特性
```

## TypeScript 的声明文件（Declaration Files）

声明文件（通常以 `.d.ts` 扩展名结尾）用于描述已有 JavaScript 代码库的类型信息。它们提供了类型定义和元数据，以便在 TypeScript 项目中使用这些库时获得智能感知和类型安全。

## 命名空间（Namespace）、模块（Module）

### 命名空间

**例 1：**

```ts
namespace MyNamespace {
  export const PI = 3.14;

  export function calculateArea(radius: number): number {
    return PI * radius * radius;
  }

  export class Circle {
    constructor(public radius: number) {}

    getArea(): number {
      return calculateArea(this.radius);
    }
  }
}

console.log(MyNamespace.calculateArea(5)); // 输出: 78.5

const circle = new MyNamespace.Circle(5);
console.log(circle.getArea()); // 输出: 78.5
```

提供了一种在全局范围内组织代码的方式，防止命名冲突。

**例 2：**

```js
// greeter.ts
namespace Greetings {
  export function sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}
// app.ts
<reference path="greeter.ts" />
console.log(Greetings.sayHello('John'));
```

### 模块

```ts
// circle.ts
export const PI = 3.14;

export function calculateArea(radius: number): number {
  return PI * radius * radius;
}

export class Circle {
  constructor(public radius: number) {}

  getArea(): number {
    return calculateArea(this.radius);
  }
}
```

```ts
// main.ts
import { calculateArea, Circle } from "./circle";

console.log(calculateArea(5)); // 输出: 78.5

const circle = new Circle(5);
console.log(circle.getArea()); // 输出: 78.5
```

提供了一种组织代码的方式，使得我们可以轻松地在多个文件中共享代码，

### 总结

总结来说，命名空间（Namespace）和模块（Module）是 TypeScript 中用于组织和管理代码的两种不同的概念。命名空间用于将相关的代码封装在一个独立的命名空间中，而模块用于将相关的代码封装在一个独立的文件中。根据具体的需求，你可以选择使用命名空间或模块来组织和管理你的代码。

在现代的 TypeScript 中，推荐使用模块来实现代码的模块化和复用。

## 索引类型（Index Types）

### 字符串索引类型

```ts
interface Person {
  name: string;
  age: number;
  [key: string]: string | number;
}

const person: Person = {
  name: "Alice",
  age: 30,
  city: "New York",
  country: "USA",
};

console.log(person.name); // 输出: "Alice"
console.log(person.age); // 输出: 30
console.log(person.city); // 输出: "New York"
console.log(person.country); // 输出: "USA"
```

### 数字索引类型

```ts
interface NumberArray {
  [index: number]: number;
}

const numbers: NumberArray = [1, 2, 3, 4, 5];

console.log(numbers[0]); // 输出: 1
console.log(numbers[1]); // 输出: 2
console.log(numbers[2]); // 输出: 3
```

### 符号索引类型

```ts
const sym = Symbol();

interface SymbolObject {
  [sym]: string;
}

const obj: SymbolObject = {
  [sym]: "Hello",
};

console.log(obj[sym]); // 输出: "Hello"
```

## const 和 readonly 的区别

当在 TypeScript 中使用`const`和`readonly`时，它们的行为有一些显著的区别：

- const：

  - `const` 用于声明常量值。一旦被赋值后，其值将不能被重新赋值或修改。
  - 常量必须在声明时就被赋值，并且该值不可改变。
  - 常量通常用于存储不会发生变化的值，例如数学常数或固定的配置值。

```ts
const PI = 3.14;
PI = 3.14159; // Error: 无法重新分配常量
```

- readonly：

  - `readonly`关键字用于标记类的属性，表明该属性只能在类的构造函数或声明时被赋值，并且不能再次被修改。
  - `readonly`属性可以在声明时或构造函数中被赋值，但之后不能再被修改。
  - `readonly`属性通常用于表示对象的某些属性是只读的，防止外部代码修改这些属性的值。

```ts
class Person {
  readonly name: string;

  constructor(name: string) {
    this.name = name; // 可以在构造函数中赋值
  }
}

let person = new Person("Alice");
person.name = "Bob"; // Error: 无法分配到"name"，因为它是只读属性
```

总结来说，`const`主要用于声明常量值，而`readonly`则用于标记类的属性使其只读。

## interface 声明 Function/Array/Class

在 TypeScript 中，interface 可以用来声明函数、数组和类（具有索引签名的类）。下面是一些示例代码：

### Interface 声明函数

```ts
interface MyFunc {
  (x: number, y: number): number;
}

let myAdd: MyFunc = function (x, y) {
  return x + y;
};
```

在上述示例中，`MyFunc`接口描述了一个函数类型，该函数接受两个参数并返回一个数字。

### Interface 声明数组

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Alice"];
```

上面的示例中，`StringArray`接口描述了一个具有数字索引签名的字符串数组。意味着我们可以通过数字索引来访问数组元素。

### Interface 声明类（Indexable）

```ts
interface StringDictionary {
  [index: string]: string;
}

let myDict: StringDictionary = {
  name: "John",
  age: "30",
};
```

综上：TypeScript 中的 interface 可以被用来声明函数、数组和具有索引签名的类，从而帮助我们定义和限定这些数据结构的形式和行为。
