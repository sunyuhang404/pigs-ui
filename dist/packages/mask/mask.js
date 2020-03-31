import Nerv from 'nervjs';

export default class Mask extends Nerv.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }
  
  componentWillUnmount() {
    Nerv.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  _renderLayer() {
    Nerv.render(this.props.children, this.popup);
  }
  
  render() {
    return null;
  }
}