export const EditorEvent = {
  // ping from WebView to check if connection with RN component is alive
  INITIALIZE: 'initialize',

  // RN component responds to "initialize" event by sending init data, like content, history and settings
  HANDSHAKE: 'handshake',

  // WebView response to handshake, it says that all init data is applied and WebView is ready for communication
  INITIALIZED: 'initialized',

  // If autoUpdateInterval > 0, then WebView will send "autoUpdate" in intervals event after changes to Editor content made
  AUTO_UPDATE: 'autoUpdate',
  SET_VALUE: 'setValue',
  GET_VALUE: 'getValue',
  RESET_VALUE: 'resetValue',
  FOCUS: 'focus',
  GET_SELECTION: 'getSelection',
  REPLACE_SELECTION: 'replaceSelection',
  HISTORY_UNDO: 'historyUndo',
  HISTORY_REDO: 'historyRedo',
  HISTORY_CLEAR: 'historyClear',
  HISTORY_SIZE: 'historySize',

  // comes from WebView when global window.onerror handler was called
  WV_GLOBAL_ERROR: 'wvGlobalError',

  // comes from WebView when global window.log handler was called
  WV_LOG: 'wvLog',
  SCROLL_TO_CURSOR: 'scrollToCursor',
  UPDATE_SETTINGS: 'updateSettings',
  EXEC_COMMAND: 'execCommand',
};

export const EditorResponseEvent = {
  INIT_COMPLETE: 'initialized',
};

export const getResponseEvent = (eventType) => {
  switch (eventType) {
    case EditorEvent.HANDSHAKE: {
      return EditorResponseEvent.INIT_COMPLETE;
    }
    default:
      return `${eventType}Response`;
  }
};
