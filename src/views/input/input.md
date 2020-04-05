## Input 输入框
通过鼠标或键盘输入内容, 是最基础的表单域的包装.

### 基础用法

:::demo 直接使用

```js
render() {
  return (
    <div>
      <Input placeholder="请输入内容" />
    </div>
  )
}
```
:::



### 禁用状态

:::demo 通过disabled属性指定是否禁用input组件

```js
render() {
  return (
    <div>
      <Input placeholder="请输入内容" disabled={true} />
    </div>
  )
}
```
:::


### 复合型输入框

:::demo 可通过 prefix指定前置内容, 通过 suffix指定后置内容

```js
render() {
  return (
    <div>
      <Input placeholder="请输入内容" prefix="http://" />
      <Input placeholder="请输入内容" suffix=".com" />
      <Input placeholder="请输入内容" prefix="http://" suffix=".com" />
    </div>
  )
}
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 绑定值	 | string / number	|    —     |    —     |
| placeholder | 输入框占位文本  | string   | string |     —    |
| disabled  | 禁用    |   boolean   | true, false   |   false   |
| prefix  | 前置内容   |   string   |    —     |    —     |
| suffix  | 后置内容	 |   string   |    —     |    —     |
