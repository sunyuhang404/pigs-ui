import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class Radio extends Component {
  static elementType = 'Radio';

  // 父组件实例, RadioGroup
  parent = () => {
    return this.context.component;
  }

  isDisabled = () => {
    return this.props.disabled || (this.parent() ? this.parent().props.disabled : false);
  }

  isIE8 = () => {
    return navigator.userAgent.includes('MSIE 8.0');
  }

  handleChange = () => {
    if (!this.isDisabled()) {
      this.props.onChange(this.props.value);
    }
  }

  renderIE8Content = () => {
    if (this.props.checked) {
      return (
        <input
          key="radiochecked"
          className="ie8-radio"
          onclick={() => this.handleChange(this.props.value)}
          id={ this.props.label }
          name={ this.props.label }
          value={ this.props.value }
          type="radio"
          disabled={ this.isDisabled() }
          checked
        /> 
      )
    }
    return (
      <input
        key="radionotchecked"
        onclick={() => this.handleChange()}
        id={ this.props.label }
        name={ this.props.label }
        value={ this.props.value }
        className="ie8-radio"
        type="radio"
        disabled={ this.isDisabled() }
      />
    )
  }

  render() {
    return (
      <label className={this.className('pg-radio-item', this.props.className, {
        'is-disabled': this.isDisabled(),
        'is-active': this.props.checked
      })}>
        {
          this.isIE8() ? this.renderIE8Content() : (
            <span>
              <input
                className="pg-radio-input"
                type="radio"
                value={ this.props.value }
                checked={ this.props.checked }
                name={ this.props.label }
                onChange={() => this.handleChange()} />
              <span className={this.className('pg-radio-item-input', { 'checked': this.props.checked })}></span>
            </span>
          )
        }
        <span className="pg-radio-item-label">{ this.props.label }</span>
        { this.props.children }
      </label>
    )
  }
}