
import Nerv from 'nervjs';
// import './loadingViews.less';
import '../views.less';
import CollapseView from '@/layout/collapse-view/collapseView';
import Table from '@/packages/table/index';
import Loading from '@/packages/loading/index';
import Button from '@/packages/button/index';

export default class LoadingViews extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
        {
          parameter: 'loading',
          desc: '控制加载页显示',
          type: 'boolean',
          optionalValue: ' - ',
          defaultValue: ' false '
        },
        {
          parameter: 'fullScreen',
          desc: '是否全屏',
          type: 'boolean',
          optionalValue: ' - ',
          defaultValue: ' false '
        }
      ],
    };
  }
  renderNormal = () => {
    return {
      code: `
        render() {
          return (
            <div>
              <Loading loading={true}>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
                <p>asdfasdf</p>
              </Loading>
            </div>
          )
        }
      `,
      desc: `基础使用方法, 通过<code>loading</code>属性控制是否显示`,
    }
  }

  renderFullScreen = () => {
    return {
      code: `
        constructor(props) {
          super(props);
          this.state = {
            loading: false
          };
        }

        handleClick = () => {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.setState({ loading: false });
          }, 3000);
          this.setState({ loading: true });
        }

        render() {
          return (
            <div>
              <Button onClick={() => this.handleClick()} type="primary">整页加载, 3秒后消失</Button>
              <Loading loading={this.state.loading} fullScreen={true}></Loading>
            </div>
          )
        }
      `,
      desc: ``
    };
  }

  handleClick = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    this.setState({ loading: true });
  }
  
  render() {
    return (
      <div className="pg-view">
        <p className="title">Loading 加载</p>
        <p className="sub-title">加载数据的时候显示的效果.</p>

        <p className="title use-title">区域加载</p>
        <CollapseView code={this.renderNormal().code} desc={this.renderNormal().desc}>
          <Loading loading={true}>
            <p>asdfasdf</p>
            <p>asdfasdf</p>
            <p>asdfasdf</p>
            <p>asdfasdf</p>
          </Loading>
        </CollapseView>

        <p className="title use-title">整页显示</p>
        <CollapseView code={this.renderFullScreen().code} desc={this.renderFullScreen().desc}>
          <Button onClick={() => this.handleClick()} type="primary">整页加载, 3秒后消失</Button>
          <Loading loading={this.state.loading} fullScreen={true}></Loading>
        </CollapseView>

        <p className="title use-title">Loading Attributes</p>
        <Table data={this.state.data}>
          <Table.Column label="参数" prop="parameter"></Table.Column>
          <Table.Column label="说明" prop="desc"></Table.Column>
          <Table.Column label="类型" prop="type"></Table.Column>
          <Table.Column label="可选值" prop="optionalValue"></Table.Column>
          <Table.Column label="默认值" prop="defaultValue"></Table.Column>
        </Table>
      </div>
    )
  }
}