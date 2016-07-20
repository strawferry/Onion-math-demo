/**
 * Created by AMI on 16/7/12.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import  QuestionPage from "./QuestionPage.js";
import  WeiboPage from "./WeiboPage.js";

export default class QuestionIndex extends Component {
  state = {
    statusBar: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.statusBar}/>
        <Text style={styles.welcome}>
          答题小demo
        </Text>
        <TouchableOpacity onPress={()=>{
        const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: 'ChatList',
                    component: QuestionPage,
                    param:{
                    sceneAnimation: Navigator.SceneConfigs.PushFromRight,
                    }
                })
            }
        }}>
        <Text style={styles.instructions}>
          点击开始答题
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
        const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                                    name: 'WeiboPage',
                                    component: WeiboPage,
                                    params: {
                                    }
                                    });
            }
        }}>
          <Text style={styles.instructions}>
            刷下微博!
          </Text>
        </TouchableOpacity>
      </View>
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
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
});