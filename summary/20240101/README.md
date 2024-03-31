# vite

由 `esbuild` 和 `rollup` 组成

## vite 和 webpack 的区别

- `启动速度和热更新效率。`Vite 利用 ESbuild 进行预构建，ESbuild 使用 Go 语言 编写，其构建速度比使用 JavaScript 编写的打包器快 10 到 100 倍，这意味着在开发环境下，Vite 的启动速度和热更新效率远高于 Webpack。Webpack 在启动时会将所有文件编译一遍，无论模块是否被执行，这导致启动时间随着项目复杂度的增加而变长。相比之下，Vite 仅编译被请求的模块，显著缩短了编译时间。1234
- `生态和实践。`Webpack 的 loader 和 plugin 生态系统非常成熟，覆盖了前端开发的各个方面。尽管 Vite 的生态还在发展中，但已有相当数量的插件。对于许多项目来说，Vite 的生态足够使用，且其零配置的特性简化了项目设置过程。1235
- `打包效率。`Webpack 将所有模块打包成一个或多个 bundle 文件，这导致初次加载速度较慢。而 Vite 仅打包和缓存实际改动的模块，利用了浏览器对 ES Module 的原生支持，从而极大提高了打包效率。35
- `配置复杂度。`Webpack 的配置相对复杂，特别是对于大型项目。相比之下，Vite 更注重开箱即用，简化了配置过程，使其在大多数情况下无需手动配置。

总的来说，Vite 适合于快速开发、轻量级项目，特别是在需要快速启动和迭代的情况下表现优异。而 Webpack 由于其丰富的功能和强大的生态系统，更适合于大型、复杂的项目。

## 打包分包

在项目开发中，自己的代码往往会经常改动过，但安装的依赖是不变动的。vite 打包默认会把自己的代码和依赖的代码打包到一起，生成一个较大的 js 文件，此时由于文件指纹的变动，用户需要花费大量的时间加载未变更的代码。优化方案如下：

当知道包名时：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugin: [vue()],
  build: {
    rollupOptions: {
      manualChunks: {
        // custumname 为自定义的文件指纹
        custumname: ["lodash", "vue"],
      },
    },
  },
});
```

然而在实际项目开发时我们可能会用到几十甚至上百个依赖，我们无法一一写出他们的包名，此时推荐下面这种写法：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugin: [vue()],
  build: {
    rollupOptions: {
      manualChunks(id) {
        if (id.includes("node_modules")) {
          return "custumname";
        }
      },
    },
  },
});
```

## 打包目录分类

将打包后的文件分为类似与传统文件那样的 css 目录、img 目录、js 目录

由于 vite 文档没有，进而查阅 rollup 文档，发现有相关配置

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugin: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith(".css")) {
            return "css/[name]-[hash].css";
          }
          const imgsExts = [
            ".png",
            ".jpg",
            ".jpg",
            ".jpeg",
            ".webp",
            ".svg",
            ".gif",
            ".ico",
          ];
          if (imgsExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return "imgs/[name]-[hash][ext]";
          }
          return "assets/[name]-[hash][ext]";
        },
      },
    },
  },
});
```
