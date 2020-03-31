
import Nerv from 'nervjs';
// import './iconViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Icon from '@/packages/icon';

export default class IconViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [
        {
          parameter: 'size',
          desc: '尺寸',
          type: 'string',
          optionalValue: ' large, small, mini ',
          defaultValue: ' - ',
        },
        {
          parameter: 'type',
          desc: '类型',
          type: 'string',
          optionalValue: ' primary, success, warning, danger, info, text ',
          defaultValue: ' - ',
        },
        {
          parameter: 'hover',
          desc: '是否朴素按钮',
          type: 'boolean',
          optionalValue: 'true / false',
          defaultValue: 'false',
        },
        {
          parameter: 'disabled',
          desc: '禁用',
          type: 'boolean',
          optionalValue: 'true / false',
          defaultValue: 'false',
        },
      ],
    };
  }

  renderDialog = () => ({
    code: '',
    desc: '',
  })

  handleClick = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div className="pg-view">
        <p className="title">Icon 图标</p>
        <p className="sub-title">提供了常用的图标.</p>

        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderDialog().code} desc={this.renderDialog().desc}>
          <Icon name="arrow-down" />
          <Icon name="arrow-left" />
          <Icon name="arrow-right" />
          <Icon name="arrow-up" />
          <Icon name="caret-bottom" />
          <Icon name="caret-left" />
          <Icon name="caret-right" />
          <Icon name="caret-top" />
          <Icon name="check" />
          <Icon name="circle-check" />
          <Icon name="circle-close" />
          <Icon name="circle-cross" />
          <Icon name="close" />
          <Icon name="upload" />
          <Icon name="d-arrow-left" />
          <Icon name="d-arrow-right" />
          <Icon name="d-caret" />
          <Icon name="date" />
          <Icon name="delete" />
          <Icon name="document" />
          <Icon name="edit" />
          <Icon name="information" />
          <Icon name="loading" />
          <Icon name="menu" />
          <Icon name="message" />
          <Icon name="minus" />
          <Icon name="more" />
          <Icon name="picture" />
          <Icon name="plus" />
          <Icon name="search" />
          <Icon name="setting" />
          <Icon name="share" />
          <Icon name="star-off" />
          <Icon name="star-on" />
          <Icon name="time" />
          <Icon name="warning" />
          <Icon name="delete2" />
          <Icon name="upload2" />
          <Icon name="view" />
        </CollapseView>

      </div>
    );
  }
}
