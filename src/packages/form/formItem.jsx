
import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class FormItem extends Component {
  static defaultProps = {
    labelWidth: '100px',
    required: false,
  };

  parent = () => {
    return this.context.component;
  }

  componentDidMount() {
    this.parent().addItem(this);
  }

  componentWillUnmount() {
    this.parent().removeItem(this);
  }

  handleBlur = (val) => {
    console.log(val);
  }
  handleChange = (val) => {}
  
  render() {
    console.log(this.props);
    // pg-form-item__label
    return (
      <div className={this.className('pg-form-item')}
        onBlur={(val) => this.handleBlur(val)}
        onChange={(val) => this.handleChange(val)}
      >

        {
          this.props.children
        }
      </div>
    )
  }
}
