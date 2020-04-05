
import Nerv from 'nervjs';
import Markdown from '@/libs/markdown';

export default class Button extends Markdown {
  document() {
    return require('./button.md');
  }
}