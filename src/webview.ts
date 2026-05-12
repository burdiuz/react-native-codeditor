import webviewBundle from './assets/webview_bundle.json';

const CM_VERSION = '5.65.16';
const CM_CDN = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CM_VERSION}`;

class WebViewEditor {
  private theme: string | undefined;
  private modules: string[];

  constructor(theme: string | undefined, modules: string[]) {
    this.theme = theme;
    this.modules = modules;
  }

  setTheme(theme: string | undefined) {
    this.theme = theme;
  }

  resetModules(modules: string[]) {
    this.modules = modules;
  }

  toString(): string {
    const { theme, modules } = this;

    const cssLinks = [
      `<link rel="stylesheet" href="${CM_CDN}/codemirror.min.css">`,
      `<link rel="stylesheet" href="${CM_CDN}/addon/fold/foldgutter.min.css">`,
      ...(theme ? [`<link rel="stylesheet" href="${CM_CDN}/theme/${theme}.min.css">`] : []),
    ]
      .map((l) => `    ${l}`)
      .join('\n');

    const moduleScripts = modules
      .map((m) => `    <script src="${CM_CDN}/${m}.min.js"></script>`)
      .join('\n');

    const inlineScripts = [
      `    <script>${webviewBundle['messageport-dispatcher.min.js']}</script>`,
      `    <script>${webviewBundle['initscript.js']}</script>`,
    ].join('\n');

    let html = webviewBundle['editor.html'];
    html = html.replace('</head>', `${cssLinks}\n</head>`);
    html = html.replace(
      '</body>',
      `    <script src="${CM_CDN}/codemirror.min.js"></script>\n${moduleScripts}\n${inlineScripts}\n</body>`,
    );

    return html;
  }
}

export default WebViewEditor;
