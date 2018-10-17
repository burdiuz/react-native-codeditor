/* eslint-disable */
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
