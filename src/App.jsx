import Nerv from 'nervjs';
import './index.css';
import func from '@/util/func';
import Views from '@/layout/view';

export default class App extends Nerv.Component {
  constructor() {
    super();
    func();
  }

  render() {
    return (
      <div className="pg-content">
        <Views></Views>
      </div>
    );
  }
}
