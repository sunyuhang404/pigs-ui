
import Nerv from 'nervjs';
// import './checkboxViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table';
import Checkbox from '@/packages/checkbox';


export default class InputViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxGroup: ['备选项1', '选中禁用'],
      checkboxGroup2: [1],
      singleCheckbox: false,
      indeterminate: false,
      isIndeterminate: true,
      list: [
        { label: '备选项1', value: 1 },
        { label: '备选项2', value: 2 },
        { label: '备选项3', value: 3 }
      ],
      data: [
        {
          parameter: 'label',
          desc: '绑定值',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'trueLabel',
          desc: '选中时候的值',
          type: 'string / number',
          optionalValue: ' - ',
          defaultValue: ' - '
        },
        {
          parameter: 'falseLabel',
          desc: '没有选中的值',
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
        },
        {
          parameter: 'indeterminate',
          desc: '不确定状态, 只控制了样式',
          type: 'boolean',
          optionalValue: ' - ',
          defaultValue: ' false '
        }
      ],
      groupData: [
        {
          parameter: 'value',
          desc: '指定选中的选项',
          type: '[]',
          optionalValue: ' - ',
          defaultValue: ' [] '
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

  renderCheckbox = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Checkbox label="备选项"></Checkbox>
            </div>
          )
        }
      `,
      desc: `最简单的<code>Checkbox</code>, 使用<code>label</code>设置多选框的值`
    };
  }

  renderDisabledCheckbox = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Checkbox label="备选项1" disabled></Checkbox>
              <Checkbox label="备选项2" checked disabled></Checkbox>
            </div>
          )
        }
      `,
      desc: `
        通过<code>disabled</code>属性指定是否禁用Checkbox组件
      `
    };
  }

  renderCheckboxGroup = () => {
    return {
      code: `
        handleCheckboxChange = (val) => {
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
      `,
      desc: `
        <code>Checkbox.Group</code>能把多个<code>Checkbox</code>管理为一组, 只要在Group中使用<code>value</code>绑定Array类型的变量.
        <code>label</code>属性不仅是<code>Checkbox</code>的介绍, 也是对应的<code>Checkbox</code>的值
      `,
    };
  }

  renderIndeterminate = () => {
    return {
      code: `
        constructor(props) {
          super(props);
          this.state = {
            isIndeterminate: false,
            indeterminate: false,
            checkboxGroup2: [],
            list: [
              { label: '备选项1', value: 1 },
              { label: '备选项2', value: 2 },
              { label: '备选项3', value: 3 }
            ]
          };
        }

        indeterminateChange = (val) => {
          if (val) {
            let arr = this.state.list.map(item => item.value);
            this.setState({ checkboxGroup2: arr, indeterminate: val });
          } else {
            this.setState({ checkboxGroup2: [], indeterminate: val });
          }
        }

        render() {
          return (
            <div>
              <Checkbox label="全选" 
                indeterminate={this.state.isIndeterminate} 
                checked={this.state.indeterminate} 
                onChange={(val) => this.indeterminateChange(val)}></Checkbox
              >
                <Checkbox.Group 
                  value={this.state.checkboxGroup2} 
                  onChange={(val) => this.handleCheckboxChange2(val)}
                >
                {
                  this.state.list.map((item) => {
                    return <Checkbox label={item.label} value={item.value}></Checkbox>
                  })
                }
              </Checkbox.Group>
            </div>
          )
        }
      `,
      desc: `设置<code>indeterminate</code>属性, 表示不确定`
    }
  }


  handleCheckboxChange = (val) => {
    this.setState({ checkboxGroup: val.list });
  }

  indeterminateChange = (val) => {
    if (val) {
      let arr = this.state.list.map(item => item.value);
      this.setState({ checkboxGroup2: arr, indeterminate: val, isIndeterminate: false });
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

  handleSingleChange = (val) => {
    console.log(val)
    this.setState({ singleCheckbox: val });
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Checkbox 多选框</p>
        <p className="sub-title">一组备选项中进行多选.</p>

        <p className="title use-title">基础用法</p>
        <p className="sub-title">单独使用可以表示两种状态之间的切换.</p>
        <CollapseView code={this.renderCheckbox().code} desc={this.renderCheckbox().desc}>
          <Checkbox label="备选项" trueLabel="true" indeterminate={true} falseLabel="false" checked={this.state.singleCheckbox} onChange={(val, checked) => this.handleSingleChange(checked)}></Checkbox>
        </CollapseView>

        <p className="title use-title">禁用状态</p>
        <CollapseView code={this.renderDisabledCheckbox().code} desc={this.renderDisabledCheckbox().desc}>
          <Checkbox label="备选项1" value="备选项1" disabled></Checkbox>
          <Checkbox label="备选项2" value="备选项2" checked disabled></Checkbox>
        </CollapseView>

        <p className="title use-title">多选框组</p>
        <CollapseView code={this.renderCheckboxGroup().code} desc={this.renderCheckboxGroup().desc}>
          <Checkbox.Group value={this.state.checkboxGroup} onChange={(val) => this.handleCheckboxChange(val)}>
            <Checkbox label="备选项1" value="备选项1"></Checkbox>
            <Checkbox label="备选项2" value="备选项2"></Checkbox>
            <Checkbox label="禁用" value="禁用" disabled></Checkbox>
            <Checkbox label="选中禁用" value="选中禁用" disabled></Checkbox>
          </Checkbox.Group>
        </CollapseView>

        <p className="title use-title">Checkbox Attributes</p>
        <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter" width="160px"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type" width="140px"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue" width="120px"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue" width="120px"></Table.Column>
        </Table>

        <p className="title use-title">Checkbox.Group Attributes</p>
        <Table data={this.state.groupData}>
          <Table.Column label="参数" prop="parameter" width="160px"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type" width="140px"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue" width="120px"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue" width="120px"></Table.Column>
        </Table>

        <p className="title use-title">Checkbox.Group Events</p>
        <Table data={this.state.groupEventData}>
          <Table.Column label="参数" prop="parameter"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="回调参数" prop="callback"></Table.Column>
        </Table>
      </div>
    )
  }
}