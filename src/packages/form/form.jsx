
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
  addItem(item) {
    this.state.items.push(item);
  }

  // 移除 FormItem
  removeItem(item) {
    if (item.props.prop) {
      this.state.items.splice(this.state.items._indexOf(item), 1);
    }
  }

  render() {
    return (
      <form className={this.className('pg-form', { 'pg-form--inline': this.props.inline })}>
        {/* { this.props.children } */}
        {
          Nerv.Children.map(this.props.children, (child, index) => {
            if (!child) {
              return null;
            }
            return Nerv.cloneElement(child, Object.assign(
              {},
              child.props,
              { key: `form-item-${index}` }
            ))
          })
        }
      </form>
    )
  }
}
// export default class Form extends Component {
//   static defaultProps = {
//     disabled: false,
//     value: [],
//     min: undefined,
//     max: undefined,
//   };

//   constructor(props) {
//     super(props)
//     this.state = {
//       value: props.value || [],
//     }
//   }

//   getChildContext() {
//     return { component: this };
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.value !== this.props.value) {
//       this.setState({ value: nextProps.value });
//     }
//   }

//   onChange = (checked, value) => {
//     if (checked) {
//       if (this.props.max !== undefined) {
//         (this.props.max > this.state.value.length) && this.state.value.push(value);
//       } else {
//         this.state.value.push(value);
//       }
//     } else {
//       const index = this.state.value._findIndex(item => item === value);
//       if (this.props.min !== undefined) {
//         (this.state.value.length > this.props.min) && this.state.value.splice(index, 1)
//       } else {
//         index !== -1 && this.state.value.splice(index, 1);
//       }
//     }
//     this.forceUpdate();
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }

//   render() {
//     return (
//       <div className={this.className('pg-checkbox-group', this.props.className)}>
//         { this.props.children }
//       </div>
//     )
//   }
// }