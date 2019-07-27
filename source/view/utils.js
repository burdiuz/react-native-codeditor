/* eslint-disable */
const DEFAULT_SETTINGS = {
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  inputStyle: 'contenteditable',
  styleActiveLine: true,
};

export const generateInitScript = (
  editorSettings = {},
  theme,
  content,
  autoUpdateInterval = 1000,
) => {
  const settings = {
    ...DEFAULT_SETTINGS,
    ...editorSettings,
    theme,
    value: content,
  };

  return `
(function () {
  runEditor(${JSON.stringify(settings, null, 2)}, ${
    autoUpdateInterval > 0 ? autoUpdateInterval : 0
  });
})();
`;
};
