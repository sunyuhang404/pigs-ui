
import Nerv from 'nervjs';
import Component from '@/libs/component';
import './select.less';

import Input from '@/packages/input/index';

export default class Select extends Component {
  render() {
    return (
      <div className={this.className('pg-select')}>
        <Input></Input>
      </div>
    )
  }
}
