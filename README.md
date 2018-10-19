# React Native Code Editor

Code Editor based on [Codemirror](https://codemirror.net/).

```javascript
import React, { Component } from 'react';
import CodeEditor from '@actualwave/react-native-codeditor';

export default () => (
  <CodeEditor
    onInitialized={(api) => console.log('Initialized!')}
    onHistorySizeUpdate={(size) => console.log('History Size Update:', size)}
    onLog={(content) => console.log('Log:', content)}
    onError={(content) => console.log('Error:', content)}
    onContentUpdate={(content) => console.log('Content Update:', content)}
    theme="darcula"
    settings={{
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      inputStyle: 'contenteditable',
      styleActiveLine: true,
      mode: 'jsx',
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      matchTags: true,
      autoCloseTags: true,
      highlightSelectionMatches: true,
      theme: 'darcula',
    }}
    modules={[
      'addon/fold/foldgutter',
      'mode/javascript/javascript',
      'mode/xml/xml',
      'mode/jsx/jsx',
      // FIXME causes unexpected new lines during editin
      // 'addon/selection/active-line',
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
    content={`import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  InputText,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';


class ClassComponent extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  render() {
    return (
      <View />
    );
  }
}

export default ClassComponent;
`}
  />
);
```
