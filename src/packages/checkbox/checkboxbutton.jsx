import Nerv from 'nervjs';
import './checkbox.less';
import Checkbox from './checkbox';

export default class CheckboxButton extends Checkbox {
  static elementType = 'CheckboxButton';

  render() {
    const checked = this.props.checked !== undefined ? this.props.checked : this.props.value;
    return (
      <div className={this.className('pg-checkbox-button', {
        'is-active': checked,
        'is-disabled': this.isDisabled(),
      })}>
        <span
          className="pg-checkbox-button_label"
          onClick={() => this.handleClick()}
        >
          { this.renderLabel() }
        </span>
        {
          Nerv.Children.toArray(this.props.children).length > 0 &&
          <div className="pg-checkbox-button_child">{ this.props.children }</div>
        }
      </div>
    )
  }
}