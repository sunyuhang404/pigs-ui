
import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class TableBody extends Component {

  renderCell(header, item, index) {
    if (header.render) {
      return <div className="cell" style={{ textAlign: header.align || 'left'}}>{header.render(item, index)}</div>
    } else {
      return <div className="cell" style={{ textAlign: header.align || 'left'}}>{item[header.prop]}</div>
    }
  }

  render() {
    const { headers, data } = this.props.tableProps;
    return (
      <table>
        <colgroup align="center" valign="middle">
          {
            headers.map((item) => {
              return <col width={item.width ? item.width : ''} valign="middle" align={item.align ? item.align : 'center'}></col>
            })
          }
        </colgroup>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr>
                  {
                    headers.map((header) => {
                      return (
                        <td className={this.className('pg-table_column', item.className)}>
                          {this.renderCell(header, item, index)}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}