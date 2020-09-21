import Nerv from 'nervjs';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/github.css';
import CollapseView from '@/libs/collapseview';


hljs.initHighlightingOnLoad();

const options = {
  gfm: true,
  tables: true, // 允许表格
  breaks: true, // 允许换行
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: (code) => hljs.highlightAuto(code).value,
};

export default class Markdown extends Nerv.Component {
  constructor(props) {
    super(props);

    this.components = new Map;
    this.renderer = new marked.Renderer();
    this.renderer.table = (header, body) => {
      return `<table class="pg-table"><thead>${ header }</thead><tbody>${ body }</tbody></table>`;
    };
  }

  componentDidMount() {
    this.rerenderDOM();
  }

  componentDidUpdate() {
    this.rerenderDOM();
  }

  rerenderDOM() {
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      if (div instanceof HTMLElement) {
        Nerv.render(component, div);
      }
    }
  }

  getHtml = (document) => {
    // 把 ':::demo' 开头的内容解析出来 并去掉 ':::demo' 循环解析的
    /**
     * match: 匹配的内容
     * p1:    去掉 :::demo 的内容
     */
    const html = marked(document.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
      const id = offset.toString(36);
      const sourceList = p1.match(/([^]*)\n?(```[^]+```)/);
      const props = {
        name: this.constructor.name,  // 获取组件类名
        desc: sourceList[1],          // 使用方式描述
        demo: sourceList[2],          // render 函数
        code: sourceList[2].match(/```(.*)\n?([^]+)```/)[2] // 
      };
      // 把解析出来的组件 存放到 Map 中, 以id 为 key
      this.components.set(
        id,
        Nerv.createElement(
          <CollapseView { ...props } />,
          Object.assign({ name: this.constructor.name.toLowerCase() }),
          p1
        )
      );
      return `<div id=${ id }></div>`;
    }), {
        renderer: this.renderer,
      ...options
    });
    return html;
  }

  render() {
    const document = this.document();
    if (typeof document === 'string') {
      this.components.clear();
      return <div dangerouslySetInnerHTML={{ __html: this.getHtml(document) }}></div>
    }
    return <span />
  }
}