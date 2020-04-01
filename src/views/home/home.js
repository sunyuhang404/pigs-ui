
import Nerv from 'nervjs';
import Component from '@/libs/component';
import './home.less';

// import Markdown from '@/libs/markdown';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <div className="pg-home-view">
        <p className="title">安装</p>
        <p className="sub-title">推荐使用 npm 的方式安装，它能更好地和webpack打包工具配合使用</p>
        <pre className="content">
          <code>npm i pigs-ui --S</code>
        </pre>
        <p className="title">使用</p>
        <pre className="content">
          <code>
            {
              this.getCode(`
                import Nerv from 'nervjs';
                import {Button} from 'pigs-ui';
                Nerv.render(<Button type="primary">按钮</Button>, document.getElementById('app'))
              `)
            }
          </code>
        </pre>
        {/* <Markdown content={require('../button/button.md')} /> */}
      </div>
    )
  }
};
