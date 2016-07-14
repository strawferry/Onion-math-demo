/**
 * Created by AMI on 16/7/12.
 */
'use strict';
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
  ScrollView,
  Image,
  Animated,
  Modal,
} from 'react-native';

export  default class Chose extends Component {
  state = {
    select: null,
    fadeAnim: new Animated.Value(0),
  };
  static defaultProps = {
    showAs: false,
    isShowTip: false,
  };
  static propTypes = {
    data: React.PropTypes.object,
    funSelect: React.PropTypes.func,
    isSubmit: React.PropTypes.bool,
    isShowTip: React.PropTypes.bool,
  };
  componentDidMount() {
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 1000,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  _change = (i)=>{
    if(this.props.isSubmit){
    }else{
      this.setState({
        select: i
      },()=>{
        this.props.funSelect(i);
      })
    }
  };
  render() {
    let ABC =["A", "B", "C", "D", "E", "F", "G", "H"];
    return (
    <Animated.View style={{
                        opacity: this.state.fadeAnim,  // Binds
                      }}
    >
      <View style={[ styles.question]}>
        <Text style={[styles.questionTitle]}>
          {this.props.data.wt}
        </Text>
        <View style={[styles.choseView]}>
          {this.props.data.xx.map((item, i, items)=>{
            let newVar = this.props.data.da == i ? <View style={[styles.rightView]}><Image style={styles.right} source={require('./images/right.png')} /></View>:null;
            let newVar2 = this.props.data.da == i ? null:<View style={[styles.wrongView]}><Image style={styles.wrong} source={require('./images/wrong.png')}/></View>;
            let newlet = this.state.select == i ? newVar2 :null;
            return <TouchableOpacity key={`data-xx-${i}`} onPress={()=>{this._change(i);}}>
              <View style={[styles.chose, this.state.select == i ? styles.selectBGC:styles.choseBGC]}>
                <View style={[styles.AView]}>
                  <Text style={[styles.AText, this.state.select == i ? styles.selectFontColor:styles.AFontColor]}>{ABC[i]}</Text>
                  {this.props.showAs ? newVar :null}
                  {this.props.showAs ? newlet :null}
                </View>
                <View style={[styles.sip]} />
                <View style={[styles.marginL]}>
                  <Text style={[this.state.select == i ? styles.selectFontColor:styles.answerColor]}>{item}</Text>
                </View>
              </View>
            </TouchableOpacity>
          })}
        </View>
        {this.props.isShowTip ?<View style={[styles.tips]}>
          <Text style={[styles.wzjx]}>文字解析:</Text>
          <Text style={[styles.tip]}>{this.props.data.tips}</Text>
        </View>: null}
      </View>
    </Animated.View>
    )
  };
}

const styles = StyleSheet.create({

  question:{
    marginHorizontal: 30,
    marginVertical: 10,
    flexWrap: "wrap",
  },
  questionTitle:{
    fontSize: 15,
    lineHeight:20,
    textAlign: "center",
  },

  choseView: {
    marginTop: 50,
  },
  chose:{
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center"
  },
  choseBGC:{
    backgroundColor: "#FFFFFF",
  },
  selectBGC:{
    backgroundColor: "#888888",
  },
  AFontColor: {
    color: "#808080",
  },
  answerColor:{
    color: "#6A6A6A"
  },
  selectFontColor: {
    color: "#FFFFFF"
  },
  AView: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  AText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  sip: {width: 1, height: 40, backgroundColor: "#D7D7D7"},
  marginL: {marginLeft: 10},
  rightView: {
    height: 40,
    width: 40,
    borderRadius: 90,
    backgroundColor: "#B8DE7D",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 5,
  },
  wrongView: {
    height: 40,
    width: 40,
    borderRadius: 90,
    backgroundColor: "#FD967B",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 5,
  },
  right: {
    height: 30,
    width: 30,
  },
  wrong: {
    height: 20,
    width: 20,
  },
  tips: {
    padding: 20,
    backgroundColor: "#E1EBC3",
    marginTop: 30,
    borderRadius: 10,
  },
  wzjx: {
    color: "#76B927",
    fontSize: 20,
    fontWeight: "bold"
  },
  tip: {
    color: "#76B927",
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold"
  },
  
});