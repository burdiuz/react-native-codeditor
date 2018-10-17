import PropTypes from 'prop-types';
import { generateInitScript } from './utils';
import BaseEditorView from './BaseEditorView';
import { EditorEvent, EditorResponseEvent } from '../event/EditorEvent';

class CodeEditor extends BaseEditorView {
  static propTypes = {
    ...BaseEditorView.propTypes,
    onInitialized: PropTypes.func.isRequired,
    onContentUpdate: PropTypes.func.isRequired,
    onHistorySizeUpdate: PropTypes.func.isRequired,
    modules: PropTypes.arrayOf(PropTypes.string),
    settings: PropTypes.shape({}),
    content: PropTypes.string,
  };
  static defaultProps = {
    modules: [],
    settings: {},
    ...BaseEditorView.defaultProps,
    content: '',
  };

  currentContent = '';

  componentWillMount() {
    const { settings } = this.props;
    this.sendUpdatedSettings(settings);
  }

  componentWillReceiveProps({ content, settings }) {
    this.sendUpdatedContent(content);
    this.sendUpdatedSettings(settings);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initialized !== nextState.initialized;
  }

  initializeWebView() {
    super.initializeWebView();
    this.dispatcher.addEventListener(
      EditorResponseEvent.GET_VALUE_RESPONSE,
      this.onGetValueResponse,
    );
  }

  readMessageMetaData(meta) {
    super.readMessageMetaData(meta);
    const { historySize } = meta;
    const { onHistorySizeUpdate } = this.props;
    if (historySize && onHistorySizeUpdate) {
      onHistorySizeUpdate(historySize);
    }
  }

  onInitialize(content = '') {
    console.log(' SUP onInitialize');
    this.currentContent = content || this.props.content;
    super.onInitialize(this.currentContent);
  }

  onGetValueResponse = (event) => {
    const content = event.data;
    this.currentContent = content;
    this.props.onContentUpdate(content);
  };

  sendUpdatedContent(content, force = false) {
    if (force || (this.state.initialized && this.currentContent !== content)) {
      this.dispatcher.dispatchEvent(EditorEvent.SET_VALUE, content);

      if (force) {
        this.dispatcher.dispatchEvent(EditorEvent.HISTORY_CLEAR);
      }

      this.currentContent = content;
    }
  }

  sendUpdatedSettings(props) {
    if (this.state.initialized) {
      this.dispatcher.dispatchEvent(EditorEvent.UPDATE_SETTINGS, props);
    }
  }

  get editorBaseUrl() {
    return 'http://actualwave.com/';
  }

  get editorStartSequence() {
    const script = generateInitScript(this.props.settings);
    return script;
  }
}

export default CodeEditor;
