import Nerv from 'nervjs';
import Radio from './radio';

export default class RadioButton extends Radio {
  static elementType = 'RadioButton';

  render() {
    const { size } = this.parent().props;
    return (
      <label className={this.className('pg-radio-button', this.props.className, size ? `pg-radio-button__${size}` : '', {
        'is-disabled': this.isDisabled(),
        'is-active': this.props.checked
      })}>
        <input
          className="pg-radio-input"
          type="radio"
          value={ this.props.value }
          checked={ this.props.checked }
          name={ this.props.label }
          onChange={() => this.handleChange()}
        />
        <span className="pg-radio-button_label">{ this.props.label }</span>
      </label>
    )
  }
}