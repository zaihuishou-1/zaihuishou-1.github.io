# 关于生命周期
Composition API的生命周期：

除了`beforecate`和`created`(它们被setup方法本身所取代)，我们可以在setup方法中访问的上面后面9个生命钩子选项:

# Vue3.0有什么更新

- 性能优化：Vue.js 3.0使用了Proxy替代Object.defineProperty实现响应式，并且使用了静态提升技术来提高渲染性能。新增了编译时优化，在编译时进行模板静态分析，并生成更高效的渲染函数。

- Composition API：Composition API是一个全新的组件逻辑复用方式，可以更好地组合和复用组件的逻辑。

- TypeScript支持：Vue.js 3.0完全支持TypeScript，在编写Vue应用程序时可以更方便地利用TS的类型检查和自动补全功能。

- 新的自定义渲染API：Vue.js 3.0的自定义渲染API允许开发者在细粒度上控制组件渲染行为，包括自定义渲染器、组件事件和生命周期等。

- 改进的Vue CLI：Vue.js 3.0使用了改进的Vue CLI，可以更加灵活地配置项目，同时支持Vue.js2.x项目升级到Vue.js 3.0。

- 移除一些API：Vue.js 3.0移除了一些不常用的API，如过渡相关API，部分修饰符等。

# setup
scrtpt setup 是 vue3 的语法糖，简化了组合式 API 的写法，并且运行性能更好。使用 script setup 语法糖的特点：

- 属性和方法无需返回，可以直接使用。
- 引入组件的时候，会自动注册，无需通过 components 手动注册。
- 使用 defineProps 接收父组件传递的值。
- useAttrs 获取属性，useSlots 获取插槽，defineEmits 获取自定义事件。
- 默认不会对外暴露任何属性，如果有需要可使用 defineExpose 。

# Proxy和Object.defineProperty的区别

1、 Proxy和Object.defineProperty都可以用来实现JavaScript对象的响应式，但是它们有一些区别：


2、 实现方式：Proxy是ES6新增的一种特性，使用了一种代理机制来实现响应式。而Object.defineProperty是在ES5中引入的，使用了getter和setter方法来实现。


3 、作用对象：Proxy可以代理整个对象，包括对象的所有属性、数组的所有元素以及类似数组对象的所有元素。而Object.defineProperty只能代理对象上定义的属性。


4、 监听属性：Proxy可以监听到新增属性和删除属性的操作，而Object.defineProperty只能监听到已经定义的属性的变化。


5、 性能：由于Proxy是ES6新增特性，其内部实现采用了更加高效的算法，相对于Object.defineProperty来说在性能方面有一定的优势。

综上所述，虽然Object.defineProperty在Vue.js 2.x中用来实现响应式，但是在Vue.js 3.0中已经采用了Proxy来替代，这是因为Proxy相对于Object.defineProperty拥有更优异的性能和更强大的能力。
 

# Vue3升级了哪些重要功能


- 新的API：Vue3使用createApp方法来创建应用程序实例，并有新的组件注册和调用方法。

- emits属性：：Vue 3的组件可以使用emits属性来声明事件。

- 生命周期

- 多个Fragment

- 移除.sync

- 异步组件的写法

```js
const Foo = defineAsyncComponent(() => import('./Foo.vue') )
```

# vue2和vue3 核心 diff 算法区别？

Vue 2.x使用的是双向指针遍历的算法，也就是通过逐层比对新旧虚拟DOM树节点的方式来计算出更新需要做的最小操作集合。但这种算法的缺点是，由于遍历是从左到右、从上到下进行的，当发生节点删除或移动时，会导致其它节点位置的计算出现错误，因此会造成大量无效的重新渲染。

Vue 3.x使用了经过优化的单向遍历算法，也就是只扫描新虚拟DOM树上的节点，判断是否需要更新，跳过不需要更新的节点，进一步减少了不必要的操作。此外，在虚拟DOM创建后，Vue 3会缓存虚拟DOM节点的描述信息，以便于复用，这也会带来性能上的优势。同时，Vue 3还引入了静态提升技术，在编译时将一些静态的节点及其子节点预先处理成HTML字符串，大大提升了渲染性能。
因此，总体来说，Vue 3相对于Vue 2拥有更高效、更智能的diff算法，能够更好地避免不必要的操作，并提高了渲染性能。
 
# Vue3为什么比Vue2快
1、响应式系统优化：Vue3引入了新的响应式系统，这个系统的设计让Vue3的渲染函数可以在编译时生成更少的代码，这也就意味着在运行时需要更少的代码来处理虚拟DOM。这个新系统的一个重要改进就是提供了一种基于Proxy实现的响应式机制，这种机制为开发人员提供更加高效的API，也减少了一些运行时代码。

2、编译优化：Vue3的编译器对代码进行了优化，包括减少了部分注释、空白符和其他非必要字符的编译，同时也对编译后的代码进行了懒加载优化。

3、更快的虚拟DOM：Vue3对虚拟DOM进行了优化，使用了跟React类似的Fiber算法，这样可以更加高效地更新DOM节点，提高性能。

4、Composition API：Vue3引入了Composition API，这种API通过提供逻辑组合和重用的方法来提升代码的可读性和重用性。这种API不仅可以让Vue3应用更好地组织和维护业务逻辑，还可以让开发人员更加轻松地实现优化。

# Vue3中的Teleport组件

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
  <Dialog ref="dialogRef"></Dialog>
</template>
```
总之，`Teleport` 组件是 Vue3 中新增的一个非常有用的组件，可以方便地实现一些弹出框、提示框等组件的功能，提高了开发效率。


# reactive、ref 、toRef 和 toRefs
- `ref`： 函数可以接收原始数据类型与引用数据类型。`ref`函数创建的响应式数据，在模板中可以直接被使用，在 JS 中需要通过 `.value`的形式才能使用。
- `reactive`： 函数只能接收引用数据类型。
- `toRef`：针对一个响应式对象的属性创建一个`ref`，使得该属性具有响应式，两者之间保持引用关系。（入下所示，即让state中的age属性具有响应式）
```js
const state = reactive({
  name:'a'
  age:10
})
const ageRef = toRef(state,'age')
```

- `toRefs`： 将一个响应式对象转为普通对象，对象的每一个属性都是对应的ref，两者保持引用关系
```js
const state = reactive({
  name:'a'
  age:10
})
const stateRefs = toRefs(state)
```

# pinia
Pinia 是 Vue 官方团队成员专门开发的一个全新状态管理库，并且 Vue 的官方状态管理库已经更改为了 Pinia。

- 更加轻量级，压缩后提交只有1.6kb。
- 完整的 TS 的支持，Pinia 源码完全由 TS 编码完成。
- 移除 mutations，只剩下 state 、 actions 、 getters 。
- 没有了像 Vuex 那样的模块镶嵌结构，它只有 store 概念，并支持多个 store，且都是互相独立隔离的。当然，你也可以手动从一个模块中导入另一个模块，来实现模块的镶嵌结构。
- 无需手动添加每个 store，它的模块默认情况下创建就自动注册。
- 支持服务端渲染（SSR）。
- 支持 Vue DevTools。
- 更友好的代码分割机制，[传送门](https://juejin.cn/post/7057439040911441957#heading-2)。
> Pinia 配套有个插件 `pinia-plugin-persist`进行数据持久化，否则一刷新就会造成数据丢失

# EventBus与mitt区别
`Vue2` 中我们使用 `EventBus` 来实现跨组件之间的一些通信，它依赖于 `Vue` 自带的 `$on/$emit/$off` 等方法，这种方式使用非常简单方便，但如果使用不当也会带来难以维护的毁灭灾难。
而 `Vue3` 中移除了这些相关方法，这意味着 EventBus 这种方式我们使用不了， `Vue3` 推荐尽可能使用 `props/emits`、`provide/inject`、`vuex` 等其他方式来替代。
当然，如果 `Vue3` 内部的方式无法满足你，官方建议使用一些外部的辅助库，例如：`mitt`。

优点

- 非常小，压缩后仅有 200 bytes。
- 完整 TS 支持，源码由 TS 编码。
- 跨框架，它并不是只能用在 Vue 中，React、JQ 等框架中也可以使用。
- 使用简单，仅有 on、emit、off 等少量实用API。

 