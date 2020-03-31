
import Nerv from 'nervjs';
import './table.less';
import Component from '@/libs/component';

export default class TableColumn extends Component {
  static defaultProps = {
    prop: undefined,
    width: undefined,
    align: 'left',
    className: undefined,
    render: null
  };
  render() {
    return (
      <div></div>
    )
  }
}