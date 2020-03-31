import Nerv from 'nervjs';
import Component from '@/libs/component';
import './loading.less';

export default class Loading extends Component {
  static defaultProps = {
    loading: false,
    fullScreen: false
  }
  componentDidMount() {
    if (this.props.fullScreen) {
      this.enableScroll(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreen) {
      this.enableScroll(true);
    }
  }

  componentWillUnmount() {
    this.enableScroll(false);
  }

  documentBody = () => {
    return document.body;
  }

  enableScroll = (flag) => {
    const documentBody = this.documentBody();
    if (documentBody) {
      if (flag) {
        documentBody.style.setProperty('overflow', 'hidden');
      } else {
        documentBody.style.removeProperty('overflow');
      }
    }
  }
  render() {
    const { loading, fullScreen } = this.props;
    return (
      <div className={this.className('pg-loading')}>
        {
          loading &&
          <div className={this.className('pg-loading__spinner', { 'is-full-screen': fullScreen })}>
            <div className="pg-loading__boder"></div>
            <div className="pg-loading__inner"></div>
            <div className="pg-loading__text">loading</div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}