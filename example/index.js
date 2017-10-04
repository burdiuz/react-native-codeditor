/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import CodeEditor from './react-native-codeditor';

export default class RNCodEditorComponent extends Component {
  render() {
    return (
      <CodeEditor
        modules={[
          'mode/javascript',
          'mode/xml',
          'mode/jsx',
          'addon/selection/active-line',
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
          'theme/dracula',
        ]}
        settings={{
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          matchTags: true,
          autoCloseTags: true,
          highlightSelectionMatches: true,
          theme: 'dracula',
        }}
        onInitialized={() => console.log(' -- onInitialized')}
        onContentUpdate={() => console.log(' -- onContentUpdate')}
        onHistorySizeUpdate={() => console.log(' -- onHistorySizeUpdate')}
      />
    );
  }
}

AppRegistry.registerComponent('RNCodEditorComponent', () => RNCodEditorComponent);
