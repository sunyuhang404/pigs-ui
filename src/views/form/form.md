## Form 表单
由输入框、选择器、单选框等组件组成，用来校验和提交数据。

### 基础用法

包括各种表单项，如：输入框、单选框、多选框等。

:::demo 在 Form 组件中，每一个表单项由一个 FormItem 组件构成，表单项中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio等。

```js
constructor(props) {
  super(props);
  this.state = {
    form: {
      name: '',
      sex: 1,
      type: [],
    },
  };
}

handleChange(label, val) {
  const { form } = this.state;
  form[label] = val;
  this.setState({ form });
}

handleSave() {
  console.log(this.state.form);
}

handleCancel() {
  this.refs.form.resetFields();
}

render() {
  return (
    <div>
      <Form model={this.state.model} ref="form">
        <Form.Item label="姓名" prop="name">
          <Input value={this.state.form.name} onChange={(val) => this.handleChange('name', val)}></Input>
        </Form.Item>
        <Form.Item label="性别" prop="sex">
          <Radio.Group value={this.state.form.sex} onChange={(val) => this.handleChange('sex', val)}>
            <Radio label="男" value={1}></Radio>
            <Radio label="女" value={2}></Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="测试" prop="type">
          <Checkbox.Group value={this.state.form.type} onChange={(val) => this.handleChange('type', val)}>
            <Checkbox label="测试1" value={1}></Checkbox>
            <Checkbox label="测试2" value={2}></Checkbox>
            <Checkbox label="测试3" value={3}></Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => this.handleSave()}>提交</Button>
          <Button onClick={() => this.handleCancel()} type="primary">重置</Button>
        </Form.Item>
      </Form>
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
