import Nerv from 'nervjs';
import Component from '@/libs/component';
import './switch.less';

export default class Switch extends Component {
  static defaultProps = {
    size: 'small', // small large
    value: true,
  }
  
  switchChange = (e) => {
    if (this.props.onChange) this.props.onChange(!this.props.value);
  }

  render() {
    return (
      <div className={this.className('pg-switch', `pg-switch-size__${this.props.size}`, {
        'pg-switch-on': this.props.value,
        'pg-switch-off': !this.props.value
      })} onClick={this.switchChange}>
        <span className="pg-switch-inner"></span>
        <div className="pg-switch-bg"></div>
      </div>
    )
  }
}