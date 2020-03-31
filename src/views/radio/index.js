

import Nerv from 'nervjs';
import Component from '@/libs/component';
// import './radioViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';
import Radio from '@/packages/radio/index';


export default class InputViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 1,
      radioGroup: 1,
      data: [
        {
          parameter: 'label',
          desc: 'Radio的显示内容',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'value',
          desc: 'Radio的value',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'disabled',
          desc: '禁用',
          type: 'boolean',
          optionalValue: ' - ',
          defaultValue: ' false '
        },
        {
          parameter: 'checked',
          desc: '是否勾选',
          type: 'boolean',
          optionalValue: ' - ',
          defaultValue: ' false '
        }
      ],
      groupData: [
        {
          parameter: 'value',
          desc: '指定选中的选项',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        }
      ],
      groupEventData: [
        {
          parameter: 'onChange',
          desc: '当绑定值发生变化的时候触发',
          callback: 'value'
        }
      ]
    };
  }

  renderRadio = () => {
    return {
      code: `
        constructor(props) {
          super(props);
          this.state = {
            selectedValue: 1,
          };
        }

        handleRadioChange = (val) => {
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
      `,
      desc: `使用 <code>Radio</code> 组件,要设置<code>value</code>绑定变量，可以通过<code>checked</code>来指定<code>Radio</code>的选中状态。`
    };
  }

  renderDisabled = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Radio label="备选项1" checked={true} disabled></Radio>
              <Radio label="备选项2" checked={false} disabled></Radio>
            </div>
          )
        }
      `,
      desc: `
        通过<code>disabled</code>属性指定是否禁用<code>Radio</code>组件
      `
    };
  }

  renderGroup = () => {
    return {
      code: `
        constructor(props) {
          super(props);
          this.state = {
            radioGroup: 1,
          };
        }

        handleGroupChange = (val) => {
          this.setState({ radioGroup: val });
        }

        render() {
          return (
            <div>
              <Radio.Group value={this.state.radioGroup} onChange={(val) => this.handleGroupChange(val)}>
                <Radio value={1} label="备选项1"></Radio>
                <Radio value={2} label="备选项2"></Radio>
              </Radio.Group>
            </div>
          )
        }
      `,
      desc: `
        结合<code>Radio.Group</code>组件和<code>Radio</code>组件可以实现单选组, 在<code>Radio.Group</code>中绑定<code>value</code>
        在<code>Radio</code>中设置好<code>value</code>即可, 不需要给每个<code>Radio</code>绑定<code>checked</code>.
      `,
    };
  }

  handleRadioChange = (val) => {
    this.setState({ selectedValue: val });
  }

  handleGroupChange = (val) => {
    this.setState({ radioGroup: val });
  }


  handleCheckboxChange = (val) => {
    this.setState({ checkboxGroup: val.list });
  }

  indeterminateChange = (val) => {
    if (val) {
      let arr = this.state.list.map(item => item.value);
      this.setState({ checkboxGroup2: arr, indeterminate: val });
    } else {
      this.setState({ checkboxGroup2: [], indeterminate: val });
    }
  }
  
  handleCheckboxChange2 = (val) => {
    this.setState({
      checkboxGroup2: val.list,
      indeterminate: val.list.length === this.state.list.length,
      isIndeterminate: val.list.length > 0 && val.list.length < this.state.list.length
    });
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Radio 单选框</p>
        <p className="sub-title">在一组备选项中进行单选.</p>

        <p className="title use-title">基础用法</p>
        <p className="sub-title">如果选项比较多建议用Select选择器.</p>
        <CollapseView code={this.renderRadio().code} desc={this.renderRadio().desc}>
          <Radio checked={this.state.selectedValue === 1} label="备选项1" onChange={(val) => this.handleRadioChange(val)} value={1}></Radio>
          <Radio checked={this.state.selectedValue === 2} label="备选项2" onChange={(val) => this.handleRadioChange(val)} value={2}></Radio>
        </CollapseView>

        <p className="title use-title">禁用状态</p>
        <CollapseView code={this.renderDisabled().code} desc={this.renderDisabled().desc}>
          <Radio label="备选项1" checked={true} disabled></Radio>
          <Radio label="备选项2" checked={false} disabled></Radio>
        </CollapseView>

        <p className="title use-title">单选框组</p>
        <CollapseView code={this.renderGroup().code} desc={this.renderGroup().desc}>
          <Radio.Group value={this.state.radioGroup} onChange={(val) => this.handleGroupChange(val)}>
            <Radio value={1} label="备选项1"></Radio>
            <Radio value={2} label="备选项2"></Radio>
            <Radio value={3} label="备选项3" disabled></Radio>
          </Radio.Group>
        </CollapseView>

        <p className="title use-title">Radio Attributes</p>
        <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter" width="160px"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type" width="140px"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue" width="120px"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue" width="120px"></Table.Column>
        </Table>

        <p className="title use-title">Radio.Group Attributes</p>
        <Table data={this.state.groupData}>
          <Table.Column label="参数" prop="parameter" width="160px"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type" width="140px"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue" width="120px"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue" width="120px"></Table.Column>
        </Table>

        <p className="title use-title">Radio.Group Events</p>
        <Table data={this.state.groupEventData}>
          <Table.Column label="参数" prop="parameter"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="回调参数" prop="callback"></Table.Column>
        </Table>
      </div>
    )
  }
}