/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,

} from 'react-native';

import IMRoom from './app/component/IMRoom'

class reactNativeImUI extends Component {
  render() {
    return (
        <IMRoom/>
    );
  }
}



AppRegistry.registerComponent('reactNativeImUI', () => reactNativeImUI);
