import Nerv from 'nervjs';
import Component from '@/libs/component';
import './radiobutton.less';

export default class RadioButton extends Component {
  static elementType = 'RadioButton';

  // 父组件实例, RadioGroup
  parent = () => {
    return this.context.component;
  }

  isDisabled = () => {
    return this.props.disabled || this.parent().props.disabled;
  }

  handleClick = () => {
    if (!this.isDisabled()) {
      const value = this.props.value ? this.props.value : (this.props.value === 0 ? 0 : this.props.label);
      this.props.onChange(value, this.props.item);
    }
  }

  render() {
    return (
      <div className={this.className('pg-radio-button', {
        'is-active': this.props.checked,
        'is-disabled': this.props.disabled || this.parent().props.disabled,
      })}>
        <span
          className="pg-radio-button_label"
          onClick={() => this.handleClick()}
        >
          {this.props.label}
        </span>
        <div className="pg-radio-button_child">{ this.props.children }</div>
      </div>
    )
  }
}