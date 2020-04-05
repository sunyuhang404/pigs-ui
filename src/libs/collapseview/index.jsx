
import Nerv from 'nervjs';
import React from 'react';
import ReactDOM from 'react-dom';
import './collapseView.less';
import { transform } from 'babel-standalone';

export default class CollapseView extends Nerv.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.infoId = `${parseInt(Math.random() * 1e9).toString(36)}`;
  }

  handleShowCode = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderDemoClass = () => {
    const value = this.props.demo.match(/```(.*)\n?([^]+)```/)[2];

    import('../../index').then(Element => {
      const args = ['context', 'React', 'ReactDOM', 'Nerv'];
      const argv = [this, React, ReactDOM, Nerv];
      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }
      return { args, argv };
    }).then(({ args, argv }) => {
      const code = transform(`
        class Demo extends Nerv.Component {
          ${value}
        }
        Nerv.render(<Demo {...context.props} />, document.getElementById('${this.infoId}'))
      `, { presets: ['es2015', 'react'] }
      ).code;
      args.push(code);
      new Function(...args).apply(null, argv);
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }
  
  render() {
    const { className } = this.props;
    this.renderDemoClass();
    return (
      <div className={`pg-collapse-view ${className ? className : ''}`}>
        <div className="pg-collpase-content__box">
          <div id={this.infoId}></div>
        </div>
        {
          this.state.isOpen &&
          <div className="pg-collpase-content">
            {
              this.props.desc &&
              <div className="pg-collapse-code__desc">
                <div className="pg-collapse-code__content" dangerouslySetInnerHTML={{__html: this.props.desc}}></div>
              </div>
            }
            <pre className="pg-collapse-code__box">
              <code>{this.props.code}</code>
            </pre>
          </div>
        }
        <div className="pg-collapse-arrow" onClick={() => this.handleShowCode()}>
          <i className={`icon-arraw ${this.state.isOpen ? 'icon-open' : 'icon-close'}`}></i>
        </div>
      </div>
    )
  }
}