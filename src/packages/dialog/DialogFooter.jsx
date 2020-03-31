import Nerv from 'nervjs';
import Component from '@/libs/component';

export default class DialogFooter extends Component {
  static elementType = 'DialogFooter';
  render() {
    <div className={this.className('pg-dialog__footer')}>
      {this.props.children}
    </div>
  }
}