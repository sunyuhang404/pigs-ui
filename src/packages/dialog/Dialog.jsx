import Nerv from 'nervjs';
import View from '@/libs/view';
import Component from '@/libs/component';
import Icon from '@/packages/icon';
import './Dialog.less';

export default class Dialog extends Component {
  static defaultProps = {
    size: 'tiny',
    width: '400',
    title: '标题',
  };

  componentDidMount() {
    this.enableScroll(this.props.visible);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.body) {
      const clientHeight = this.body.clientHeight;
      const bodyHeight = window.innerHeight;
      if (clientHeight + 80 > bodyHeight) {
        this.content.style.cssText = `
          height: ${bodyHeight - 130}px;
          overflow: hidden;
          overflow-y: scroll;
        `;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.enableScroll(nextProps.visible);
  }

  componentWillUnmount() {
    this.enableScroll(false);
  }

  enableScroll = (flag) => {
    if (flag) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.setAttribute('style', '');
    }
  }

  getStyle = () => {
    const style = {};
    if (this.props.width && this.props.width.indexOf('%') !== -1) {
      const percent = this.props.width.slice(0, this.props.width.indexOf('%'));
      style.width = this.props.width;
      style.marginLeft = `-${percent / 2}%`;
    } else {
      style.width = this.props.width;
    }
    return style;
  }

  handleClickWarpper = () => {
    if (this.props.close) this.props.close();
  }

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  }

  getFooter = () => Nerv.Children.toArray(this.props.children)._find(item => item && item.type && item.type.elementType === 'DialogFooter')

  renderFooter = () => {
    const childrenList = this.getDeepChildList(this.getFooter().props.children);
    if (this.getFooter() && childrenList.length) {
      if (this.getFooter().props.children || this.getFooter().props.children.length) {
        return childrenList.map((child) => Nerv.cloneElement(child));
      }
    }
    return null;
  }

  render() {
    return (
      <View visible={this.props.visible}>
        <div className={this.className('pg-dialog__warpper')} onClick={() => this.handleClickWarpper()}>
          <div ref={body => this.body = body} className={this.className('pg-dialog__body', this.props.className, {
            'pg-dialog__tiny': this.props.size === 'tiny',
            'pg-dialog__small': this.props.size === 'small',
            'pg-dialog__large': this.props.size === 'large',
            'pg-dialog__full': this.props.size === 'full',
          })} style={this.getStyle()}>
            <div className="pg-dialog__header">
              <span className="pg-dialog__title">{this.props.title}</span>
              <Icon name="close" className="pg-dialog__close" onClick={() => this.handleClose()} />
            </div>
            <div className={this.className('pg-dialog__content')}>
              { this.props.children }
            </div>
            {
              this.getFooter() &&
              <div className={this.className('pg-dialog__footer')}>
                { this.renderFooter() }
              </div>
            }
          </div>
        </div>
      </View>
    );
  }
}
