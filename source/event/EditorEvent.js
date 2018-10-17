export const EditorEvent = {
  INIT: 'initialize',
  HANDSHAKE: 'handshake',
  SET_VALUE: 'setValue',
  GET_VALUE: 'getValue',
  HISTORY_UNDO: 'historyUndo',
  HISTORY_REDO: 'historyRedo',
  HISTORY_CLEAR: 'historyClear',
  HISTORY_SIZE: 'historySize',
  WV_GLOBAL_ERROR: 'wvGlobalError',
  WV_LOG: 'wvLog',
  SCROLL_TO_CURSOR: 'scrollToCursor',
  UPDATE_SETTINGS: 'updateSettings',
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
