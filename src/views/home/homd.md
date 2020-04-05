

# 快速上手

## 安装

### 推荐使用 npm 的方式安装, 它能更好的和 webpack 打包工具配合使用

```
npm i pigs-ui -D
```

:::demo 额外的尺寸：`large`、`small`、`mini`，通过设置`size`属性来配置它们。

```js
render() {
  return (
    <div>
      <Button type="primary" size="large">大型按钮</Button>
      <Button type="primary">正常按钮</Button>
      <Button type="primary" size="small">小型按钮</Button>
      <Button type="primary" size="mini">超小按钮</Button>
    </div>
  )
}
```
:::


### 引入 Pigs

需要借助 babel-plugin-component, 我们可以只引入需要的组件, 以达到减小项目的体积
首先 安装 babel-plugin-component

```
npm i babel-plugin-component -D
```

然后修改 .babelrc
```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "pigs-ui",
        "style": false
      }
    ]
  ]
}
```


接下来, 只需引入需要使用的组件即可.
```
import Nerv from 'nervjs';
import { Button } from 'pigs-ui';

export default class Home extends Nerv.Component {
  render() {
    return (
      <div className="home-page">
        <Button>按钮</Button>
      </div>
    )
  }
}
```