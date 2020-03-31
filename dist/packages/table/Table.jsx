
import Nerv from 'nervjs';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import './table.less';
import Component from '@/libs/component';

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableProps: {},
    };
  }

  getHeader() {
    if (!this.props.children || !this.props.children.length) {
      console.warn('column为空');
      return false;
    }
    const headers = [];
    this.props.children.forEach((item) => {
      headers.push(item.props);
    });
    const tableProps = { headers };
    return tableProps;
  }

  renderHeader() {
    if (!this.getHeader()) {
      return;
    }
    const tableProps = this.getHeader();
    return (
      <TableHeader tableProps={tableProps}></TableHeader>
    )
  }

  renderBody() {
    if (!this.getHeader()) {
      return;
    }
    const tableProps = this.getHeader();
    tableProps.data = this.props.data;
    if (tableProps.data && tableProps.data.length) {
      return (
        <TableBody tableProps={tableProps}></TableBody>
      )
    } else {
      return (<p>暂无数据</p>)
    }
  }

  render() {
    const { border } = this.props;
    return (
      <div className="pg-table" ref="pgTable">
        <div
          className={this.className('pg-table__header', {
            'pg-table__header-border': border
          })}>
            {this.renderHeader()}
        </div>
        <div
          className={this.className('pg-table__body', {
            'pg-table__body-border': border
          })}>
            {this.renderBody()}
        </div>
      </div>
    )
  }
}