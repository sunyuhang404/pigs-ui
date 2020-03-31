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
      const value = this.props.value ? this.props.value : (this.props.value === 0 ? 0 : this.props.label);
      this.props.onChange(value, this.props.item);
    }
  }

  renderIE8Content = () => {
    return (
      this.props.checked ? 
      <input
        key="radiochecked"
        onclick={() => {this.handleChange(value)}}
        id={this.props.label}
        className="ie8-radio"
        type="radio"
        value={this.props.value}
        disabled={this.props.disabled}
        checked
        name={this.props.label} /> : 
        <input
          key="radionotchecked"
          onclick={() => {this.handleChange()}}
          id={this.props.label}
          className="ie8-radio"
          type="radio"
          disabled={this.props.disabled}
          value={this.props.value} 
          name={this.props.label}/>
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
                value={this.props.value}
                checked={this.props.checked}
                name={this.props.label}
                onChange={() => this.handleChange()} />
              <span className={this.className('pg-radio-item-input', {'checked': this.props.checked})}></span>
            </span>
          )
        }
        <span className="pg-radio-item-label">{ this.props.label }</span>
        { this.props.children }
      </label>
    )
  }
}