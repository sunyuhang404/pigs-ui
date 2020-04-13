
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
      items: [],
    };
  }

  getChildContext() {
    return { component: this };
  }

  // 添加 FormItem
  addItem = (item) => {
    this.state.items.push(item);
  }

  // 移除 FormItem
  removeItem = (item) => {
    if (item.props.prop) {
      this.state.items.splice(this.state.items._indexOf(item), 1);
    }
  }

  // 校验所有的 FormItem
  validate = (callback) => {
    if (!this.state.items.length && callback) {
      callback(true);
    }
    let current = 0;
    const errorList = [];
    this.state.items.forEach(item => {
      item.validateField('', errors => {
        errorList.push(errors);
        if (typeof callback === 'function' && ++current === this.state.items.length) {
          callback(errorList.every(item => item === null));
        }
      });
    });
  }

  // 重置校验状态
  resetFields = () => {
    this.state.items.forEach(item => item.resetField());
    console.log(this.props.model);
  }

  render() {
    return (
      <form
        className={this.className('pg-form', { 'pg-form--inline': this.props.inline })}
        onSubmit={this.props.onSubmit}
      >
        { this.props.children }
      </form>
    )
  }
}
