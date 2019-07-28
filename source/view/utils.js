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
  viewportScaling,
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
  setViewport(${JSON.stringify(viewportScaling, null, 2)});
  runEditor(${JSON.stringify(settings, null, 2)}, ${
    autoUpdateInterval > 0 ? autoUpdateInterval : 0
  });
})();
`;
};
