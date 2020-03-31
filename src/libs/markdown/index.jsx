import Nerv from 'nervjs';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default class Markdown extends Nerv.Component {
  render() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: (code) => hljs.highlightAuto(code).value,
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    const html = marked(this.props.content);
    return (
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    )
  }
}