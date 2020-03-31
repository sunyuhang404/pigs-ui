/**
 * 折叠面板
 */
import Nerv from 'nervjs';
import './collapse.less';

export default class Collapse extends Nerv.Component {
  static defaultProps = {
    defaultState: true
  };
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  componentDidMount() {
    this.setState({ isOpen: this.props.defaultState });
  }

  handleChange = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.props.onChange) this.props.onChange(this.state.isOpen);
    });
  }

  render() {
    const { className } = this.props;
    const { isOpen } = this.state;
    let openName = `collapse${isOpen ? '' : ' close'}`;
    let name = `${className ? `${openName} ${className}` : openName}`;
    return (
      <div className={name}>
        <div className="collapse-header" onClick={() => this.handleChange()}>
          {this.props.header}
        </div>
        {
          this.state.isOpen &&
          <div className="collapse-content">
            {this.props.children}
          </div>
        }
      </div>
    )
  }
}