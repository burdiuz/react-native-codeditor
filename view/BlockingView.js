/**
 * @flow
 */

'use strict';

import React from 'react';
import { View, Text } from 'react-native';

export const BlockingView = () => {
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#00000066',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        color: '#fff',
        fontSize: 12,
      }}>
        Initializing, please wait...
      </Text>
    </View>
  );
};

const renderBlockingView = () => (
  <BlockingView />
);

export default renderBlockingView;
