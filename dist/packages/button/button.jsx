
import Nerv from 'nervjs';
import './button.less';
import Component from '@/libs/component';


export default class Button extends Component {
  static defaultProps = {
    size: 'normal',
    type: 'default'
  }
  render() {
    const { className, type, disabled, hover, size, style } = this.props;
    const typeName = `pg-button-${type}${hover ? '-hover' : ''}`
    return (
      <div className={this.className('pg-button', className, typeName, `pg-button__${size}`, {
        'pg-is-disabled': disabled,
      })} onClick={this.props.onClick} style={style ? style : {}}>
        <span className="button-text">{this.props.children}</span>
      </div>
    )
  }
}
