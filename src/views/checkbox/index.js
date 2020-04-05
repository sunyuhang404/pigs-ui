
import Nerv from 'nervjs';
import Markdown from '@/libs/markdown';

export default class Checkbox extends Markdown {
  document() {
    return require('./checkbox.md');
  }
}