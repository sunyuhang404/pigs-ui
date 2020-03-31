import Nerv from 'nervjs';
import Component from '@/libs/component';
import './checkbox.less';

export default class CheckboxGroup extends Component {
  static defaultProps = {
    disabled: false,
    value: [],
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

  onChange = (value, checked, item) => {
    const index = this.state.value._findIndex(item => {
      if (this.props.label) {
        return item[this.props.label] === value;
      } else {
        return item === value;
      }
    });
    if (checked) {
      if (index === -1) {
        this.state.value.push(this.props.label ? item : value);
      }
    } else {
      this.state.value.splice(index, 1);
    }
    this.forceUpdate();
    if (this.props.onChange) {
      this.props.onChange({
        list: this.state.value,
        current: item,
        checked
      });
    }
  }

  getChildChecked = (child) => {
    return this.state.value._find(item => {
      if (this.props.label) {
        return item[this.props.label] === child.props.value;
      } else {
        return item === child.props.value;
      }
    });
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
              checked: this.getChildChecked(child),
            })
          })
        }
      </div>
    )
  }
}