    
import Nerv from 'nervjs';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table';
import Button from '@/packages/button';
import Input from '@/packages/input';
import Popover from '@/packages/popover';


export default class PopoverViews extends Nerv.Component {
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
  
  renderPopover = () => {
    return {
      code: ``,
      desc: ``
    }
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Popover 弹出框</p>

        {/* 基础用法 */}
        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderPopover().code} desc={this.renderPopover().desc}>
          <Popover content="123123" trigger="click" placement="right" title="title">
            <Button>click</Button>
          </Popover>
          <Popover content="input" placement="bottom" width="100%" title="title">
            <Input className="test" />
          </Popover>
        </CollapseView>

        <p className="title use-title">Popover Attributes</p>
        {/* <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue"></Table.Column>
        </Table> */}
      </div>
    )
  }
}