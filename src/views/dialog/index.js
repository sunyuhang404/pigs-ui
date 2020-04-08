
import Nerv from 'nervjs';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';

import Dialog from '@/packages/dialog';
import Button from '@/packages/button';

export default class ButtonViews extends Nerv.Component {
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
        <p className="title">Dialog 对话框</p>
        <p className="sub-title">弹窗.</p>

        <p className="title use-title">基础用法</p>
        <CollapseView code={this.renderDialog().code} desc={this.renderDialog().desc}>
          <Button type="primary" onClick={() => this.handleClick()}>open dialog</Button>
        </CollapseView>

        <Dialog
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); }}
        >
          <p>content</p>
          <p>content</p>
          <p>content</p>
          <Dialog.Footer>
            <Button onClick={() => { this.setState({ visible: false }); }}>确定</Button>
            <Button type="primary" onClick={() => { this.setState({ visible: false }); }}>关闭</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
