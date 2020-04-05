
import Nerv from 'nervjs';
import Markdown from '@/libs/markdown';

export default class Home extends Markdown {
  document() {
    return require('./homd.md');
  }
};
