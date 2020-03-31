
import Nerv from 'nervjs';
import Component from '@/libs/component';
import './form.less';

export default class Form extends Component {
  static defaultProps = {
    model: {},
    inline: false,
    labelWidth: '100px'
  };

  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      validate: {},
      isReset: false,
    };
  }

  componentDidMount() {
    const validate = this.state.validate;
    Object.keys(this.state.model).forEach(key => validate[key] = false);
    this.setState({ validate });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ model: nextProps.model });
  }

  getFields = () => {
    return this.state.model;
  }

  // 循环判断Item校验是否通过
  validator = (callback) => {
    const res = Object.keys(this.state.validate).every(key => this.state.validate[key] !== false);
    callback(res);
  }

  resetField = () => {
    const model = this.state.model;
    Object.keys(model).forEach(key => {
      if (typeof model[key] === 'string') {
        model[key] = '';
      }
      if (model[key] instanceof Array) {
        model[key] = [];
      }
    });
    this.setState({ isReset: true, model });
  }

  handleComponentValid = (prop, val) => {
    const validate = this.state.validate;
    validate[prop] = val;
    this.setState({ validate, isReset: false });
  }

  handleChange = (e, key) => {
    const model = this.state.model;
    model[key] = e.target ? e.target.value : e;
    this.setState({ model });
  }

  renderChildren = () => {
    return this.getChildList().map((child) => {
      return Nerv.cloneElement(child, {
        labelWidth: this.props.labelWidth,
        isReset: this.state.isReset,
        value: this.props.model[child.props.prop],
        rules: this.props.rules[child.props.prop],
        onChange: this.handleChange,
        onEmitValid: this.handleComponentValid,
      });
    });
  }

  render() {
    return (
      <form className={this.className('pg-form', { 'inline': this.props.inline })}>
        {this.renderChildren()}
      </form>
    )
  }
}