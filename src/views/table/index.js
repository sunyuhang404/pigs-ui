
import Nerv from 'nervjs';
// import './tableViews.less';
import '../views.less';

import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';
import Button from '@/packages/button/index';

export default class TableViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          parameter: 'value',
          desc: '绑定值',
          type: 'string / number string / number string / number string / number',
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

  handleClick = (item, index) => {
    console.log(item);
    console.log(index);
  }
  
  render() {
    return (
      <div className="pg-view">
        <p className="title">Table 表格</p>
        <p className="sub-title">通过鼠标或键盘输入内容, 是最基础的表单域的包装.</p>

        {/* <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderInput().code} desc={this.renderInput().desc}>
          <Input placeholder="请输入内容" />
        </CollapseView>

        <p className="title use-title">禁用状态</p>
        <CollapseView code={this.renderDisabledInput().code} desc={this.renderDisabledInput().desc}>
          <Input placeholder="请输入内容" disabled={true} />
        </CollapseView>

        <p className="title use-title">复合型输入框</p>
        <CollapseView code={this.renderSpecialInput().code} desc={this.renderSpecialInput().desc} className="special-box">
          <Input placeholder="请输入内容" prefix="http://" />
          <Input placeholder="请输入内容" suffix=".com" />
          <Input placeholder="请输入内容" prefix="http://" suffix=".com" />
        </CollapseView> */}

        <p className="title use-title">Table Attributes</p>
        <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter" width="100px"></Table.Column>
          <Table.Column label="说明" prop="desc" width="140px"></Table.Column>
          <Table.Column label="类型" prop="type"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue" width="100px"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue" width="100px"></Table.Column>
        </Table>
      </div>
    )
  }
}