
import Nerv from 'nervjs';
import './input.less';
import Component from '@/libs/component';

export default class Input extends Component {
  static defaultProps = {
    value: '',
    placeholder: '请输入',
    prefix: '',
    suffix: '',
    disabled: false,
    icon: null,
    showClear: false
  };
  
  state = {
    isComposition: false,
  };

  formItem() {
    return this.context.formItem;
  }

  handleCompositionStart = () => this.state.isComposition = true

  handleCompositionEnd = (e) => {
    this.state.isComposition = false;
    this.handleChange(e);
  }

  handleChange = (e) => {
    if (this.state.isComposition) return;
    if (this.formItem()) this.formItem().handleChange();
    if (this.props.onChange) {
      this.props.onChange(e.target.value || e.data);
    }
  }

  handleFocus = (e) => {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e.target.value || '');
  }

  handleBlur = (e) => {
    if (this.formItem()) this.formItem().handleBlur();
    const { onBlur } = this.props;
    if (onBlur) onBlur(e.target.value || '');
  }

  handleKeyDown = (e) => {
    if (this.props.onKeyDown) this.props.onKeyDown(e.target.value || '');
  }

  handleClear = () => {
    if (this.props.onClear) this.props.onClear();
  }

  handleClickIcon = () => {
    if (this.props.onIconClick) this.props.onIconClick();
  }

  getInputStyle = (hasSuffix) => {
    return {
      display: hasSuffix ? 'inline-table' : 'block',
      borderColor: this.props.border
    };
  }
  
  render() {
    const { className, prefix, suffix, disabled, placeholder, autoFocus } = this.props;
    const hasSuffix = prefix !== '' || suffix !== ''
    return (
      <div className={this.className('pg-input', className)} style={this.getInputStyle(hasSuffix)}>
        {
          this.props.prefix !== '' &&
          <span className="pg-input-prefix" >{this.props.prefix}</span>
        }
        {
          (this.props.icon && typeof this.props.icon === 'string') &&
          <i className={this.props.icon} onClick={() => this.handleClickIcon()}></i>
        }
        {
          // (this.props.showClear && this.props.value !== '' && this.props.suffix === '') &&
          // <i onClick={(e) => this.handleClear(e)} className="pg-icon-circle-closer"></i>
        }
        <input
          ref={input => this.input = input}
          className={this.className('pg-input__inner', { 'clear': this.props.showClear, 'icon': this.props.icon })}
          type="pg-input"
          placeholder={placeholder}
          value={this.props.value}
          onCompositionstart={(e) => this.handleCompositionStart(e)}
          onCompositionend={(e) => this.handleCompositionEnd(e)}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(val) => this.handleKeyDown(val)}
          onBlur={(val) => this.handleBlur(val)}
          onFocus={(val) => this.handleFocus(val)}
          disabled={disabled}
          autoFocus={autoFocus}
          style={{ display: hasSuffix ? 'table-cell' : 'inline-block' }}
        />
        {
          this.props.suffix !== '' &&
          <span className="pg-input-suffix">{this.props.suffix}</span>
        }
      </div>
    )
  }
}
