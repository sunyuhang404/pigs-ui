
import Nerv from 'nervjs';
// import './buttonViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';

import Button from '@/packages/button/index';

export default class ButtonViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          parameter: 'size',
          desc: '尺寸',
          type: 'string',
          optionalValue: ' large, small, mini ',
          defaultValue: ' - '
        },
        {
          parameter: 'type',
          desc: '类型',
          type: 'string',
          optionalValue: ' primary, success, warning, danger, info, text ',
          defaultValue: ' - '
        },
        {
          parameter: 'hover',
          desc: '是否朴素按钮',
          type: 'boolean',
          optionalValue: 'true / false',
          defaultValue: 'false'
        },
        {
          parameter: 'disabled',
          desc: '禁用',
          type: 'boolean',
          optionalValue: 'true / false',
          defaultValue: 'false'
        }
      ],
    };
  }

  // 按钮基础用法
  renderButton = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Button>默认按钮</Button>
              <Button type="primary">主要按钮</Button>
              <Button type="text">文字按钮</Button>
            </div>
          )
        }
      `,
      desc: `基础用法`
    };
  }

  // 禁用的按钮
  renderDisabledButton = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Button disabled={true}>默认按钮</Button>
              <Button disabled={true} type="primary">主要按钮</Button>
              <Button disabled={true} type="text">文字按钮</Button>
            </div>
          )
        }
      `,
      desc: `
        通过<code>disabled</code>属性指定是否禁用button组件, 它接收一个<code>Boolean</code>值
      `
    };
  }

  // 不同状态的按钮
  renderSpecialTypeButton = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <p>默认显示颜色</p>
              <Button type="success">成功</Button>
              <Button type="warning">警告</Button>
              <Button type="danger">危险</Button>
              <Button type="info">信息</Button>
              <p>hover 显示颜色</p>
              <Button hover={true} type="success">成功</Button>
              <Button hover={true} type="warning">警告</Button>
              <Button hover={true} type="danger">危险</Button>
              <Button hover={true} type="info">信息</Button>
            </div>
          )
        }
      `,
      desc: `
        正常的按钮设置了不同的 <code>type</code> 属性对应不同的样式.
        设置 <code>hover</code> 属性, 它接收一个 <code>Boolean</code>
      `,
    };
  }

  // 不同尺寸的按钮
  renderSizeButton() {
    return {
      code: `
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
      `,
      desc: `
        通过 <code>size</code>属性设置按钮的大小, 
        所有尺寸: <code>large</code>, <code>normal</code>, <code>small</code>, <code>mini</code>. 默认为 <code>normal</code>
      `
    };
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Button 按钮</p>
        <p className="sub-title">常用的操作按钮.</p>

        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderButton().code} desc={this.renderButton().desc}>
          <Button>默认按钮</Button>
          <Button type="primary">主要按钮</Button>
          <Button type="text">文字按钮</Button>
        </CollapseView>

        <p className="title use-title">禁用状态</p>
        <CollapseView code={this.renderDisabledButton().code} desc={this.renderDisabledButton().desc}>
          <Button disabled={true}>默认按钮</Button>
          <Button disabled={true} type="primary">主要按钮</Button>
          <Button disabled={true} type="text">文字按钮</Button>
        </CollapseView>

        <p className="title use-title">不同状态的按钮</p>
        <CollapseView code={this.renderSpecialTypeButton().code} desc={this.renderSpecialTypeButton().desc} className="special-box">
          <p>默认显示颜色</p>
          <Button type="success">成功</Button>
          <Button type="warning">警告</Button>
          <Button type="danger">危险</Button>
          <Button type="info">信息</Button>
          <p>hover 显示颜色</p>
          <Button hover={true} type="success">成功</Button>
          <Button hover={true} type="warning">警告</Button>
          <Button hover={true} type="danger">危险</Button>
          <Button hover={true} type="info">信息</Button>
        </CollapseView>

        <p className="title use-title">不同尺寸的按钮</p>
        <CollapseView code={this.renderSizeButton().code} desc={this.renderSizeButton().desc} className="special-box">
          <Button size="large" type="primary">大按钮</Button>
          <Button size="normal" type="primary">正常按钮</Button>
          <Button size="small" type="primary">小按钮</Button>
          <Button size="mini" type="primary">超小按钮</Button>
        </CollapseView>

        <p className="title use-title">Button Attributes</p>
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