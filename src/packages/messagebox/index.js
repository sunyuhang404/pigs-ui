import Nerv from 'nervjs';

import MessageBox from './messagebox';

function createMessage(props) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    div.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 999999;
    `;
    document.body.appendChild(div);
    if (props.lockScroll != false) {
      document.body.style.overflow = 'hidden';
    }
    const component = Nerv.createElement(MessageBox, Object.assign({}, props, {
      promise: { resolve, reject },
      willUnmount: () => {
        Nerv.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.setAttribute('style', '');
      }
    }));
    Nerv.render(component, div);
  });
}

function msgbox(title, message, content, props) {
  if (typeof title === 'object') {
    props = title;
  }
  props = Object.assign({
    title,
    message,
    content,
    modal: 'msgbox',
    showCancelButton: true
  }, props);
  return createMessage(props);
}

function message(title, message, props) {
  if (typeof title === 'object') {
    props = title;
  }
  props = Object.assign({
    title,
    message,
    modal: 'message',
    showCancelButton: true
  }, props);
  return createMessage(props);
}

function confirm(title, render, props) {
  if (typeof title === 'object') {
    props = title;
  }
  props = Object.assign({
    title,
    render,
    modal: 'confirm',
    showCancelButton: true
  }, props);
  return createMessage(props);
}


export default {
  confirm,
  message,
  msgbox,
};
