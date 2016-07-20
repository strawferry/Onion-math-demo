'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * JSON.parse(jsonstr); //可以将json字符串转换成json对象
 * JSON.stringify(jsonobj); //可以将json对象转换成json对符串
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
  ListView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import ResultPage from "./ResultPage.js";
import  Chose from "./Chose.js";
var {height, width} = Dimensions.get('window');

export default class WeiboPage extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  state = {
    data: [],
    dataSource: this.ds.cloneWithRows([]),
    isRefreshing: false,
  };
  componentDidMount = ()=>{
    let url = "https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00zHUzPG0uq5aC44861832341VKNbB";
    fetch(url).then((response) => response.text()).then((responseText) => {
      let data = JSON.parse(responseText);
      let bb = data.statuses;
      this.setState({
        dataSource: this.ds.cloneWithRows(bb),
        data: [...bb],
      });
    }).catch((error) => {
      console.warn(error);
    });

  };
  _reFlesh = ()=>{
    this.setState({isRefreshing: true});
    let url = "https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00zHUzPG0uq5aC44861832341VKNbB";
    fetch(url).then((response) => response.text()).then((responseText) => {
      let data = JSON.parse(responseText);
      let bb = data.statuses;
      this.setState({
        data: [],
      },()=>{
        this.setState({
          dataSource: this.ds.cloneWithRows(bb),
          isRefreshing: false,
        });
      });
    }).catch((error) => {
      console.warn(error);
    });
  };
  _moreData = ()=>{
    this.setState({isRefreshing: true});
    let url = "https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00zHUzPG0uq5aC44861832341VKNbB";
    fetch(url).then((response) => response.text()).then((responseText) => {
      let data = JSON.parse(responseText);
      let bb = data.statuses;
      this.setState({
        data: [...this.state.data, ...bb],
      },()=>{
        this.setState({
          dataSource: this.ds.cloneWithRows(this.state.data),
          isRefreshing: false,
        });
      });
    }).catch((error) => {
      console.warn(error);
    });
  };
  _renderRow = (rowData, sectionID, rowID, highlightRow)=>{
    let time = rowData.created_at.split(" ");
    let temp = rowData.source.split(">");
    let from = temp[1].split("<");

    return <View style={[styles.rowContainer]}>
      <View style={[styles.headerView]}>
        <Image style={styles.icon}
               source={{uri: rowData.user.profile_image_url}}
        />
        <View style={[styles.titleView]}>
          <Text style={[styles.nameText]}>{rowData.user.name}</Text>
          <Text style={[styles.fromText]}>{time[3]} 来自{from[0]}</Text>
        </View>
      </View>
      <View style={[styles.textView]}>
        <Text style={[styles.textColor]}>{rowData.text}</Text>
      </View>
      {rowData.pic_urls && rowData.pic_urls.length >0 ?<View style={[styles.imageView]}>
        {rowData.pic_urls.map((item, i, items)=>{
          return <Image
            key={`image-${i}`}
            style={styles.image}
            source={{uri: item.thumbnail_pic}}
          />
        })}
      </View>: null}
      <View style={[styles.zanView]}>
        <Text style={[styles.zanColor]}>转发{rowData.reposts_count}</Text>
        <Text style={[styles.zanColor]}>评论{rowData.comments_count}</Text>
        <Text style={[styles.zanColor]}>赞{rowData.attitudes_count}</Text>
      </View>
      <View style={[styles.sip]}/>
    </View>;

  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.statusBar}/>
        <View style={[styles.nav]}><Text style={[styles.title]}>我是微博主页</Text></View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow)}
          enableEmptySections = {true}
          initialListSize={4}
          onEndReachedThreshold={50}
          onEndReached={()=>this._moreData()}
          refreshControl= {<RefreshControl
                                  onRefresh={()=>this._reFlesh()}
                                  refreshing={this.state.isRefreshing}
                            />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  nav: {
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20
  },
  rowContainer: {

  },
  headerView: {
    marginTop: 10,
    flexDirection: "row",
  },
  icon: {
    height: 60,
    width: 60,
    marginLeft: 10,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
  },
  titleView: {
    marginLeft: 10,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 17,
    color: "#F15B09"
  },
  fromText: {
    fontSize: 12,
    marginTop: 5,
    color: "#858585"
  },
  textView: {
    margin: 10
  },
  textColor: {
    color: "#333333"
  },
  imageView: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  image:{
    height: (width-40)/3 ,
    width: (width-40)/3,
    marginLeft: 10,
    marginBottom: 10
  },
  zanView: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 1,
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
  },
  zanColor: {
    color: "#929292"
  },
  sip: {
    height:10,
    backgroundColor: "#F2F2F2"
  }
});