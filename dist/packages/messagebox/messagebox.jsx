import Nerv from 'nervjs';
import './messagebox.less';
import Component from '@/libs/component';
import Button from '../button';

export default class MessageBox extends Component {
  static defaultProps = {
    title: '提示',
    message: '内容'
  };
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  
  componentDidMount() {
    this.setState({ visible: true });
  }

  handleClick = (action) => {
    const { promise } = this.props;
    switch (action) {
      case 'confirm':
        promise.resolve();
        break;
      case 'cancel':
        promise.reject();
        break;
      default:
        break;
    }
    this.close();
  }

  close = () => {
    this.setState({ visible: false }, () => {
      this.props.willUnmount();
    });
  }

  render() {
    if (this.state.visible) {
      return (
        <div className="pg-messagebox">
          <div className="pg-messagebox-warpper"></div>
          <div className="pg-messagebox-box">
            <div className="pg-messagebox__title">
              <span>{this.props.title}</span>
              <img onClick={() => this.close()} className="pg-messagebox__close" src={require('../../assets/images/icon_close.png')} />
            </div>
            {
              this.props.modal === 'message' &&
              <div className="pg-messagebox__message">{this.props.message}</div>
            }
            {
              this.props.modal === 'msgbox' &&
              <div className="pg-messagebox__content">
                <p className="pg-messagebox__content_title">{this.props.message}</p>
                <p className="pg-messagebox__content_info">{this.props.content}</p>
              </div>
            }
            {
              this.props.modal === 'confirm' &&
              <div className="pg-messagebox__content">
                { this.props.render }
              </div>
            }
            <div className="pg-messagebox__btns">
              {
                this.props.showCancelButton &&
                <Button onClick={() => this.handleClick('cancel')}>取消</Button>
              }
              <Button onClick={() => this.handleClick('confirm')} type="primary">确定</Button>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
}