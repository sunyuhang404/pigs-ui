
import Home from '@/views/home/home';
import Input from '@/views/input';
import Button from '@/views/button';
import Checkbox from '@/views/checkbox';
import Radio from '@/views/radio';
import Form from '@/views/form';
import Select from '@/views/select';
import Loading from '@/views/loading';
import Dialog from '@/views/dialog';
import Popover from '@/views/popover';
import Icon from '@/views/icon';


const routers = [
  {
    path: '/',
    name: '快速上手',
    exact: true,
    component: Home,
  },
  {
    path: '/input',
    name: 'Input 输入框',
    exact: false,
    component: Input,
  },
  {
    path: '/button',
    name: 'Button 按钮',
    exact: false,
    component: Button,
  },
  {
    path: '/checkbox',
    name: 'Checkbox 多选框',
    exact: false,
    component: Checkbox,
  },
  {
    path: '/radio',
    name: 'Radio 单选框',
    exact: false,
    component: Radio,
  },
  {
    path: '/form',
    name: 'Form 表单（未完成）',
    exact: false,
    component: Form,
  },
  {
    path: '/select',
    name: 'Select 选择器（未完成）',
    exact: false,
    component: Select,
  },
  {
    path: '/loading',
    name: 'Loading 加载',
    exact: false,
    component: Loading,
  },
  {
    path: '/dialog',
    name: 'Dialog 对话框',
    exact: false,
    component: Dialog,
  },
  {
    path: '/popover',
    name: 'Popover 弹出框',
    exact: false,
    component: Popover,
  },
  {
    path: '/icon',
    name: 'Icon 字体',
    exact: false,
    component: Icon,
  },
];

export default routers;
