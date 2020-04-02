import Nerv from 'nervjs';

export default class View extends Nerv.Component {
  render() {
    const classNames = [];
    const { visible = true, className = '', children } = this.props;
    const mixed = { style: { ...children.props.style } };
    if (!visible) mixed.style.display = 'none';
    if (children.props.className) classNames.push(children.props.className);
    if (className) classNames.push(className);
    mixed.className = classNames.join(' ');
    return Nerv.cloneElement(Nerv.Children.only(children), mixed);
  }
}
