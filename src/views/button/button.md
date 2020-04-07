## Button 按钮
常用的操作按钮。

### 基础用法

:::demo 基础用法

```js
render() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="text">文字按钮</Button>
    </div>
  )
}
```
:::



### 禁用状态

:::demo 通过disabled属性指定是否禁用button组件, 它接收一个Boolean值

```js
render() {
  return (
    <div>
      <Button disabled={true}>默认按钮</Button>
      <Button disabled={true} type="primary">主要按钮</Button>
      <Button disabled={true} type="text">文字按钮</Button>
    </div>
  )
}
```
:::


### 不同状态的按钮

:::demo 正常的按钮设置了不同的 type 属性对应不同的样式. 设置 hover 属性, 它接收一个 Boolean

```js
render() {
  return (
    <div>
      <p style={{ fontSize: '14px' }}>默认显示颜色</p>
      <Button type="success">成功</Button>
      <Button type="warning">警告</Button>
      <Button type="danger">危险</Button>
      <Button type="info">信息</Button>
      <p style={{ fontSize: '14px' }}>hover 显示颜色</p>
      <Button hover={true} type="success">成功</Button>
      <Button hover={true} type="warning">警告</Button>
      <Button hover={true} type="danger">危险</Button>
      <Button hover={true} type="info">信息</Button>
    </div>
  )
}
```
:::


### 不同尺寸的按钮

:::demo 通过 size属性设置按钮的大小, 所有尺寸: large, normal, small, mini. 默认为 normal

```js
render() {
  return (
    <div>
      <Button size="large" type="primary">大按钮</Button>
      <Button size="normal" type="primary">正常按钮</Button>
      <Button size="small" type="primary">小按钮</Button>
      <Button size="mini" type="primary">超小按钮</Button>
    </div>
  )
}
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   large,small,mini            |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,info,text |     —    |
| hover     | 是否朴素按钮   | Boolean    | true,false | false   |
| disabled  | 禁用    | boolean   | true, false   | false   |
