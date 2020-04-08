import Nerv from 'nervjs';
import './index.less';
import func from '@/util/func';
import menu from '@/menu';

export default class App extends Nerv.Component {
  constructor() {
    super();
    this.state = { current: '' };
    func();
  }

  componentDidMount() {
    this.setState({ current: menu[0] });
    // this.setState({ current: menu.find(item => item.path.includes('form')) });
  }

  handleMenuItemClick = (item) => {
    this.setState({ current: item });
  }
  
  render() {
    const Com = this.state.current.component;
    return (
      <div className="pg-content">
        <div className="pg-views">
          <div className="pg-views-top-menu">
            <i className="pg-views-icon"></i>
            <p>PigS-UI</p>
          </div>
          <div className="pg-content-info">
            <div className="pg-component-menu">
              {
                menu.map((item, index) => {
                  return (
                    <div
                      key={`nerv-ui-menu__${index}`}
                      className={`pg-component-menu__item ${this.state.current.path === item.path ? 'active' : ''}`}
                      onClick={() => this.handleMenuItemClick(item)}
                    >
                      { item.name}
                    </div>
                  )
                })
              }
            </div>
            <div className="pg-views-router">
              <div className="pg-router-view">
                { Com ? <Com /> : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
