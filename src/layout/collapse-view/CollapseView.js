
import Nerv from 'nervjs';
import './collapseView.less';

export default class CollapseView extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleShowCode = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  render() {
    const { className } = this.props;
    return (
      <div className={`pg-collapse-view ${className ? className : ''}`}>
        <div className="pg-collpase-content__box">
          {this.props.children}
        </div>
        {
          this.state.isOpen &&
          <div className="pg-collpase-content">
            {
              this.props.desc &&
              <div className="pg-collapse-code__desc">
                <div className="pg-collapse-code__content" dangerouslySetInnerHTML={{__html: this.props.desc}}></div>
              </div>
            }
            <pre className="pg-collapse-code__box">
              <code>{this.props.code}</code>
            </pre>
          </div>
        }
        <div className="pg-collapse-arrow" onClick={() => this.handleShowCode()}>
          <i className={`icon-arraw ${this.state.isOpen ? 'icon-open' : 'icon-close'}`}></i>
        </div>
      </div>
    )
  }
}