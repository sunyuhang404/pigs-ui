import Nerv from 'nervjs';

export default class Component extends Nerv.Component {
  className() {
    const params = [].slice.call(arguments, 0).filter(item => item !== undefined && item !== null);
    const nameList = [];
    params.forEach((item) => {
      if (typeof item === 'string') {
        nameList.push(item);
      } else {
        Object.keys(item).forEach((key) => {
          if (key && item[key]) {
            nameList.push(key);
          }
        });
      }
    });
    if (nameList.length) {
      return nameList.join(' ');
    } else {
      return '';
    }
  }

  getChildList = () => {
    let childList = [];
    if (this.props.children instanceof Array) {
      childList = this.props.children;
    } else {
      childList = [this.props.children];
    }
    return childList;
  }

  getDeepChildList = (child) => {
    let children = [];
    if (child instanceof Array) {
      children = child;
    } else {
      children = [child];
    }
    return children;
  }

  getCode = (str) => {
    return str.split('\n').map(item => item.trim()).join('\n').trim();
  }
}