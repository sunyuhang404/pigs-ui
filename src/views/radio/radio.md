## Radio 单选框
在一组备选项中进行单选。

### 基础用法
如果选项比较多建议用Select选择器。

:::demo 使用 Radio 组件,要设置value绑定变量，可以通过checked来指定Radio的选中状态。

```js
constructor(props) {
  super(props);
  this.state = {
    selectedValue: 1,
  };
}

handleRadioChange(val) {
  this.setState({ selectedValue: val });
}

render() {
  return (
    <div>
      <Radio 
        checked={this.state.selectedValue === 1} 
        label="备选项1" 
        value={1}
        onChange={(val) => this.handleRadioChange(val)}>
      </Radio>
      <Radio 
        checked={this.state.selectedValue === 2} 
        label="备选项2" 
        value={2}
        onChange={(val) => this.handleRadioChange(val)}>
      </Radio>
    </div>
  )
}
```
:::


### 禁用状态

:::demo 通过 disabled 属性指定是否禁用 Radio 组件。

```js
render() {
  return (
    <div>
      <Radio label="备选项1" checked={true} disabled></Radio>
      <Radio label="备选项2" checked={false} disabled></Radio>
    </div>
  )
}
```
:::


### 单选框组

:::demo 结合 Radio.Group 组件和 Radio 组件可以实现单选组, 在 Radio.Group 中绑定 value 在 Radio中 设置好 value 即可。

```js
constructor(props) {
  super(props);
  this.state = {
    radioGroup: 1,
  };
}

handleGroupChange(val) {
  this.setState({ radioGroup: val });
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.radioGroup} onChange={(val) => this.handleGroupChange(val)}>
        <Radio value={1} label="备选项1"></Radio>
        <Radio value={2} label="备选项2"></Radio>
        <Radio value={3} label="备选项3"></Radio>
      </Radio.Group>
    </div>
  )
}
```
:::


### 按钮样式

:::demo 按钮样式的单选组合。

```js
constructor(props) {
  super(props);
  this.state = {
    radio1: '上海',
    radio2: '深圳',
    radio3: '广州',
    radio4: '',
  }
}

onChange(label, value) {
  this.setState({ [label]: value });
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.radio1} onChange={(val) => this.onChange('radio1', val)}>
        <Radio.Button label="北京" value="北京" />
        <Radio.Button label="上海" value="上海" />
        <Radio.Button label="深圳" value="深圳" />
        <Radio.Button label="广州" value="广州" />
        <Radio.Button label="杭州" value="杭州" />
      </Radio.Group>
      <div style={{ marginBottom: '12px' }}></div>
      <Radio.Group value={this.state.radio2} onChange={(val) => this.onChange('radio2', val)}>
        <Radio.Button label="北京" value="北京" disabled />
        <Radio.Button label="上海" value="上海" />
        <Radio.Button label="深圳" value="深圳" />
        <Radio.Button label="广州" value="广州" />
        <Radio.Button label="杭州" value="杭州" />
      </Radio.Group>
      <div style={{ marginBottom: '12px' }}></div>
      <Radio.Group value={this.state.radio3} disabled={true}>
        <Radio.Button label="北京" value="北京" />
        <Radio.Button label="上海" value="上海" />
        <Radio.Button label="深圳" value="深圳" />
        <Radio.Button label="广州" value="广州" />
        <Radio.Button label="杭州" value="杭州" />
      </Radio.Group>
      <div style={{ marginBottom: '12px' }}></div>
      <Radio.Group value={this.state.radio4} disabled={true} size="small">
        <Radio.Button label="北京" value="北京" />
        <Radio.Button label="上海" value="上海" />
        <Radio.Button label="深圳" value="深圳" />
        <Radio.Button label="广州" value="广州" />
        <Radio.Button label="杭州" value="杭州" />
      </Radio.Group>
    </div>
  )
}
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label | 绑定值 | string / number |   —  |  —  |
| value | Radio 的 值 | string / number / boolean |  —  |  —  |
| disabled | 禁用 | boolean | true, false  |  false  |

### Radio.Button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | Radio。Button 的 值 | string / number / boolean |  —  |  —  |
| disabled | 禁用 | boolean | true, false  |  false  |


### Radio.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 指定选中的选项 | string / number |  —  |  —  |
| size | Radio.Button 按钮组尺寸 | string | small, large |  —  |

### Radio.Group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange | 当绑定值发生变化的时候触发 | value |
