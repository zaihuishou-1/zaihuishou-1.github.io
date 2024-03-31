# 关于生命周期

Composition API 的生命周期：

除了`beforecate`和`created`(它们被 setup 方法本身所取代)，我们可以在 setup 方法中访问的上面后面 9 个生命钩子选项:

# Vue3.0 有什么更新

- 性能优化：Vue.js 3.0 使用了 Proxy 替代 Object.defineProperty 实现响应式，并且使用了静态提升技术来提高渲染性能。新增了编译时优化，在编译时进行模板静态分析，并生成更高效的渲染函数。

- Composition API：Composition API 是一个全新的组件逻辑复用方式，可以更好地组合和复用组件的逻辑。

- TypeScript 支持：Vue.js 3.0 完全支持 TypeScript，在编写 Vue 应用程序时可以更方便地利用 TS 的类型检查和自动补全功能。

- 新的自定义渲染 API：Vue.js 3.0 的自定义渲染 API 允许开发者在细粒度上控制组件渲染行为，包括自定义渲染器、组件事件和生命周期等。

- 改进的 Vue CLI：Vue.js 3.0 使用了改进的 Vue CLI，可以更加灵活地配置项目，同时支持 Vue.js2.x 项目升级到 Vue.js 3.0。

- 移除一些 API：Vue.js 3.0 移除了一些不常用的 API，如过渡相关 API，部分修饰符等。

- 废弃了过滤器(filter 能实现的功能，methods 和计算属性基本上也可以实现)

# setup

scrtpt setup 是 vue3 的语法糖，简化了组合式 API 的写法，并且运行性能更好。使用 script setup 语法糖的特点：

- 属性和方法无需返回，可以直接使用。

- 引入组件的时候，会自动注册，无需通过 components 手动注册。

- 使用 defineProps 接收父组件传递的值。

- useAttrs 获取属性，useSlots 获取插槽，defineEmits 获取自定义事件。

- 默认不会对外暴露任何属性，如果有需要可使用 defineExpose 。

# Proxy 和 Object.defineProperty 的区别

1、 Proxy 和 Object.defineProperty 都可以用来实现 JavaScript 对象的响应式，但是它们有一些区别：

2、 实现方式：Proxy 是 ES6 新增的一种特性，使用了一种代理机制来实现响应式。而 Object.defineProperty 是在 ES5 中引入的，使用了 getter 和 setter 方法来实现。

3 、作用对象：Proxy 可以代理整个对象，包括对象的所有属性、数组的所有元素以及类似数组对象的所有元素。而 Object.defineProperty 只能代理对象上定义的属性。

4、 监听属性：Proxy 可以监听到新增属性和删除属性的操作，而 Object.defineProperty 只能监听到已经定义的属性的变化。

5、 性能：由于 Proxy 是 ES6 新增特性，其内部实现采用了更加高效的算法，相对于 Object.defineProperty 来说在性能方面有一定的优势。

综上所述，虽然 Object.defineProperty 在 Vue.js 2.x 中用来实现响应式，但是在 Vue.js 3.0 中已经采用了 Proxy 来替代，这是因为 Proxy 相对于 Object.defineProperty 拥有更优异的性能和更强大的能力。

# Vue3 升级了哪些重要功能

- 新的 API：Vue3 使用 createApp 方法来创建应用程序实例，并有新的组件注册和调用方法。

- emits 属性：：Vue 3 的组件可以使用 emits 属性来声明事件。

- 生命周期

- 多个 Fragment

- 移除.sync

- 异步组件的写法

```js
const Foo = defineAsyncComponent(() => import("./Foo.vue"));
```

# vue2 和 vue3 核心 diff 算法区别？

1. Vue 2.x 使用的是双向指针遍历的算法，也就是通过逐层比对新旧虚拟 DOM 树节点的方式来计算出更新需要做的最小操作集合。但这种算法的缺点是，由于遍历是从左到右、从上到下进行的，当发生节点删除或移动时，会导致其它节点位置的计算出现错误，因此会造成大量无效的重新渲染。

2. Vue 3.x 使用了经过优化的单向遍历算法，也就是只扫描新虚拟 DOM 树上的节点，判断是否需要更新，跳过不需要更新的节点，进一步减少了不必要的操作。此外，在虚拟 DOM 创建后，Vue 3 会缓存虚拟 DOM 节点的描述信息，以便于复用，这也会带来性能上的优势。同时，Vue 3 还引入了静态提升技术，在编译时将一些静态的节点及其子节点预先处理成 HTML 字符串，大大提升了渲染性能。
   因此，总体来说，Vue 3 相对于 Vue 2 拥有更高效、更智能的 diff 算法，能够更好地避免不必要的操作，并提高了渲染性能。

# Vue3 为什么比 Vue2 快

1、响应式系统优化：Vue3 引入了新的响应式系统，这个系统的设计让 Vue3 的渲染函数可以在编译时生成更少的代码，这也就意味着在运行时需要更少的代码来处理虚拟 DOM。这个新系统的一个重要改进就是提供了一种基于 Proxy 实现的响应式机制，这种机制为开发人员提供更加高效的 API，也减少了一些运行时代码。

2、编译优化：Vue3 的编译器对代码进行了优化，包括减少了部分注释、空白符和其他非必要字符的编译，同时也对编译后的代码进行了懒加载优化。

3、更快的虚拟 DOM：Vue3 对虚拟 DOM 进行了优化，使用了跟 React 类似的 Fiber 算法，这样可以更加高效地更新 DOM 节点，提高性能。

4、Composition API：Vue3 引入了 Composition API，这种 API 通过提供逻辑组合和重用的方法来提升代码的可读性和重用性。这种 API 不仅可以让 Vue3 应用更好地组织和维护业务逻辑，还可以让开发人员更加轻松地实现优化。

# Vue3 中的 Teleport 组件

Vue 3 中新增了`teleport`（瞬移）组件，可以将组件的 DOM 插到指定的组件层，而不是默认的父组件层，可以用于在应用中创建模态框、悬浮提示框、通知框等组件。
`Teleport` 组件可以传递两个属性：

`to` (必填)：指定组件需要挂载到的 DOM 节点的 ID，如果使用插槽的方式定义了目标容器也可以传入一个选择器字符串。
`disabled` (可选)：一个标志位指示此节点是否应该被瞬移到目标中，一般情况下，这个 props 建议设为一个响应式变量来控制 caption 是否展示。

例子如下：

```html
<template>
  <teleport to="#target">
    <div>这里是瞬移到target容器中的组件</div>
  </teleport>
  <div id="target"></div>
</template>
```

在上述示例中，`<teleport>` 组件往 `#target` 容器中，挂载了一个文本节点，效果等同于：

```html
<template>
  <div id="target">
    <div>这里是瞬移到target容器中的组件</div>
  </div>
</template>
```

需要注意的是，虽然 DOM 插头被传送到另一个地方，但它的父组件仍然是当前组件，这一点必须牢记，否则会导致样式、交互等问题。

Teleport 组件不仅支持具体的 id/选择器，还可以为`to`属性绑定一个 Vue 组件实例，比如：

```html
<template>
  <teleport :to="dialogRef">
    <div>这里是瞬移到Dialog组件里的组件</div>
  </teleport>
  <dialog ref="dialogRef"></dialog>
</template>
```

总之，`Teleport` 组件是 Vue3 中新增的一个非常有用的组件，可以方便地实现一些弹出框、提示框等组件的功能，提高了开发效率。

# reactive、ref 、toRef 和 toRefs

- `ref`：  函数可以接收原始数据类型与引用数据类型。`ref`函数创建的响应式数据，在模板中可以直接被使用，在  JS  中需要通过  `.value`的形式才能使用。
- `reactive`：  函数只能接收引用数据类型。
- `toRef`：针对一个响应式对象的属性创建一个`ref`，使得该属性具有响应式，两者之间保持引用关系。（入下所示，即让 state 中的 age 属性具有响应式）

```js
const state = reactive({
  name:'a'
  age:10
})
const ageRef = toRef(state,'age')
```

- `toRefs`： 将一个响应式对象转为普通对象，对象的每一个属性都是对应的 ref，两者保持引用关系

```js
const state = reactive({
  name:'a'
  age:10
})
const stateRefs = toRefs(state)
```

# shallowReactive 与 shallowRef

1、shallowRef：只处理基本数据类型的响应式

2、shallowReactive：只处理对象最外层属性的响应式（浅响应式）

3、浅层作用的响应式数据处理：只处理第一层对象的数据，再往下嵌套的数据，操作数据是不起作用的

4、shallowReative 与 shallowRef 在某些特殊的应用场景下,是可以提升性能的,前者针对对象,用于浅层作用的响应式数据处理,而后者只处理基本数据类型的响应式,不进行对象的响应式处理。

# readonly 与 shallowReadonly

> readonly 与 shallowReadonly 都是让响应式数据只具备读的能力,后者是浅层次的只读,也就是只对数据对象第一层起作用,深层次的嵌套,当时用 shallowReadonl()处理时,深层次数据支持被修改

1、readonly: 让一个响应式数据变为只读的 (深只读)，让一个响应式数据变为只读的,接收一个响应式数据,经过 readonly 加工处理一下,那么新赋值的数据都不允许修改

2、接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理

3、shallowReadonly: 让一个响应式数据变为只读的 (浅只读)，接收一个响应式数据,经过 shallowreadonly 的处理,变成一个只读的,只考虑对象的第一层数据,不可以修改,但是第一层嵌套里的深层数据却支持修改

4、让一个响应式数据变为只读能力(浅只读)

# 响应式数据的判断 isRef、isReactive、isReadonly、isProxy

1、isRef：判断一个值是否为一个 ref 对象

2、isReactive：判断一个对象是否是由 reactive 创建的响应式代理

3、isReadonly：判断一个对象是否是由 readonly 创建的只读代理

4、isProxy：判断一个对象是否是由 reactive 或 readonly 创建的代理

# pinia

Pinia 是 Vue 官方团队成员专门开发的一个全新状态管理库，并且 Vue 的官方状态管理库已经更改为了 Pinia。

- 更加轻量级，压缩后提交只有 1.6kb。

- 完整的 TS 的支持，Pinia 源码完全由 TS 编码完成。

- 移除 mutations，只剩下 state 、 actions 、 getters 。

- 没有了像 Vuex 那样的模块镶嵌结构，它只有 store 概念，并支持多个 store，且都是互相独立隔离的。当然，你也可以手动从一个模块中导入另一个模块，来实现模块的镶嵌结构。

- 无需手动添加每个 store，它的模块默认情况下创建就自动注册。

- 支持服务端渲染（SSR）。

- 支持 Vue DevTools。

- 更友好的代码分割机制，[传送门](https://juejin.cn/post/7057439040911441957#heading-2)。

> Pinia 配套有个插件 `pinia-plugin-persist`进行数据持久化，否则一刷新就会造成数据丢失

# EventBus 与 mitt 区别

`Vue2` 中我们使用 `EventBus` 来实现跨组件之间的一些通信，它依赖于 `Vue` 自带的 `$on/$emit/$off` 等方法，这种方式使用非常简单方便，但如果使用不当也会带来难以维护的毁灭灾难。
而 `Vue3` 中移除了这些相关方法，这意味着 EventBus 这种方式我们使用不了， `Vue3` 推荐尽可能使用 `props/emits`、`provide/inject`、`vuex` 等其他方式来替代。
当然，如果 `Vue3` 内部的方式无法满足你，官方建议使用一些外部的辅助库，例如：`mitt`。

优点

- 非常小，压缩后仅有  200 bytes。

- 完整  TS  支持，源码由  TS  编码。

- 跨框架，它并不是只能用在  Vue  中，React、JQ  等框架中也可以使用。

- 使用简单，仅有  on、emit、off  等少量实用 API。

# Hook 函数

1. 以函数形式抽离一些可复用的方法像钩子一样挂着，随时可以引入和调用，实现高内聚低耦合的目标；

2. 将可复用功能抽离为外部 JS 文件

3. 函数名/文件名以 use 开头，形如：useXX

4. 引用时将响应式变量或者方法显式解构暴露出来如：const {nameRef，Fn} = useXX()

# Vue3 自定义 Hooks 和 Vue2 时代 Mixin

## 关系

> Mixin 不足 在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

1. Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。

2. 重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

## 区别和比较

1. Mixin 难以追溯的方法与属性！Vue3 自定义 Hooks 却可以

2. 无法向 Mixin 传递参数来改变逻辑，但是 Vue3 自定义 Hooks 却可以：

3. Mixin 同名变量会被覆盖，Vue3 自定义 Hook 可以在引入的时候对同名变量重命名

# vue3 中使用插槽

## 默认插槽

- 子组件

```vue
<template>
  <div>
    <slot>默认内容</slot>
  </div>
</template>
```

- 父组件

```vue
<template>
  <ChildComponent>
    <p>这是父组件传递的内容。</p>
  </ChildComponent>
</template>
```

## 具名插槽：子组件可以定义多个插槽位，父组件可以指定内容填充到哪个插槽位。

- 子组件：

```vue
<template>
  <div>
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

- 父组件

```vue
<template>
  <ChildComponent>
    <template v-slot:header>
      <h1>这是头部内容</h1>
    </template>
    <template v-slot:main>
      <p>这是主体内容</p>
    </template>
    <template v-slot:footer>
      <footer>这是底部内容</footer>
    </template>
  </ChildComponent>
</template>
```

## 作用域插槽：除了传递内容，插槽还可以提供数据给父组件使用。

vue3 中使用插槽 在 Vue
3 中，插槽是一种让父组件能够向子组件传递内容的机制。插槽可以分为默认插槽、具名插槽和作用域插槽。
默认插槽：子组件在模板中预留一个插槽位，父组件可以传入内容填充这个位置。
子组件（ChildComponent.vue）：

- 子组件：

```vue
<template>
  <div>
    <slot :user="user">{{ user.name }}</slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: { name: "张三", age: 30 },
    };
  },
};
</script>
```

- 父组件：

```vue
<template>
  <ChildComponent>
    <template v-slot:default="slotProps">
      <p>用户名: {{ slotProps.user.name }}</p>
      <p>用户年龄: {{ slotProps.user.age }}</p>
    </template>
  </ChildComponent>
</template>
```

# 使用全局属性

> 在 Vue 3 中，创建全局变量可以通过以下几种方式实现：

## provide 和 inject

在应用的根组件中使用 provide 函数提供全局变量，然后在子组件中使用 inject 函数来注入全局变量。

```ts
// 根组件
import { provide } from "vue";

export default {
  setup() {
    const globalVar = "全局变量";
    provide("globalVar", globalVar);
  },
};

// 子组件
import { inject } from "vue";

export default {
  setup() {
    const globalVar = inject("globalVar");
    // 使用 globalVar
  },
};
```

## globalProperties

在应用的实例上使用 globalProperties 添加全局属性。

```ts
// main.js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$globalVar = "全局变量";
app.mount("#app");

// 任何组件内
export default {
  mounted() {
    console.log(this.$globalVar); // 输出：全局变量
  },
};
```

## 使用外部 JavaScript 模块

将全局变量定义在外部模块中，然后在需要的地方导入模块。

```ts
// global.js
export const globalVar = "全局变量";

// 组件内
import { globalVar } from "./global.js";

export default {
  mounted() {
    console.log(globalVar); // 输出：全局变量
  },
};
```

> 选择哪种方式取决于具体场景和项目结构。通常推荐使用 provide 和 inject 或者 globalProperties，因为这些方法更符合 Vue 3 的响应式和组合式 API 的原则。
