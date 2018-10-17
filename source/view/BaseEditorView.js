import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import WebViewEditor from '../assets/webview';
import EditorCommunications from '../event/EditorCommunications';
import BlockingView from './BlockingView';

class BaseEditorView extends Component {
  static propTypes = {
    settings: PropTypes.shape({}).isRequired,
    onInitialized: PropTypes.func.isRequired,
    onHistorySizeUpdate: PropTypes.func.isRequired,
    onLog: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    renderBlockingView: PropTypes.func,
  };

  static defaultProps = {
    renderBlockingView: () => <BlockingView />,
  };

  api = null;

  webView = null;

  constructor(...args) {
    super(...args);

    this.state = { initialized: false };

    this.editor = new WebViewEditor();

    this.api = new EditorCommunications({
      onInitialized: this.onWebViewInitialized,
      onHistorySizeUpdate: this.onWebViewHistorySizeUpdate,
      onLog: this.onWebViewLog,
      onError: this.onWebViewGlobalError,
    });
  }

  onWebViewInitialized = (api) => {
    this.setState({ initialized: true }, () => {
      const { onInitialized } = this.props;

      onInitialized(api);
    });
  };

  onWebViewLog = (...data) => {
    const { onLog } = this.props;

    onLog('WebView:', ...data);
  };

  onWebViewGlobalError = (errorText) => {
    const { onError } = this.props;

    onError(errorText);
  };

  onWebViewHistorySizeUpdate = (size) => {
    const { onHistorySizeUpdate } = this.props;

    onHistorySizeUpdate(size);
  };

  handleWebViewReference = (webView) => {
    this.webView = webView;

    this.setState({
      initialized: false,
    });

    if (webView) {
      this.api.initialize(webView);
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
    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <WebView
          ref={this.handleWebViewReference}
          onMessage={this.api.onMessage}
          source={{
            html: this.editor.toString(),
            baseUrl: this.editorBaseUrl,
          }}
          injectedJavaScript={this.editorStartSequence}
          style={{ flex: 1 }}
          javaScriptEnabled
        />
        {this.renderBlockingView()}
      </View>
    );
  }
}

export default BaseEditorView;
