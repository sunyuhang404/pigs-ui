
import Nerv from 'nervjs';
import './input.less';
import Component from '@/libs/component';

export default class Input extends Component {
  static defaultProps = {
    value: '',
    placeholder: '请输入',
    prefix: '',                     // 前缀
    suffix: '',                     // 后缀
    disabled: false,
    icon: null,
    showClear: false
  };
  constructor(props) {
    super(props);
    this.isComposition = false;
  }

  handleCompositionStart = () => this.isComposition = true;

  handleCompositionEnd = (e) => {
    this.isComposition = false;
    this.handleChange(e);
  }

  handleChange = (e) => {
    console.log(this.isComposition);
    if (this.isComposition) return;
    if (this.props.onChange) {
      this.props.onChange(e.target.value || e.data);
    }
  }

  handleFocus = (e) => {
    if (this.props.onFocus) this.props.onFocus(e.target.value || '');
  }

  handleBlur = (e) => {
    if (this.props.onBlur) this.props.onBlur(e.target.value || '');
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
  
  render() {
    const { className, prefix, suffix } = this.props;
    const hasSuffix = (prefix !== '' || suffix !== '') ? true : false;
    return (
      <div className={this.className('pg-input', className)} style={{ display: hasSuffix ? 'inline-table' : 'block', borderColor: this.props.border }}>
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
          className={this.className('pg-input__inner', { 'clear': this.props.showClear, 'icon': this.props.icon })}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onCompositionstart={(e) => this.handleCompositionStart(e)}
          onCompositionend={(e) => this.handleCompositionEnd(e)}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(val) => this.handleKeyDown(val)}
          onBlur={(val) => this.handleBlur(val)}
          onFocus={(val) => this.handleFocus(val)}
          disabled={this.props.disabled}
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