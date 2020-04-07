import Nerv from 'nervjs';
import Component from '@/libs/component';
import './checkbox.less';

export default class CheckboxGroup extends Component {
  static defaultProps = {
    disabled: false,
    value: [],
    min: undefined,
    max: undefined,
  };

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || [],
    }
  }

  getChildContext() {
    return { component: this };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = (checked, value) => {
    if (checked) {
      if (this.props.max !== undefined) {
        (this.props.max > this.state.value.length) && this.state.value.push(value);
      } else {
        this.state.value.push(value);
      }
    } else {
      const index = this.state.value._findIndex(item => item === value);
      if (this.props.min !== undefined) {
        (this.state.value.length > this.props.min) && this.state.value.splice(index, 1)
      } else {
        index !== -1 && this.state.value.splice(index, 1);
      }
    }
    this.forceUpdate();
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    return (
      <div className={this.className('pg-checkbox-group', this.props.className)}>
        {
          Nerv.Children.map(this.props.children, child => {
            if (!child) {
              return null;
            }
            const { elementType } = child.type;
            if (elementType !== 'CheckboxButton' && elementType !== 'Checkbox') {
              return null;
            }
            return Nerv.cloneElement(child, {
              onChange: this.onChange,
              checked: this.state.value._findIndex(item => item === child.props.value) !== -1,
            })
          })
        }
      </div>
    )
  }
}