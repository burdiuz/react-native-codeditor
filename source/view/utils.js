/* eslint-disable */
const DEFAULT_SETTINGS = {
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  inputStyle: 'contenteditable',
  styleActiveLine: true,
};

export const generateInitScript = (editorSettings, theme = '', autoUpdateInterval = 1000) => {
  const settings = {
    ...DEFAULT_SETTINGS,
    ...editorSettings,
  };

  if (theme) {
    settings.theme = theme;
  }

  return `
(function () {
  runEditor(${JSON.stringify(settings, null, 2)}, ${
    autoUpdateInterval > 0 ? autoUpdateInterval : 0
  });
})();
`;
};
