import PropTypes from 'prop-types';
import BaseEditorView from './BaseEditorView';
import { EditorEvent, getResponseEvent } from '../event/EditorEvent';

class CodeEditor extends BaseEditorView {
  static propTypes = {
    ...BaseEditorView.propTypes,
    onContentUpdate: PropTypes.func.isRequired,
    forceUpdates: PropTypes.bool,
  };

  static defaultProps = {
    ...BaseEditorView.defaultProps,
    forceUpdates: false,
  };

  currentContent = this.props.content;

  componentDidMount() {
    const { settings, modules, theme } = this.props;

    this.editor.setTheme(theme);
    this.editor.resetModules(modules);

    this.sendUpdatedSettings(settings);
  }

  componentDidUpdate(oldProps) {
    const {
      content: oldContent,
      modules: oldModules,
      theme: oldTheme,
      settings: oldSettings,
      viewport: oldViewport,
    } = oldProps;
    const { content, theme, modules, settings, viewport } = this.props;

    if (oldTheme !== theme || oldModules !== modules) {
      this.updateEditorHtml();
      this.updateInitScript();
    }

    if (oldContent !== content) {
      this.sendUpdatedContent(content);
    }

    if (oldSettings !== settings) {
      this.sendUpdatedSettings(settings);
    }

    if (oldViewport !== viewport) {
      this.sendUpdatedViewport(viewport);
    }
  }

  shouldComponentUpdate(
    { settings, modules, theme, viewport },
    { initialized, source, initScript },
  ) {
    return (
      this.state.initialized !== initialized ||
      this.props.settings !== settings ||
      this.props.viewport !== viewport ||
      this.props.modules !== modules ||
      this.state.theme !== theme
    );
  }

  onWebViewInitialized(api) {
    const { forceUpdates, viewport, settings, content } = this.props;
    super.onWebViewInitialized(api);

    if (forceUpdates) {
      this.sendUpdatedViewport(viewport);
      this.sendUpdatedSettings(settings);
      this.sendUpdatedContent(this.currentContent, true);
    }

    this.api.addEventListener(getResponseEvent(EditorEvent.GET_VALUE), this.onGetValueResponse);
    this.api.addEventListener(EditorEvent.AUTO_UPDATE, this.onGetValueResponse);
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

  sendUpdatedViewport(viewport) {
    if (this.state.initialized) {
      this.api.setViewport(viewport);
    }
  }
}

export default CodeEditor;
