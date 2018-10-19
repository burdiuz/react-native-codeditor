import PropTypes from 'prop-types';
import BaseEditorView from './BaseEditorView';
import { EditorEvent, getResponseEvent } from '../event/EditorEvent';

class CodeEditor extends BaseEditorView {
  static propTypes = {
    ...BaseEditorView.propTypes,
    onContentUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...BaseEditorView.defaultProps,
  };

  currentContent = '';

  componentWillMount() {
    const { settings, modules } = this.props;

    // FIXME Add a way to reset theme and modules, cache resulting string to not re-generate HTML
    this.editor.modules = modules;

    this.sendUpdatedSettings(settings);
  }

  componentWillReceiveProps(props) {
    const { content, settings } = props;

    super.componentWillReceiveProps(props);

    this.sendUpdatedContent(content);
    this.sendUpdatedSettings(settings);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initialized !== nextState.initialized;
  }

  onWebViewInitialized(api) {
    super.onWebViewInitialized(api);

    this.sendUpdatedContent(this.props.content);
    this.sendUpdatedSettings(this.props.settings);

    this.api.addEventListener(getResponseEvent(EditorEvent.GET_VALUE), this.onGetValueResponse);
    this.api.addEventListener(EditorEvent.AUTO_UPDATE, this.onGetValueResponse);
  }

  onInitialize(content = '') {
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
      this.api.setValue(content);

      if (force) {
        this.api.historyClear();
      }

      this.currentContent = content;
    }
  }

  sendUpdatedSettings(settings) {
    if (this.state.initialized) {
      this.api.updateSettings(settings);
    }
  }
}

export default CodeEditor;
