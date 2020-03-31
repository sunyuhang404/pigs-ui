import Nerv from 'nervjs';
import Component from '@/libs/component';
import './toast.less';

const IconInfo = require('../../assets/images/icon_info.png');
const IconSuccess = require('../../assets/images/icon_success.png');
const IconWarning = require('../../assets/images/icon_warn.png');
const IconError = require('../../assets/images/icon_error.png');

export default class Toast extends Component {
  static defaultProps = {
    delay: 3000,
  };
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  
  componentDidMount() {
    this.setState({ visible: true }, () => {
      this.startTimer();
    });
  }

  startTimer = () => {
    this.timer = setTimeout(() => {
      this.close();
      clearTimeout(this.timer);
      this.timer = null;
    }, this.props.delay);
  }

  close = () => {
    this.setState({ visible: false }, () => {
      this.props.willUnmount();
    });
  }

  getImagePath = () => {
    const imgList = {
      'info': IconInfo,
      'success': IconSuccess,
      'warning': IconWarning,
      'error': IconError,
    };
    return imgList[this.props.type]
  }
  
  render() {
    if (this.state.visible) {
      return (
        <div className={this.className('pg-toast-box', `pg-toast-${this.props.type}`)}>
          <div className="pg-toast">
            <img src={this.getImagePath()} />
            <span>{this.props.message}</span>
          </div>
        </div>
      )
    }
    return null;
  }
}