## Checkbox 多选框
一组备选项中进行多选.

### 基础用法
单独使用可以表示两种状态之间的切换.

:::demo 最简单的 Checkbox, 使用 label 设置多选框的值

```js
render() {
  return (
    <div>
      <Checkbox label="备选项"></Checkbox>
    </div>
  )
}
```
:::


### 禁用状态

:::demo 通过disabled属性指定是否禁用Checkbox组件

```js
render() {
  return (
    <div>
      <Checkbox label="备选项1" disabled></Checkbox>
      <Checkbox label="备选项2" checked disabled></Checkbox>
    </div>
  )
}
```
:::


### 多选框组

:::demo Checkbox.Group 能把多个 Checkbox 管理为一组, 只要在 Group 中使用 value 绑定 Array 类型的变量. label 属性不仅是 Checkbox 的介绍, 也是对应的 Checkbox 的值

```js
handleCheckboxChange(val) {
  this.setState({ checkboxGroup: val.list });
}

render() {
  return (
    <div>
      <Checkbox.Group value={this.state.checkboxGroup} onChange={(val) => this.handleCheckboxChange(val)}>
        <Checkbox label="备选项1"></Checkbox>
        <Checkbox label="备选项2"></Checkbox>
        <Checkbox label="禁用" disabled></Checkbox>
        <Checkbox label="选中禁用" disabled></Checkbox>
      </Checkbox.Group>
    </div>
  )
}
```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 绑定值	   | string / number  |     —    |    —     |
| trueLabel     | 选中时候的值	   | string / number    |     —    |     —    |
| falseLabel     | 没有选中的值	   | string / number    |     —    |     —    |
| disabled  | 禁用    | boolean   | true, false   |   false   |
| checked  | 是否勾选	    | boolean   |     —    |   false   |
| indeterminate  | 是否勾选	    | boolean   |     —    |   false   |

### Checkbox.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 指定选中的选项		   | array  |     —    |    []     |

### Checkbox.Group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange  | 当绑定值发生变化的时候触发 | value |
