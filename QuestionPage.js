/**
 * Created by AMI on 16/7/12.
 */
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
  ScrollView,
  Image,
  Animated,
  Modal,
} from 'react-native';
import ResultPage from "./ResultPage.js";

class Chose extends Component {
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
  rowDirection:{
    flexDirection: "row",
  },
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