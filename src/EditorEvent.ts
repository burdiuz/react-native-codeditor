export const EditorEvent = {
  INITIALIZE: 'initialize',
  HANDSHAKE: 'handshake',
  INITIALIZED: 'initialized',
  AUTO_UPDATE: 'autoUpdate',
  SET_VIEWPORT: 'setViewport',
  SET_OPTION: 'setOption',
  GET_OPTION: 'getOption',
  SET_VALUE: 'setValue',
  GET_VALUE: 'getValue',
  RESET_VALUE: 'resetValue',
  FOCUS: 'focus',
  GET_CURSOR: 'getCursor',
  SET_CURSOR: 'setCursor',
  GET_SELECTION: 'getSelection',
  SET_SELECTION: 'setSelection',
  REPLACE_SELECTION: 'replaceSelection',
  CANCEL_SELECTION: 'cancelSelection',
  HISTORY_READ: 'historyRead',
  HISTORY_WRITE: 'historyWrite',
  HISTORY_UNDO: 'historyUndo',
  HISTORY_REDO: 'historyRedo',
  HISTORY_CLEAR: 'historyClear',
  HISTORY_SIZE: 'historySize',
  WV_GLOBAL_ERROR: 'wvGlobalError',
  WV_LOG: 'wvLog',
  SCROLL_TO_CURSOR: 'scrollToCursor',
  UPDATE_SETTINGS: 'updateSettings',
  EXEC_COMMAND: 'execCommand',
} as const;

export const EditorResponseEvent = {
  INIT_COMPLETE: 'initialized',
} as const;

export const getResponseEvent = (eventType: string): string => {
  if (eventType === EditorEvent.HANDSHAKE) {
    return EditorResponseEvent.INIT_COMPLETE;
  }
  return `${eventType}Response`;
};
