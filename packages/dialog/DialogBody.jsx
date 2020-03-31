import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class DialogBody extends Component {
  render() {
    <div className={this.className('pg-dialog__body')}>
      {this.props.children}
    </div>
  }
}