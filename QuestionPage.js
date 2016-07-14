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
import ResultPage from "./ResultPage.js";
import  Chose from "./Chose.js";

export default class QuestionPage extends Component {
  state = {
    statusBar: true,
    questionArr: [
      {wt: "问题1", xx: ["选项1", "选项2", "选项3"], da: 1, wtjd: "问题解答", tips: "这是问题1提示,希望你能做对啊!"},
      {wt: "问题2", xx: ["选项1", "选项2", "选项3", "选项4"], da: 2, wtjd: "问题解答", tips: "这是问题2提示,希望你能做对啊!"},
      {wt: "问题3", xx: ["选项1", "选项2", "选项3"], da: 2, wtjd: "问题解答", tips: "这是问题3提示,希望你能做对啊!"},
      {wt: "问题4", xx: ["选项1", "选项2", "选项3", "选项4", "选项5"], da: 4, wtjd: "问题解答", tips: "这是问题4提示,希望你能做对啊!"}
    ],//问题数组
    questionCount:0,//答对题目总数
    nowQuestion: 0,//当前第几题
    isChose: false,//问题是否已选择,颜色
    isSubmit:false,//是否已提交,已提交显示继续否则为提交
    chose: null,//选择的答案
    showAs: false,//显示答案
    showTip: false,//显示提示
  };

  _showTip = ()=>{
    this.setState({
      showTip: !this.state.showTip,
    })
  };
  render() {
    let count = 100*this.state.questionCount/this.state.questionArr.length;
    var statusBar = <View style={[styles.topBar]} >
      <TouchableOpacity
        style={[styles.backT]}
        onPress={()=>{
    const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }}>
        <View style={[styles.back]}>
          <Text style={styles.fontColor}>
            退出
          </Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.title]}>
        <Text>{this.state.nowQuestion+1}/{this.state.questionArr.length}</Text>
        <View style={[styles.progress]}>
          <View style={[styles.progressCount, {width: this.state.questionCount*148/this.state.questionArr.length}]}/>
        </View>
        <Text>{count}%</Text>
      </View>
    </View>;

    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.statusBar}/>
        <ScrollView>
          {statusBar}
          <Chose key={`Chose-${this.state.nowQuestion}`}
                 data={this.state.questionArr[this.state.nowQuestion]}
                 showAs={this.state.showAs}
                 isSubmit={this.state.isSubmit}
                 isShowTip={this.state.showTip}
                 funSelect={(i)=>{
                 this.setState({chose: i, isChose: true});
                 }}
          />
        </ScrollView>
        <View style={[styles.toolBar]}>
          <TouchableOpacity onPress={()=>{
          this.state.isSubmit ? this._showTip() :null ;
         }}>
            <View style={[styles.leftBtn]}>
              <View style={[styles.whiteRan]}>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.subBtn, this.state.isChose ? styles.btnSelectedBG: styles.btnBG]}
                            onPress={()=>{
                              if(this.state.isSubmit){
                              //继续下一道题
                              this.setState({});
                              if (this.state.nowQuestion == this.state.questionArr.length-1){
                              //结果页面
                              const { navigator } = this.props;
                                if(navigator) {
                                this.setState({
                                    questionCount:0,//答对题目总数
                                    nowQuestion: 0,//当前第几题
                                    isChose: false,//问题是否已选择,颜色
                                    isSubmit:false,//是否已提交,已提交显示继续否则为提交
                                    chose: null,//选择的答案
                                    showAs: false,//显示答案
                                    showTip: false,
                                    })
                                    navigator.push({
                                    name: 'ResultPage',
                                    component: ResultPage,
                                    params: {
                                        all: this.state.questionArr.length,
                                        correct: this.state.questionCount
                                    }
                                    });
                                }
                              }else{
                              this.setState({isChose: false, isSubmit: false, nowQuestion: this.state.nowQuestion+1, showAs: false, showTip: false,});
                              }
                              }else{
                              if(this.state.isChose){
                              //提交
                              // alert("提交");
                              this.setState({isSubmit: true, showAs: true},()=>{
                              if(this.state.chose == this.state.questionArr[this.state.nowQuestion].da){
                                  this.setState({questionCount: this.state.questionCount+1});
                              }else{
                                this._showTip();
                              }
                              });
                              }else{return;}
                            }
                            }}
          >
            <View>
              <Text style={[styles.subText, this.state.isChose ? styles.fontSelectSub: styles.fontSub]}>{this.state.isSubmit ? "继续": "提交"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'

  },

  /*顶部topbar*/
  topBar: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
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
  },
  title: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    width:200
  },
  progress: {
    borderWidth: 1,
    borderColor: "#DBDBDB",
    marginHorizontal: 5,
    borderRadius: 10,
    width: 150,
    height: 15,
  },
  progressCount:{
    borderRadius: 10,
    height: 13,
    backgroundColor: "#2499E8"
  },

  /*底部toolbar*/
  toolBar: {
    height: 49,
    borderTopWidth: 1,
    borderTopColor: "#DADADA",
    backgroundColor: "#F4F4F4",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  leftBtn: {
    backgroundColor: "#2499E8",
    height: 35,
    width: 35,
    marginLeft: 7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  whiteRan :{
    backgroundColor: "white",
    height: 22,
    width: 18,
    borderRadius: 3,
  },
  subBtn: {
    flex: 1,
    height: 35,
    borderRadius: 5,
    marginHorizontal: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  btnBG: {
    backgroundColor: "#DADADA",
  },
  btnSelectedBG: {
    backgroundColor: "#2499E8",
  },
  subText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  fontSub: {
    color: "#BEBEBE"
  },
  fontSelectSub: {
    color: "#F4FBFE"
  },
});