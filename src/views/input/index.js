
import Nerv from 'nervjs';
// import './inputViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';
import Input from '@/packages/input/index';

import Icon from '@/packages/icon/Icon';

export default class InputViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [
        {
          parameter: 'value',
          desc: '绑定值',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'placeholder',
          desc: '输入框占位文本',
          type: 'string',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'disabled',
          desc: '禁用',
          type: 'boolean',
          optionalValue: 'true / false',
          defaultValue: 'false'
        },
        {
          parameter: 'prefix',
          desc: '前置内容',
          type: 'string',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'suffix',
          desc: '后置内容',
          type: 'string',
          optionalValue: ' - ',
          defaultValue: ' - '
        }
      ],
    };
  }
  renderInput = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Input placeholder="请输入内容" />
            </div>
          )
        }
      `,
      desc: `直接使用`
    };
  }

  renderDisabledInput = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Input placeholder="请输入内容" disabled={true} />
            </div>
          )
        }
      `,
      desc: `
        通过<code>disabled</code>属性指定是否禁用input组件
      `
    };
  }

  renderSpecialInput = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Input placeholder="请输入内容" prefix="http://" />
              <Input placeholder="请输入内容" suffix=".com" />
              <Input placeholder="请输入内容" prefix="http://" suffix=".com" />
            </div>
          )
        }
      `,
      desc: `
        可通过 <code>prefix</code>指定前置内容, 通过 <code>suffix</code>指定后置内容
      `,
    };
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  handleClear = () => {
    this.setState({ value: '' });
  }

  handleIconClick = () => {
    console.log(111);
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Input 输入框</p>
        <p className="sub-title">通过鼠标或键盘输入内容, 是最基础的表单域的包装.</p>

        {/* 基础用法 */}
        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderInput().code} desc={this.renderInput().desc}>
          <Input placeholder="请输入内容" value={this.state.value} icon="pg-icon-search" onChange={(e) => this.handleChange(e)} />
        </CollapseView>

        {/* 禁用状态 */}
        <p className="title use-title">禁用状态</p>
        <CollapseView code={this.renderDisabledInput().code} desc={this.renderDisabledInput().desc}>
          <Input placeholder="请输入内容" disabled={true} />
        </CollapseView>

        {/* 复合型输入框 */}
        <p className="title use-title">复合型输入框</p>
        <CollapseView code={this.renderSpecialInput().code} desc={this.renderSpecialInput().desc} className="special-box">
          <Input placeholder="请输入内容" prefix="http://" />
          <Input placeholder="请输入内容" suffix=".com" />
          <Input placeholder="请输入内容" prefix="http://" suffix=".com" />
        </CollapseView>

        <p className="title use-title">Input Attributes</p>
        <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue"></Table.Column>
        </Table>
      </div>
    )
  }
}