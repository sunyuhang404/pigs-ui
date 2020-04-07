

import Nerv from 'nervjs';
import Markdown from '@/libs/markdown';


export default class InputViews extends Markdown {
  document() {
    return require('./radio.md');
  }
}