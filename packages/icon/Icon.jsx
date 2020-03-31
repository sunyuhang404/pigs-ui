import Nerv from 'nervjs';
import Component from '@/libs/component';
import './icon.less';

export default class Icon extends Component {
  static defaultProps = {
    name: ''
  };

  handleClick = () => {
    if (this.props.onClick) this.props.onClick();
  }
  render() {
    return (
      <i
        className={this.className(`pg-icon-${this.props.name}`, this.props.className)}
        onClick={() => this.handleClick()}
      >
      </i>
    )
  }
}