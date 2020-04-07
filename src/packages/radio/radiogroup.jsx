import Nerv from 'nervjs';
import Component from '@/libs/component';
import './radio.less';

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

  onChange = (value) => {
    this.setState({ value: value }, () => {
      this.forceUpdate();
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  }

  render() {
    return (
      <div className={this.className('pg-radio-group', this.props.className)}>
        {
          Nerv.Children.map(this.props.children, (child, index) => {
            if (!child) {
              return null;
            }
            const { elementType } = child.type;
            if (elementType !== 'RadioButton' && elementType !== 'Radio') {
              return null;
            }
            return Nerv.cloneElement(child, Object.assign(
              {},
              child.props,
              {
                key: `radio-item-${index}`,
                onChange: this.onChange,
                checked: this.state.value === child.props.value,
              }
            ))
          })
        }
      </div>
    )
  }
}