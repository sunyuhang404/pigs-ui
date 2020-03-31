import Nerv from 'nervjs';
import Component from '@/libs/component';
import './popover.less';
import Popper from 'popper.js';

export default class Popover extends Component {
  static defaultProps = {
    trigger: '',
    placement: 'bottom',
    visibleArrow: true,
  };

  state = {
    showPopover: false,
  };

  componentDidMount() {
    this.element = Nerv.findDOMNode(this);
    this.reference = Nerv.findDOMNode(this.refs.reference);
    if (this.reference === null) return;

    if (this.props.trigger === 'click') {
      this.reference.addEventListener('click', () => {
        console.log('click');
        this.setState({ showPopover: !this.state.showPopover });
      });
    } else if (this.props.trigger === 'hover') {
      this.reference.addEventListener('mouseenter', () => this.handleMouseEnter());
      this.reference.addEventListener('mouseleave', () => this.handleMouseLeave());
    } else if (this.reference.nodeName === 'INPUT' || this.reference.nodeName === 'TEXTAREA') {
      this.reference.addEventListener('focus', () => { this.setState({ showPopover: true }); });
      this.reference.addEventListener('blur', () => { this.setState({ showPopover: false }); });
    } else if (this.reference.className.includes('pg-input')) {
      this.reference.firstElementChild.addEventListener('focus', () => { this.setState({ showPopover: true }); });
      this.reference.firstElementChild.addEventListener('blur', () => { this.setState({ showPopover: false }); });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showPopover) {
      if (this.refs.arrow) {
        this.refs.arrow.setAttribute('x-arrow', '');
      }
      this.popperJS = new Popper(this.reference, this.refs.popper, {
        placement: this.props.placement,
        modifiers: {
          computeStyle: {
            gpuAcceleration: false,
          },
        },
      });
    } else if (this.popperJS) {
      this.popperJS.destroy();
      this.popperJS = null;
    }
  }

  handleMouseEnter = () => {
    clearTimeout(this.timer);
    console.log('hover');
    this.setState({ showPopover: true });
  }

  handleMouseLeave = () => {
    this.timer = setTimeout(() => {
      this.setState({ showPopover: false });
    }, 200);
  }

  getStyle = () => {
    const style = {};
    if (this.props.width && this.props.width.indexOf('%') !== -1) {
      style.width = `${this.props.width.slice(0, this.props.width.indexOf('%'))}%`;
      style.left = '0px !important';
    } else {
      style.width = this.props.width;
    }
    return style;
  }

  render() {
    const { style } = this.props;
    return (
      <div className="pg-popover" style={style || {}}>
        {
          this.state.showPopover &&
          <div ref="popper" className={this.className('pg-popover__content', this.props.className)} style={this.getStyle()}>
            {
              this.props.visibleArrow &&
              <div ref="arrow" className="arrow"></div>
            }
            {
              this.props.title &&
              <div className="pg-popover__title">{this.props.title}</div>
            }
            { this.props.content }
          </div>
        }
        { Nerv.cloneElement(Nerv.Children.only(this.props.children), { ref: 'reference' }) }
      </div>
    );
  }
}
