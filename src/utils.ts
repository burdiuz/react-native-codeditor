import type { ViewportSettings } from './EditorRequests';

const DEFAULT_SETTINGS = {
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  inputStyle: 'contenteditable',
  styleActiveLine: true,
  autofocus: true,
};

export const generateInitScript = (
  editorSettings: Record<string, unknown> = {},
  theme: string | undefined,
  content: string | undefined,
  viewportScaling: ViewportSettings | undefined,
  autoUpdateInterval = 1000,
): string => {
  const settings = {
    ...DEFAULT_SETTINGS,
    ...editorSettings,
    theme,
    value: content,
  };

  return `
(function () {
  setViewport(${JSON.stringify(viewportScaling, null, 2)});
  runEditor(${JSON.stringify(settings, null, 2)}, ${autoUpdateInterval > 0 ? autoUpdateInterval : 0});
})();
`;
};
