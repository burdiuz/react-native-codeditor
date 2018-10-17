import { Editor } from '@actualwave/codemirror-package';
import webviewBundle from './webview_bundle.json';

const HTML_JS_MARK = '/*${js}*/'; // eslint-disable-line no-template-curly-in-string

const HTML_CSS_MARK = '/*${css}*/'; // eslint-disable-line no-template-curly-in-string

export const getWebViewHtml = () => webviewBundle['editor.html'];

export const appendJsToWebViewHtml = (html, js) =>
  html.replace(HTML_JS_MARK, `${js}\n${HTML_JS_MARK}`);

export const appendCssToWebViewHtml = (html, css) =>
  html.replace(HTML_CSS_MARK, `${css}\n${HTML_CSS_MARK}`);

class WebViewEditor extends Editor {
  constructor(theme, modules) {
    super(true, theme, modules);
  }

  toString() {
    const { js, css } = this.bundle();

    return appendCssToWebViewHtml(appendJsToWebViewHtml(getWebViewHtml(), js), css);
  }
}

export default WebViewEditor;
