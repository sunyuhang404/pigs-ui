import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class TableHeader extends Component {
  render() {
    return (
      <table>
        <colgroup align="center" valign="middle">
          {
            this.props.tableProps.headers.map((item) => {
              return <col width={item.width ? item.width : ''} valign="middle" align={item.align ? item.align : 'center'}></col>
            })
          }
        </colgroup>
        <thead>
          {
            this.props.tableProps.headers.map((item) => {
              return (
                <th className={this.className('pg-table_column', item.className)}>
                  <div className="cell" style={{ textAlign: item.align || 'left'}}>{item.label}</div>
                </th>
              )
            })
          }
        </thead>
      </table>
    )
  }
}