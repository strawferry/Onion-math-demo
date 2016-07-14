/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import QuestionIndex from "./QuestionIndex.js";


class myReactNative extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: QuestionIndex, component: QuestionIndex }}
        configureScene={(route) => {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
              }}
        renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('myReactNative', () => myReactNative);
