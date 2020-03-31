import Vue from 'vue';


let id = 0;

const createElm = function() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

/**
 * 创建一个测试组件实例
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};