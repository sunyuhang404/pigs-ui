
import Nerv from 'nervjs';
import './form.less';
import Component from '@/libs/component';

export default class FormItem extends Component {
  static defaultProps = {
    labelWidth: '100px',
    required: false,
    index: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      required: props.required ? props.required : false,
      errorText: `请输入${props.label}`
    };
  }

  componentDidMount() {
    this.getRequired(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isReset) {
      this.getRequired(nextProps);
    } else {
      this.setState({ showError: false });
    }
  }

  getRequired = (props) => {
    const rules = props.rules;
    const required = props.required;
    if (required) {
      this.setState({ required: true, errorText: `请输入${props.label}` });
    } else if (rules && rules.required) {
      this.setState({ required: true, errorText: rules.message });
    } else {
      this.setState({ required: false });
    }
  }

  renderChildren = () => {
    return this.getChildList().map((child) => {
      return Nerv.cloneElement(child, {
        value: this.props.value,
        border: this.state.showError ? '#f56c6c' : null,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onInput: this.handleChange
      });
    });
  }

  handleChange = (e) => {
    this.props.onChange(
      e.list ? e.list : e,
      this.props.prop
    );
    if (e.target) {
      this.validate(e.target.value);
    } else {
      if (e.list) {
        this.validate(e.list);
      } else {
        this.validate
      }
    }
    this.validate(e.target ? e.target.value : e);
  }

  handleBlur = (e) => {
    if (Boolean(e)) this.validate(e);
  }

  // 校验
  validate = (value) => {
    if (this.state.required) {
      this.setState({ showError: value === '' ? true : false });
      this.emitValid(value === '' ? false : true);
    }
    const { rules, prop, index } = this.props;
    if (rules && rules.validator) {
      rules.validator(`${prop}${index ? `.${index}` : ''}`, value, (error) => {
        if (error && error !== '') {
          this.emitValid(false);
          this.setState({ showError: true, errorText: error });
        } else {
          this.emitValid(true);
          this.setState({ showError: false });
        }
      });
    }
  }

  // 通知父组件 校验状态
  emitValid = (val) => {
    this.props.onEmitValid(this.props.prop, val);
  }
  
  render() {
    return (
      <div className={this.className('pg-form-item', { 'is-required': this.state.required })}>
        <pre>{this.state.showError}</pre>
        <label className={this.className('pg-form-item__label')} style={{ width: this.props.labelWidth }}>{this.props.label}</label>
        <div className={this.className('pg-form-item__content')} style={{ marginLeft: this.props.labelWidth }}>
          {this.renderChildren()}
          {
            this.state.showError &&
            <div className="pg-form-item__error">{this.state.errorText}</div>
          }
        </div>
      </div>
    )
  }
}
