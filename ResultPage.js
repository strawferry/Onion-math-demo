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


export default class ResultPage extends Component {
  state = {
    statusBar: true,
  };
  render() {
    var statusBar = <View style={[styles.topBar]} >
      <TouchableOpacity
        style={[styles.backT]}
        onPress={()=>{
    const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }}>
        <View style={[styles.back]}>
          <Text style={styles.fontColor}>
            退出
          </Text>
        </View>
      </TouchableOpacity>
    </View>;
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.statusBar}/>
        {statusBar}
        <Text style={styles.welcome}>
          少年你总共回答了{this.props.all}题,一共答对{this.props.correct}!继续加油哦!
        </Text>
        <TouchableOpacity onPress={()=>{
        const { navigator } = this.props;
            if(navigator) {
                navigator.pop();
            }
        }}>
          <Text style={styles.instructions}>
            再来一次!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
        const { navigator } = this.props;
            if(navigator) {
                navigator.popToTop();
            }
        }}>
          <Text style={styles.instructions}>
            休息一下!
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
  flex: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
  },
  backT: {
    position: "absolute",
    left: 10,
  },
  back: {
    height: 50,
    justifyContent: 'center',
  },
  fontColor: {
    color: "#888888",
    fontSize: 18
  }
});