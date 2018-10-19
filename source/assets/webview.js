import { Editor } from '@actualwave/codemirror-package';
import webviewBundle from './webview_bundle.json';

const HTML_JS_MARK = '/*#${rn-webview-editor-js}#*/'; // eslint-disable-line no-template-curly-in-string

const HTML_CSS_MARK = '/*#${rn-webview-editor-css}#*/'; // eslint-disable-line no-template-curly-in-string

export const getWebViewHtml = () => webviewBundle['editor.html'];

const stringReplaceMark = (string, mark, content) => {
  const index = string.indexOf(mark);

  return string.substr(0, index) + content + mark + string.substr(index + mark.length);
};

export const appendJsToWebViewHtml = (html, js) => stringReplaceMark(html, HTML_JS_MARK, js);
// html.replace(HTML_JS_MARK, `${js}\n${HTML_JS_MARK}`);

export const appendCssToWebViewHtml = (html, css) => stringReplaceMark(html, HTML_CSS_MARK, css);
// html.replace(HTML_CSS_MARK, `${css}\n${HTML_CSS_MARK}`);

class WebViewEditor extends Editor {
  constructor(theme, modules) {
    super(true, theme, modules);
  }

  toString() {
    const { js, css } = this.bundle();

    // add editor, theme and all modules
    const html = appendCssToWebViewHtml(appendJsToWebViewHtml(getWebViewHtml(), js), css);

    // add communication layer
    return appendJsToWebViewHtml(
      html,
      `${webviewBundle['messageport-dispatcher.min.js']}\n${webviewBundle['initscript.js']}`,
    );
  }
}

export default WebViewEditor;
