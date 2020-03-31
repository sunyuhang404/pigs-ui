import Nerv from 'nervjs';

export default class View extends Nerv.Component {
  componentDidUpdate() {
    console.log(111);
    if (this.props.visible) {
      this.viewShow();
    } else {
      this.viewHide();
    }
  }

  componentWillUnmount() {
    this.viewHide();
  }

  viewShow() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this._renderLayer();
  }

  viewHide() {
    if (this.popup) {
      Nerv.unmountComponentAtNode(this.popup);
      document.body.removeChild(this.popup);
      this.popup = null;
    }
  }

  _renderLayer() {
    Nerv.render(this.props.children, this.popup);
  }

  render() {
    return null;
  }
}
