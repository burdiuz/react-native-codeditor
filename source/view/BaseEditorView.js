import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import PropTypes from 'prop-types';
import WebViewEditor from '../assets/webview';
import WebViewAPI from '../event/WebViewAPI';
import BlockingView from './BlockingView';
import { generateInitScript } from './utils';

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
  };

  static defaultProps = {
    renderBlockingView: () => <BlockingView />,
    autoUpdateInterval: 1000,
    theme: undefined,
    settings: {
      inputStyle: 'contenteditable',
      styleActiveLine: true,
    },
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

  constructor(props, ...args) {
    super(props, ...args);

    this.editor = new WebViewEditor(props.theme, props.modules);

    this.state = {
      initialized: false,
      html: this.editor.toString(),
      initScript: generateInitScript(props.settings, props.theme, props.autoUpdateInterval),
    };

    this.api = new WebViewAPI({
      onInitialized: (api) => this.onWebViewInitialized(api),
      onHistorySizeUpdate: (size) => this.onWebViewHistorySizeUpdate(size),
      onLog: (log) => this.onWebViewLog(log),
      onError: (error) => this.onWebViewGlobalError(error),
    });
  }

  componentWillReceiveProps({ theme: newTheme, modules: newModules, settings: newSettings }) {
    const { theme, modules, settings } = this.props;

    if (newTheme !== theme || newModules !== modules) {
      this.updateEditorHtml();
    }

    if (newTheme !== theme || newSettings !== settings) {
      this.updateInitScript();
    }
  }

  updateEditorHtml({ theme, modules } = this.props) {
    this.editor.setTheme(theme);
    this.editor.resetModules([...modules]);

    this.setState({ html: this.editor.toString() });
  }

  updateInitScript({ settings, theme, autoUpdateInterval } = this.props) {
    this.setState({ initScript: generateInitScript(settings, theme, autoUpdateInterval) });
  }

  get editorBaseUrl() {
    return 'https://actualwave.com/';
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

  render() {
    const { html, initScript } = this.state;

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <WebView
          ref={this.handleWebViewReference}
          onMessage={this.api.onMessage}
          onError={(...args) => console.log('WebView Load Error:', ...args)}
          source={{
            html,
            baseUrl: this.editorBaseUrl,
          }}
          injectedJavaScript={initScript}
          style={{ flex: 1 }}
          javaScriptEnabled
          originWhitelist={[]}
        />
        {this.renderBlockingView()}
      </View>
    );
  }
}

export default BaseEditorView;
