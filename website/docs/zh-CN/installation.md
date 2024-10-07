<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-04-06 09:21:03
 * @LastEditTime: 2023-02-13 01:37:31
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\website\docs\zh-CN\installation.md
-->

# 环境支持

Vue for Cesium 可以在支持 [ES2018](https://caniuse.com/?feats=mdn-javascript_builtins_regexp_dotall,mdn-javascript_builtins_regexp_lookbehind_assertion,mdn-javascript_builtins_regexp_named_capture_groups,mdn-javascript_builtins_regexp_property_escapes,mdn-javascript_builtins_symbol_asynciterator,mdn-javascript_functions_method_definitions_async_generator_methods,mdn-javascript_grammar_template_literals_template_literal_revision,mdn-javascript_operators_destructuring_rest_in_objects,mdn-javascript_operators_spread_spread_in_destructuring,promise-finally) 和 [WebGL](https://caniuse.com/webgl) 的浏览器上运行。 如果您确实需要支持旧版本的浏览器，请自行添加 Babel 和相应的 Polyfill.

由于 Vue3 及 CesiumJS 1.85+ 不再支持 IE11，所以 Vue for Cesium 也不再支持 IE 浏览器。

| ![edge](https://unpkg.com/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://unpkg.com/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://unpkg.com/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://unpkg.com/@browser-logos/safari/safari_32x32.png) |
| :-----------------------------------------------------------: | :--------------------------------------------------------------------: | :-----------------------------------------------------------------: | :-----------------------------------------------------------------: |
|                           Edge ≥ 79                           |                              Firefox ≥ 78                              |                             Chrome ≥ 64                             |                             Safari ≥ 12                             |

# 安装

## 使用包管理器安装

我们建议您<span style="color: rgb(66 184 131);"><b>使用包管理器</b></span>（npm，[yarn](https://classic.yarnpkg.com/lang/en/)，[pnpm](https://pnpm.io/zh/)）安装 `Vue for Cesium`，然后您就可以使用打包工具，例如 [vite](https://vitejs.dev), [webpack](https://webpack.js.org/)

```shell
# 选择一个你喜欢的包管理器

# npm
$ npm install vue-cesium --save

# yarn
$ yarn add vue-cesium

# pnpm
$ pnpm add vue-cesium
```

如果您的网络环境不好，建议使用 `nrm` 切换所用的包管理器的资源地址，或直接手动更改。

如果是通过包管理器安装，并希望配合打包工具使用，请阅读下一节：[快速上手](./#/zh-CN/component/quickstart)。

## CDN 引入

Vue for Cesium 支持 CDN 方式引入 Vue for Cesium，这样在 window 上下文中就可以使用 `Vue for Cesium` 了。

不同的 CDN 提供商有不同的引入方式，我们在这里以 [unpkg](https://unpkg.com) 和 [jsdelivr](https://jsdelivr.com) 举例，你也可以使用其它的 CDN 供应商。

如果你的项目使用环境相对封闭，你可以在部署的环境中自己配置 CesiumJS 并引入。

### 使用 unpkg

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//unpkg.com/vue-cesium/dist/index.css" />
  <!-- 引入 Vue3 -->
  <script src="//unpkg.com/vue"></script>
  <!-- 引入组件库 -->
  <script src="//unpkg.com/vue-cesium"></script>
</head>
```

### 使用 jsDelivr

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/vue-cesium/dist/index.css" />
  <!-- 引入 Vue -->
  <script src="//cdn.jsdelivr.net/npm/vue"></script>
  <!-- 引入组件库 -->
  <script src="//cdn.jsdelivr.net/npm/vue-cesium@next"></script>
</head>
```

如果你使用 CDN 引入 `Vue for Cesium` ，我们建议在链接地址上锁定版本，以免将来 `Vue for Cesium` 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com) 官方资料。

# Hello world

通过 **CDN** 的方式我们可以很容易地使用 `Vue for Cesium` 写出一个 Hello world 页面。[在线演示](https://codepen.io/zouyaoji/pen/bGBOyJM)

<iframe height="500" style="width: 100%;" scrolling="no" title="Vue for Cesium Demo" src="https://codepen.io/zouyaoji/embed/bGBOyJM?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/zouyaoji/pen/bGBOyJM'>Vue for Cesium Demo</a> by zouyaoji
  (<a href='https://codepen.io/zouyaoji'>@zouyaoji</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
