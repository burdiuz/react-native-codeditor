/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import CodeEditor from '@actualwave/react-native-codeditor';

export default class RNCodEditorComponent extends Component {
  render() {
    return (
      <CodeEditor
        modules={[
          'addon/fold/foldgutter',
          'mode/javascript/javascript',
          'mode/xml/xml',
          'mode/jsx/jsx',
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
        ]}
        settings={{
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          inputStyle: 'contenteditable',
          styleActiveLine: true,
          mode: 'text/jsx',
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          matchTags: true,
          autoCloseTags: true,
          highlightSelectionMatches: true,
        }}
        content={`const ListItem = ({ label, odd, selected, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: odd ? BACKGROUND_COLOR : ACTIVE_BACKGROUND_COLOR,
      }}
    >
      <CheckBoxButtonView selected={selected} />
      <Text>{label}</Text>
    </View>
  </TouchableHighlight>
);`}
        theme="darcula"
        onInitialized={() => console.log(' -- onInitialized')}
        onContentUpdate={() => console.log(' -- onContentUpdate')}
        onHistorySizeUpdate={() => console.log(' -- onHistorySizeUpdate')}
      />
    );
  }
}

AppRegistry.registerComponent('RNCodEditorComponent', () => RNCodEditorComponent);
