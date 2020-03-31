import Nerv from 'nervjs';
import Component from '@/libs/component';
import './radiobutton.less';

export default class RadioGroup extends Component {
  static defaultProps = {
    disabled: false,
    value: '',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
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

  onChange = (value, item) => {
    this.setState({ value: this.props.label ? item : value }, () => {
      this.forceUpdate();
      if (this.props.onChange) {
        this.props.onChange(this.props.label ? item : value, item);
      }
    });
  }

  getChildChecked = (child) => {
    if (this.props.label) {
      return this.state.value[this.props.label] === child.props.value
    } else {
      return this.state.value === child.props.value;
    }
  }

  render() {
    return (
      <div className={this.className('pg-radio-group', this.props.className)}>
        {
          Nerv.Children.map(this.props.children, child => {
            if (!child) {
              return null;
            }
            const { elementType } = child.type;
            if (elementType !== 'RadioButton' && elementType !== 'Radio') {
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