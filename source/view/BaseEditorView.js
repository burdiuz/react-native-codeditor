import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import WebViewEditor from '../assets/webview';
import WebViewAPI from '../event/WebViewAPI';
import BlockingView from './BlockingView';
import { generateInitScript } from './utils';

const styles = StyleSheet.create({
  container: { position: 'relative', flex: 1 },
  webView: { flex: 1 },
});

const WHITELIST = [];

class BaseEditorView extends Component {
  static propTypes = {
    onInitialized: PropTypes.func.isRequired,
    onHistorySizeUpdate: PropTypes.func.isRequired,
    onLog: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    renderBlockingView: PropTypes.func,
    autoUpdateInterval: PropTypes.number,
    theme: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
    settings: PropTypes.shape({}),
    viewport: PropTypes.shape({}),
  };

  static defaultProps = {
    renderBlockingView: () => <BlockingView />,
    autoUpdateInterval: 1000,
    theme: undefined,
    settings: {
      inputStyle: 'contenteditable',
      styleActiveLine: true,
    },
    viewport: {},
    modules: [
      'addon/fold/foldgutter',
      'addon/edit/matchbrackets',
      'addon/edit/matchtags',
      'addon/search/match-highlighter',
      'addon/edit/closebrackets',
      'addon/edit/closetag',
      'addon/fold/foldcode',
      'addon/fold/foldgutter',
      'addon/fold/brace-fold',
      'addon/fold/comment-fold',
      'addon/fold/indent-fold',
      'addon/fold/xml-fold',
    ],
    content: '',
  };

  api = null;

  webView = null;

  constructor(props) {
    super(props);

    this.editor = new WebViewEditor(props.theme, props.modules);

    this.baseUrlHref = 'https://actualwave.com/react-native-codeditor';
    this.baseUrlIndex = 0;
    this.updateBaseUrl();

    const { settings, theme, content, viewport, autoUpdateInterval } = props;

    this.state = {
      initialized: false,
      source: {
        html: this.editor.toString(),
        baseUrl: this.editorBaseUrl,
      },
      initScript: generateInitScript(settings, theme, content, viewport, autoUpdateInterval),
    };

    this.api = new WebViewAPI({
      onInitialized: (api) => this.onWebViewInitialized(api),
      onHistorySizeUpdate: (size) => this.onWebViewHistorySizeUpdate(size),
      onLog: (log) => this.onWebViewLog(log),
      onError: (error) => this.onWebViewGlobalError(error),
    });
  }

  updateBaseUrl() {
    this.baseUrl = `${this.baseUrlHref}/${++this.baseUrlIndex}`;
  }

  componentDidUpdate({
    theme: oldTheme,
    modules: oldModules,
    settings: oldSettings,
    viewport: oldViewport,
  }) {
    const { theme, modules, settings, viewport } = this.props;

    if (oldTheme !== theme || oldModules !== modules) {
      this.updateEditorHtml();
    }

    if (oldTheme !== theme || oldSettings !== settings || oldViewport !== viewport) {
      this.updateInitScript();
    }
  }

  updateEditorHtml({ theme, modules } = this.props) {
    this.editor.setTheme(theme);
    this.editor.resetModules([...modules]);

    const html = this.editor.toString();

    this.setState({
      source: {
        html,
        baseUrl: this.editorBaseUrl,
      },
      initialized: false,
    });
  }

  updateInitScript({ settings, theme, content, viewport, autoUpdateInterval } = this.props) {
    this.setState({
      initScript: generateInitScript(settings, theme, content, viewport, autoUpdateInterval),
      initialized: false,
    });
  }

  get editorBaseUrl() {
    return this.baseUrl;
  }

  onWebViewInitialized(api) {
    this.setState({ initialized: true }, () => {
      const { onInitialized } = this.props;

      onInitialized(api);
    });
  }

  onWebViewLog(log) {
    const { onLog } = this.props;

    onLog(log);
  }

  onWebViewGlobalError(error) {
    const { onError } = this.props;

    onError(error);
  }

  onWebViewHistorySizeUpdate(size) {
    const { onHistorySizeUpdate } = this.props;

    onHistorySizeUpdate(size);
  }

  handleWebViewReference = (webView) => {
    const { content, settings } = this.props;
    this.webView = webView;

    this.setState({
      initialized: false,
    });

    if (webView) {
      this.api.initialize(webView, { content, settings });
    }
  };

  renderBlockingView() {
    const { renderBlockingView } = this.props;
    const { initialized } = this.state;

    if (!initialized) {
      return renderBlockingView();
    }
    return null;
  }

  handleLoadError = (...args) => console.log('WebView Load Error:', ...args);

  render() {
    const { initScript, source } = this.state;

    return (
      <View style={styles.container}>
        <WebView
          ref={this.handleWebViewReference}
          onMessage={this.api.onMessage}
          onError={this.handleLoadError}
          source={this.state.source}
          injectedJavaScript={initScript}
          style={styles.webView}
          javaScriptEnabled
          originWhitelist={WHITELIST}
        />
        {this.renderBlockingView()}
      </View>
    );
  }
}

export default BaseEditorView;
