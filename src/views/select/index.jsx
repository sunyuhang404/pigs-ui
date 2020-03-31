
import Nerv from 'nervjs';
// import './selectViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Select from '@/packages/Select/index';

export default class SelectViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderSelect = () => {
    return {
      code: '',
      desc: ''
    }
  }
  
  render() {
    return (
      <div className="pg-view">
        <p className="title">Select 选择器</p>
        <p className="sub-title">当选项过多时，使用下拉菜单展示并选择内容.</p>

        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderSelect().code} desc={this.renderSelect().desc}>
          <Select></Select>
        </CollapseView>
      </div>
    )
  }
}