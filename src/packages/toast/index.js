import Nerv from 'nervjs';

import Toast from './toast';

function createToast(props) {
  const div = document.createElement('div');
  let toast = document.getElementsByClassName('pg-toast-content')[0];
  if (toast) {
    toast.appendChild(div);
    document.body.appendChild(toast);
  } else {
    toast = document.createElement('div');
    toast.className = 'pg-toast-content';
    toast.appendChild(div);
    document.body.appendChild(toast);
  }
  toast.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    z-index: 999999;
    text-align: center;
    padding-top: 50px;
  `;
  // document.body.appendChild(div);
  if (props.lockScroll != false) {
    document.body.style.overflow = 'hidden';
  }
  const component = Nerv.createElement(Toast, Object.assign({}, props, {
    willUnmount: () => {
      Nerv.unmountComponentAtNode(div);
      toast.removeChild(div);
      if (toast.children.length === 0) {
        document.body.removeChild(toast);
      }
      document.body.style.overflow = '';
    }
  }));
  Nerv.render(component, div);
}

function getProps(message, delay, type) {
  let props = {};
  if (typeof message === 'object') {
    props = message;
  }
  props = Object.assign({
    message,
    type: type,
    delay,
  }, props);
  return createToast(props);
}

function info(message, delay) {
  return getProps(message, delay, 'info');
}

function success(message, delay) {
  return getProps(message, delay, 'success');
}

function warning(message, delay) {
  return getProps(message, delay, 'warning');
}

function error(message, delay) {
  return getProps(message, delay, 'error');
}

export default {
  info,
  success,
  warning,
  error,
};