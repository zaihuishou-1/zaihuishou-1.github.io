## 原型、原型链的理解

在 JavaScript 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，它的属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说不应该能够获取到这个值的，但是现在浏览器中都实现了 proto 属性来访问这个属性，但是最好不要使用这个属性，因为它不是规范中规定的。

ES5 中新增了一个 Object.getPrototypeOf() 方法，可以通过这个方法来获取对象的原型。

当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是新建的对象为什么能够使用 toString() 等方法的原因。

特点： JavaScript 对象是通过引用来传递的，创建的每个新对象实体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对象也会继承这一改变。

## 原型修改、重写

```js
function Person(name) {
  this.name = name;
}
// 修改原型
Person.prototype.getName = function () {};
var p = new Person("hello");
console.log(p.__proto__ === Person.prototype); // true
console.log(p.__proto__ === p.constructor.prototype); // true
// 重写原型
Person.prototype = {
  getName: function () {},
};
var p = new Person("hello");
console.log(p.__proto__ === Person.prototype); // true
console.log(p.__proto__ === p.constructor.prototype); // false
```

可以看到修改原型的时候`p`的构造函数不是指向`Person`了，因为直接给`Person`的原型对象直接用对象赋值时，它的构造函数指向的了根构造函数`Object`，所以这时候`p.constructor === Object` ，而不是`p.constructor === Person`。要想成立，就要用 constructor 指回来：

## 原型链指向

```js
p.__proto__; // Person.prototype
Person.prototype.__proto__; // Object.prototype
p.__proto__.__proto__; //Object.prototype
p.__proto__.constructor.prototype.__proto__; // Object.prototype
Person.prototype.constructor.prototype.__proto__; // Object.prototype
p1.__proto__.constructor; // Person
Person.prototype.constructor; // Person
```

## 原型链的终点

由于 `Object` 是构造函数，原型链终点是`Object.prototype.__proto__`，而`Object.prototype.__proto__=== null // true`，所以，原型链的终点是 null。原型链上的所有原型都是对象，所有的对象最终都是由 `Object` 构造的，而 `Object.prototype` 的下一级是`Object.prototype.__proto__`。

## 获得对象非原型链上的属性

> hasOwnProperty() 是 JavaScript 中对象的一个方法，用于检查对象自身是否具有指定的属性（不包括原型链上的属性）。

```js
const obj = {
  name: "John",
  age: 30,
};

console.log(obj.hasOwnProperty("name")); // 输出 true
console.log(obj.hasOwnProperty("toString")); // 输出 false，toString 是继承自原型链的属性
```

## 继承

### 原型链继承

构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。

继承的**本质就是复制，即重写原型对象，代之以一个新类型的实例。**

```js
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

var instance = new SubType();
console.log(instance.getSuperValue()); // true
```

> 原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

### 构造函数继承

使用父类的构造函数来增强子类**实例**，等同于复制父类的实例给子类（不使用原型）

```js
function SuperType() {
  this.color = ["red", "green", "blue"];
}
function SubType() {
  //继承自SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color); //"red,green,blue,black"

var instance2 = new SubType();
alert(instance2.color); //"red,green,blue"
```

核心代码是`SuperType.call(this)`，创建子类实例时调用 SuperType 构造函数，于是 SubType 的每个实例都会将 SuperType 中的属性复制一份。

缺点：

- 只能继承父类的实例属性和方法，不能继承原型属性/方法
- 无法实现复用，每个子类都有父类实例函数的副本，影响性能

### 组合继承

组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

缺点：

- 第一次调用 `SuperType()`：给 `SubType.prototype` 写入两个属性 name，color。
- 第二次调用 `SuperType()`：给 `instance1` 写入两个属性 name，color。

实例对象 `instance1` 上的两个属性就屏蔽了其原型对象 `SubType.prototype` 的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

### 原型式继承

利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

object()对传入其中的对象执行了一次`浅复制`，将构造函数 F 的原型直接指向传入的对象。

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```

缺点：

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
- 无法传递参数

另外，ES5 中存在 `Object.create()`的方法，能够代替上面的 object 方法。

### 寄生式继承

核心：在原型式继承的基础上，增强对象，返回构造函数

```js
function createAnother(original) {
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```

函数的主要作用是为构造函数新增属性和方法，以**增强函数**

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

缺点（同原型式继承）：

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
- 无法传递参数

### 寄生组合式继承

结合借用构造函数传递参数和寄生模式实现继承

```js
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType; // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]
```

这个例子的高效率体现在它只调用了一次`SuperType`  构造函数，并且因此避免了在`SubType.prototype`  上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用`instanceof`  和`isPrototypeOf()`

**这是最成熟的方法，也是现在库实现的方法**

### 混入方式继承多个对象

```js
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
  // do something
};
```

`Object.assign`会把 `OtherSuperClass`原型上的函数拷贝到 `MyClass` 原型上，使 `MyClass` 的所有实例都可用 `OtherSuperClass` 的方法。

### ES6 类继承 extends

`extends`关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中`constructor`表示构造函数，一个类中只能有一个构造函数，有多个会报出`SyntaxError`错误,如果没有显式指定构造方法，则会添加默认的 `constructor`方法，使用例子如下。

```js
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter
    get area() {
        return this.calcArea()
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200

-----------------------------------------------------------------
// 继承
class Square extends Rectangle {

  constructor(length) {
    super(length, length);

    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}

const square = new Square(10);
console.log(square.area);
// 输出 100
```

`extends`继承的核心代码如下，其实现和上述的寄生组合式继承方式一样

### 总结

#### 函数声明和类声明的区别

函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个 ReferenceError。

```js
let p = new Rectangle();
// ReferenceError

class Rectangle {}
```

#### ES5 继承和 ES6 继承的区别

- ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.call(this)）.

- ES6 的继承有所不同，实质上是先创建父类的实例对象 this，然后再用子类的构造函数修改 this。因为子类没有自己的 this 对象，所以必须先调用父类的 super()方法，否则新建实例报错。
