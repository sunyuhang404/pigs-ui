
import Nerv from 'nervjs';
import Component from '@/libs/component';
import './home.less';

import Markdown from '@/libs/markdown';

import Switch from '@/packages/switch';
import Button from '@/packages/button';
import Toast from '@/packages/toast';
import MessageBox from '@/packages/messagebox';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  
  install = () => {
    let str = `
      import Nerv from 'nervjs';
      import {Button} from 'pigs-ui';
      Nerv.render(<Button type="primary">按钮</Button>, document.getElementById('app'))
    `;
    return str.split('\n').map(item => item.trim()).join('\n');
  }

  switchChange = (val) => {
    console.log(val)
    this.setState({ checked: val });
  }

  handleClick = () => {
    // Toast.info('asdf', 1000);
    MessageBox.msgbox('title', 'content', 'content2').then(() => {
      console.log('confirm');
    }).catch(() => {
      console.log('cancel');
    })
  }

  render() {
    return (
      <div className="pg-home-view">
        <p className="title">安装</p>
        <p className="sub-title">推荐使用 npm 的方式安装，它能更好地和webpack打包工具配合使用</p>
        <pre className="content">
          <code>npm i pigs-ui --S</code>
        </pre>

        <Switch value={this.state.checked} onChange={(val) => this.switchChange(val)}></Switch>

        <Button onClick={() => this.handleClick()}>test</Button>

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
