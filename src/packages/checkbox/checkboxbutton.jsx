import Nerv from 'nervjs';
import Component from '@/libs/component';
import './checkbox.less';

export default class CheckboxButton extends Component {
  static elementType = 'CheckboxButton';

  parent = () => {
    return this.context.component;
  }

  isDisabled = () => {
    return this.props.disabled || this.parent().props.disabled;
  }

  handleClick = () => {
    if (!this.isDisabled()) {
      const value = this.props.value ? this.props.value : (this.props.value === 0 ? 0 : this.props.label);
      this.props.onChange(value, !this.props.checked, this.props.item);
    }
  }

  render() {
    return (
      <div className={this.className('pg-checkbox-button', {
        'is-active': this.props.checked,
        'is-disabled': this.isDisabled(),
      })}>
        <span
          className="pg-checkbox-button_label"
          onClick={() => this.handleClick()}
        >
          {this.props.label}
        </span>
        <div className="pg-checkbox-button_child">{ this.props.children }</div>
      </div>
    )
  }
}