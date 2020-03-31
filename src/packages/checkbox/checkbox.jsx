import Nerv from 'nervjs';
import Component from '@/libs/component';
import './checkbox.less';

export default class Checkbox extends Component {
  static elementType = 'Checkbox';

  parent = () => {
    return this.context.component;
  }

  isDisabled = () => {
    return this.props.disabled || (this.parent() ? this.parent().props.disabled : false);
  }

  handleClick = () => {
    if (!this.isDisabled()) {
      const value = this.props.value ? this.props.value : (this.props.value === 0 ? 0 : this.props.label);
      if (this.props.onChange) this.props.onChange(value, !this.props.checked, this.props.item);
    }
  }

  render() {
    return (
      <label className={this.className('pg-checkbox-item', this.props.className, {
        'is-active': this.props.checked,
        'is-disabled': this.isDisabled(),
      })} for={this.props.label} onClick={() => this.handleClick()}>
        <span>
          <input
            className="pg-checkbox-input"
            type="checkbox"
            value={this.props.value}
            checked={this.props.checked}
            name="pg-checkbox-item"
          />
          <span className="pg-checkbox-item-input"></span>         
        </span>
        <span className="pg-checkbox-item-label">{this.props.label}</span>
        { this.props.children }
      </label>
    )
  }
}