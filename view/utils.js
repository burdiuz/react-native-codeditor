/**
 * @flow
 */

'use strict';
import bundleEditorModules from 'codemirror-package';

// includes Page HTML + CodeMirror styles + CodeMirror JS
const EDITOR_TEMPLATE = inject('../assets/editor.html.tpl');

const BASE_MODULES = ['lib'];

export const generateEditorHtml = (modules) => {
  const bundle = bundleEditorModules([
    ...BASE_MODULES,
    ...modules,
  ]);
  return EDITOR_TEMPLATE({
    js: bundle.js,
    css: bundle.css,
  });
};

const DEFAULT_SETTINGS = {
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  inputStyle: 'contenteditable',
  styleActiveLine: true,
  mode: 'jsx',
};

export const generateInitScript = (editorSettings) => {
  const settings = {
    ...DEFAULT_SETTINGS,
    ...editorSettings,
  };
  return `
(function () {
  runEditor(${JSON.stringify(settings, null, 2)});
})();
`
};
