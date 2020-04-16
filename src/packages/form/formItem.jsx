
import Nerv from 'nervjs';
import Component from '@/libs/component';
import AsyncValidator from 'async-validator';

export default class FormItem extends Component {
  static defaultProps = {
    labelWidth: 100,
    required: false,
  };

  state = {
    isError: false,
    errorText: '',
  };

  parent = () => {
    return this.context.component;
  }

  getChildContext() {
    return { formItem: this };
  }

  componentDidMount() {
    if (this.props.prop) {
      this.parent().addItem(this);
      this.initialValue = this.getInitialValue();
    }
  }

  componentWillUnmount() {
    this.parent().removeItem(this);
  }

  // 获取初始值
  getInitialValue = () => {
    const initialValue = this.parent().props.model[this.props.prop];
    if (initialValue === undefined) {
      return initialValue;
    }
    return JSON.parse(JSON.stringify(initialValue));
  }

  // 子组件会调用
  handleBlur = () => {
    this.validateField('blur');
  }
  handleChange = () => {
    this.validateField('change');
  }

  // 校验
  validateField = (trigger, callback) => {
    const rules = this.filterRules(trigger);
    if (!rules || !rules.length) {
      if (callback instanceof Function) {
        callback();
      }
      return true;
    }
    const params = { [this.props.prop]: rules };
    const model = { [this.props.prop]: this.parent().props.model[this.props.prop] };
    const validator = new AsyncValidator(params);

    validator.validate(model, { firstFields: true }, errors => {
      // erros 存在 校验就不通过，errors是null，校验通过
      this.setState({
        isError: errors !== null,
        errorText: errors ? errors[0].message : ''
      }, () => {
        if (callback instanceof Function) {
          callback(errors);
        }
      });
    });
  }

  // 重置
  resetField = () => {
    this.setState({ isError: false, errorText: '' });
    const value = this.parent().props.model[this.props.prop];
    if (Array.isArray(value) && value.length) {
      this.parent().props.model[this.props.prop] = [];
    } else if (value) {
      this.parent().props.model[this.props.prop] = this.initialValue;
      // this.forceUpdate();
    }
  }

  filterRules = (trigger) => {
    return this.getRules().filter(rule => {
      if (!rule.trigger || trigger === '') return true;
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(rule => Object.assign({}, rule));
  }

  getRules = () => {
    let parentRules = this.parent().props.rules;
    const currentRules = this.props.rules;
    if (this.props.prop && parentRules) {
      parentRules = parentRules[this.props.prop] ? [parentRules[this.props.prop]] : [];
    }
    return [].concat(currentRules || parentRules || []);
  }

  isRequire = () => {
    let required = false;
    const rules = this.getRules();
    if (rules && rules.length) {
      rules.every(rule => {
        if (rule.required) {
          required = true;
          return false;
        }
        return true;
      });
    }
    return required || this.props.required
  }

  getLabelStyle = () => {
    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;
    return { width: `${labelWidth}px` };
  }

  getContentStyle = () => {
    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;
    return { marginLeft: `${labelWidth}px` };
  }
  
  render() {
    return (
      <div
        className={this.className('pg-form-item', {
          'is-required': this.isRequire(),
          'is-error': this.state.isError,
        })}
      >
        <label className={this.className('pg-form-item__label')} style={this.getLabelStyle()}>{ this.props.label }</label>
        <div className={this.className('pg-form-item__content')} style={this.getContentStyle()}>
          { this.props.children }
          {
            this.state.isError &&
            <div className="pg-form-item__error">{this.state.errorText}</div>
          }
        </div>
      </div>
    )
  }
}
