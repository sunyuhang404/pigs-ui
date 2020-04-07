import Nerv from 'nervjs';
import './checkbox.less';
import Checkbox from './checkbox';

export default class CheckboxButton extends Checkbox {
  static elementType = 'CheckboxButton';

  render() {
    const { size } = this.parent().props;
    const checked = this.props.checked !== undefined ? this.props.checked : this.props.value;
    return (
      <label className={this.className('pg-checkbox-button', this.props.className, size ? `pg-checkbox-button__${size}` : '', {
        'is-active': checked,
        'is-disabled': this.isDisabled(),
      })} for={this.props.label} key={this.props.key} onClick={() => this.handleClick()}>
        <input
          className="pg-checkbox-input"
          type="checkbox"
          value={this.props.value}
          checked={checked}
          name="pg-checkbox-item"
        />
        <span className="pg-checkbox-button_label">{this.renderLabel()}</span>
        {
          Nerv.Children.toArray(this.props.children).length > 0 &&
          <div className="pg-checkbox-button_child">{ this.props.children }</div>
        }
      </label>
    )
  }
}