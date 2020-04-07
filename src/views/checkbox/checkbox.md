## Checkbox 多选框
一组备选项中进行多选.

### 基础用法
单独使用可以表示两种状态之间的切换.

:::demo 最简单的 Checkbox, 使用 label 设置多选框的值

```js
constructor(props) {
  super(props);
  this.state = { checkbox: false };
}

render() {
  return (
    <div>
      <Checkbox 
        label="备选项" 
        value={this.state.checkbox} 
        onChange={(checked) => { this.setState({ checkbox: checked }) }}>
      </Checkbox>
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
      <Checkbox label="备选项2" value={true} disabled></Checkbox>
    </div>
  )
}
```
:::


### 多选框组

:::demo Checkbox.Group 能把多个 Checkbox 管理为一组, 只要在 Group 中使用 value 绑定 Array 类型的变量. label 属性不仅是 Checkbox 的介绍, 也是对应的 Checkbox 的值

```js
constructor(props) {
  super(props);
  this.state = {
    checkboxGroup: ['选中禁用'],
  };
}

handleCheckboxChange(val) {
  this.setState({ checkboxGroup: val });
}

render() {
  return (
    <div>
      <Checkbox.Group value={this.state.checkboxGroup} onChange={(val) => this.handleCheckboxChange(val)}>
        <Checkbox label="备选项1" value="备选项1"></Checkbox>
        <Checkbox label="备选项2" value="备选项2"></Checkbox>
        <Checkbox label="禁用" value="禁用" disabled></Checkbox>
        <Checkbox label="选中禁用" value="选中禁用" disabled></Checkbox>
      </Checkbox.Group>
    </div>
  )
}
```
:::


### 按钮样式
按钮样式的多选组合

:::demo 把 Checkbox 元素换成 Checkbox.Button。还提供了 size 属性，支持 small 和 large 两种。

```js
constructor(props) {
  super(props);
  this.state = {
    group1: ['北京'],
    group2: ['杭州'],
  };
}

handleCheckboxChange(val) {
  this.setState({ checkboxGroup: val });
}

render() {
  return (
    <div>
      <Checkbox.Group value={this.state.group1} size="large" onChange={(val) => this.handleCheckboxChange(val)}>
        <Checkbox.Button label="北京" value="北京"></Checkbox.Button>
        <Checkbox.Button label="上海" value="上海"></Checkbox.Button>
        <Checkbox.Button label="深圳" value="深圳"></Checkbox.Button>
        <Checkbox.Button label="广州" value="广州"></Checkbox.Button>
        <Checkbox.Button label="杭州" value="杭州"></Checkbox.Button>
      </Checkbox.Group>
      <div style={{ marginBottom: '10px' }}></div>
      <Checkbox.Group value={this.state.group2} size="small" onChange={(val) => this.handleCheckboxChange(val)}>
        <Checkbox.Button label="北京" value="北京"></Checkbox.Button>
        <Checkbox.Button label="上海" value="上海"></Checkbox.Button>
        <Checkbox.Button label="深圳" value="深圳"></Checkbox.Button>
        <Checkbox.Button label="广州" value="广州"></Checkbox.Button>
        <Checkbox.Button label="杭州" value="杭州"></Checkbox.Button>
      </Checkbox.Group>
    </div>
  )
}
```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label | 显示的内容 | string / number |  —  |  —  |
| trueLabel | 选中时候的值 | string / number  |  —  |  —  |
| falseLabel | 没有选中的值 | string / number  |  —  |  —  |
| disabled | 禁用 | boolean  | true, false  |  false  |
| value | 是否勾选 | boolean  |  —  |  false  |
| indeterminate | 设置 indeterminate 状态，只样式控制	| boolean  |  —  |  false  |

### Checkbox.Button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | Radio.Button 的值 | string / number / boolean |  —  |  []  |
| disabled | 禁用 | boolean | true, false |  false  |


### Checkbox.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 指定选中的选项  | array  |  —  | [] |
| size | Checkbox.Button 按钮组尺寸	 | string | small, large |  —  |
| min | 可被勾选的 checkbox 的最大数量 | number |  —  |  []  |
| max | 可被勾选的 checkbox 的最小数量 | number |  —  |  []  |

### Checkbox.Group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 当绑定值发生变化的时候触发 | value |
