
import Nerv from 'nervjs';
// import './formViews.less';
import '../views.less';

import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';
import Form from '@/packages/form/index';
import Input from '@/packages/input/index';
import Button from '@/packages/button/index';
import Radio from '@/packages/radio/index';
import Checkbox from '@/packages/checkbox/index';

export default class FormViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      model: {
        name: '',
        address: '',
        age: '',
        sex: 1,
        test: []
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        address: { required: true, message: '请输入地址', trigger: 'blur' },
        age: { required: false, validator: this.checkAge, trigger: 'blur' },
        test: { required: true, validator: this.checkTest, trigger: 'change' }
      },
      list: [
        { label: '姓名', prop: 'name', required: true },
        { label: '地址', prop: 'address', required: true },
        { label: '年龄', prop: 'age' }
      ],
    };
  }

  checkAge = (rule, value, callback) => {
    if (value !== '') {
      if (Number(value) < 10) {
        return callback('年龄不能小于10岁');
      } else if (Number(value) > 100) {
        return callback('年龄不能大于100岁');
      }
    }
    callback();
  }

  checkTest = (rule, value, callback) => {
    if (value.length === 0) {
      return callback('请选择');
    }
    callback();
  }
  
  renderForm = () => {
    return {
      code: ``,
      desc: ``
    };
  }

  handleClick = () => {
    console.log(this.refs.form.getFields());
    this.refs.form.validator((valid) => {
      console.log(valid);
    });
  }
  handleClick2 = () => {
    this.refs.form.resetField();
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Form 表单</p>
        <p className="sub-title">由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据.</p>

        <p className="title use-title">典型表单</p>
        <p className="sub-title">包括各种表单项，比如输入框、选择器、开关、单选框、多选框等.</p>
        <CollapseView code={this.renderForm().code} desc={this.renderForm().desc}>
          <Form model={this.state.model} ref="form" rules={this.state.rules}>
            {
              // this.state.list.map((item, index) => {
              //   return (
              //     <Form.Item label={item.label} prop={item.prop} index={index} key={index} required={item.required}>
              //       <Input></Input>
              //     </Form.Item>
              //   )
              // })
            }
            <Form.Item label="姓名" prop="name" required>
              <Input></Input>
            </Form.Item>
            <Form.Item label="地址" prop="address">
              <Input></Input>
            </Form.Item>
            <Form.Item label="年龄" prop="age">
              <Input></Input>
            </Form.Item>
            <Form.Item label="性别" prop="sex">
              <Radio.Group value={this.state.model.sex}>
                <Radio label="男" value={1}></Radio>
                <Radio label="女" value={2}></Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="测试" prop="test">
              <Checkbox.Group value={this.state.model.test}>
                <Checkbox label="测试1" value={1}></Checkbox>
                <Checkbox label="测试2" value={2}></Checkbox>
                <Checkbox label="测试3" value={3}></Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => this.handleClick()}>click</Button>
              <Button onClick={() => this.handleClick2()} type="primary">reset</Button>
            </Form.Item>
          </Form>
        </CollapseView>
      </div>
    )
  }
}