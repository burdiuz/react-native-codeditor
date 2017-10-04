/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import MessagePortDispatcher from 'messageport-dispatcher';
import { requestResolverFactory } from '../event/DeferredRequest';
import { EditorEvent, getResponseEvent, } from '../event/EditorEvent';
import Request from '../event/Request';
import renderBlockingView from './BlockingView';

const clientFactory = requestResolverFactory(getResponseEvent);
const rawEvents = {
  // FIXME don't really remember why I added this
};

MessagePortDispatcher.toJSON = (data) => JSON.stringify(data);

class BaseEditorView extends Component {

  static propTypes = {
    settings: PropTypes.object.isRequired,
    onInitialized: PropTypes.func.isRequired,
    consoleError: PropTypes.func,
    consoleLog: PropTypes.func,
    renderBlockingView: PropTypes.func,
  };
  static defaultProps = {
    renderBlockingView,
  };

  webView = null;
  dispatcher = null;
  request = null;
  onMessageListener = null;

  state = {
    initialized: false,
  };

  initializeWebView() {
    this.dispatcher = new MessagePortDispatcher({
      postMessage: (...args) => this.webView.postMessage(...args),
      // TODO replace single listener assignment to multihandler
      addEventListener: (type, listener) => this.onMessageListener = listener,
    }, null, this.preprocessIncomingMessages);
    /*
     FIXME Might need Augmented Request with some simple actions not generating promises,
     like historySize of you don't need promise with size.
     */
    this.request = new Request(clientFactory(this.dispatcher));
    this.dispatcher.addEventListener(EditorEvent.INIT, () => this.onInitialize());
    this.dispatcher.addEventListener(EditorEvent.WV_GLOBAL_ERROR, () => this.onWebViewGlobalError());
    this.dispatcher.addEventListener(EditorEvent.WV_LOG, () => this.onWebViewLog());
  }

  preprocessIncomingMessages = (event) => {
    const { data: eventData } = event;
    if (!rawEvents[event.type]) {
      if (eventData && typeof(eventData) === 'object') {
        const { meta, data } = eventData;
        if (meta) {
          this.readMessageMetaData(meta);
          event.data = data;
        }
      }
    }
    return event;
  };

  readMessageMetaData(meta) {
    /* abstract */
  }

  onInitialize(content = '') {
    this.request.dispatch(EditorEvent.HANDSHAKE, {
      content,
      //history: ...
    }).then(() => this.onInitialized());
  };

  onInitialized() {
    this.setState({ initialized: true }, () => {
      this.props.onInitialized(this.request);
    });
  };

  onWebViewLog(event) {
    const { consoleLog } = this.props;
    if (!consoleLog) {
      return;
    }

    consoleLog('WebView:', ...event.data);
  };

  onWebViewGlobalError(event) {
    const { consoleError } = this.props;
    if (!consoleError) {
      return;
    }

    const { data } = event;
    let errorText;
    if (data.error) {
      const { name, message, fileName, lineNumber, columnNumber } = data.error;
      errorText = `WebView ${name}: ${message}\nSource: "${fileName}" ${lineNumber}:${columnNumber}`;
    } else {
      const { message, source, lineno, colno } = data;
      errorText = `WebView: ${message}\nSource: "${source}" ${lineno}:${colno}`;
    }
    this.props.consoleError(errorText);
  };

  handleWebViewReference = (webView) => {
    this.webView = webView;
    this.initializeWebView();
  };

  handleWebViewMessage = (event) => {
    const { nativeEvent } = event;
    if (this.onMessageListener) {
      this.onMessageListener(nativeEvent);
    }
  };

  renderBlockingView() {
    let content = null;
    if (!this.state.initialized) {
      content = this.props.renderBlockingView();
    }
    return content;
  }

  render() {
    return (
      <View
        style={{ position: 'relative', flex: 1 }}
      >
        <WebView
          ref={this.handleWebViewReference}
          onMessage={this.handleWebViewMessage}
          source={{
            html: this.editorHtml,
            baseUrl: this.editorBaseUrl,
          }}
          javaScriptEnabled={true}
          injectedJavaScript={this.editorStartSequence}
          style={{ flex: 1 }}
        />
        {this.renderBlockingView()}
      </View>
    );
  }
}

export default BaseEditorView;
