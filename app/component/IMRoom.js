'use strict'

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    ScrollView,
    InteractionManager,
    ActivityIndicator
} from 'react-native';

import Const from '../util/const'
import System_styles from '../util/system_styles'
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import IMInput from './IMInput'
import MenuBar from './MenuBar'

import IMChatShow from './IMChatShow'
import IMVoiceAction from './IMVoiceAction'


var _listHeight = 0;
var _footerY = 0;
var scrollDistance = 0;

var _MaxListHeight = 0;

var FooterLayout = false;
var ListLayout = false;

var startTimeInterval = 0
var vTimeInterval = 0

const showTimeInterval = 300000

const data_old =
    [ { messageType: 'Voice',
        from: '1',
        timestamp: '1473884719035',
        isMe: false,
        isPlayed: false,
        duration: 4.5 },
        { messageType: 'Voice',
            from: '0',
            timestamp: '1473884717025',
            isMe: true,
            isPlayed: false,
            duration: 4.5 },
        { messageType: 'Voice',
            from: '1',
            timestamp: '1473884714269',
            isMe: false,
            isPlayed: false,
            duration: 2.5 },
        { messageType: 'Voice',
            from: '0',
            timestamp: '1473884712265',
            isMe: true,
            isPlayed: false,
            duration: 2.5 },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884707749',
            isRemoteRead: false,
            text: '😌😌😌😌',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884705746',
            isRemoteRead: false,
            text: '😌😌😌😌',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884702789',
            isRemoteRead: false,
            text: '😍😍😍😍😍😍',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884700786',
            isRemoteRead: false,
            text: '😍😍😍😍😍😍',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884699501',
            isRemoteRead: false,
            text: '😘😘😘😘',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884697498',
            isRemoteRead: false,
            text: '😘😘😘😘',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884695548',
            isRemoteRead: false,
            text: '😍😍😍😍',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884693546',
            isRemoteRead: false,
            text: '😍😍😍😍',
            isMe: true },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884691555',
            isRemoteRead: false,
            text: '😆😆😆😆😆',
            isMe: true },
        { messageType: 'Image',
            from: '1',
            timestamp: '1473884682425',
            isRemoteRead: false,
            url: 'http://p4.so.qhmsg.com/sdr/1600_900_/t0152251c99c992e169.jpg',
            isMe: false },
        { messageType: 'Image',
            from: '0',
            timestamp: '1473884680423',
            isRemoteRead: false,
            url: 'http://p4.so.qhmsg.com/sdr/1600_900_/t0152251c99c992e169.jpg',
            isMe: true },
        { messageType: 'Image',
            from: '0',
            timestamp: '1473884680420',
            isRemoteRead: false,
            url: 'http://p1.so.qhmsg.com/t01f67a7a5d15fcadd1.jpg',
            isMe: true },
        { messageType: 'Image',
            from: '0',
            timestamp: '147384680419',
            isRemoteRead: false,
            url: 'http://p0.so.qhmsg.com/sdr/600_900_/t01cf33f99ce0b5813a.jpg',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884679863',
            isRemoteRead: false,
            text: 'Iuuiij',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884677851',
            isRemoteRead: false,
            text: 'Iuuiij',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884669758',
            isRemoteRead: false,
            text: 'You 😄',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884667756',
            isRemoteRead: false,
            text: 'You 😄',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473884661701',
            isRemoteRead: false,
            text: 'The only problem I had was when it comes out of a new update 😅😅😅😅',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1473884659684',
            isRemoteRead: false,
            text: 'The only problem I had was when it comes out of a new update 😅😅😅😅',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1473846353000',
            isRemoteRead: false,
            text: 'hello~' } ]

const data_int =
    [ { messageType: 'Voice',
        from: '1',
        timestamp: '1474884719035',
        isMe: false,
        isPlayed: false,
        duration: 4.5 },
        { messageType: 'Voice',
            from: '0',
            timestamp: '1474884717025',
            isMe: true,
            isPlayed: false,
            duration: 4.5 },
        { messageType: 'Voice',
            from: '1',
            timestamp: '1474884714269',
            isMe: false,
            isPlayed: false,
            duration: 2.5 },
        { messageType: 'Voice',
            from: '0',
            timestamp: '1474884712265',
            isMe: true,
            isPlayed: false,
            duration: 2.5 },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884707749',
            isRemoteRead: false,
            text: '😌😌😌😌',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884705746',
            isRemoteRead: false,
            text: '😌😌😌😌',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884702789',
            isRemoteRead: false,
            text: '😍😍😍😍😍😍',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884700786',
            isRemoteRead: false,
            text: '😍😍😍😍😍😍',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884699501',
            isRemoteRead: false,
            text: '😘😘😘😘',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884697498',
            isRemoteRead: false,
            text: '😘😘😘😘',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884695548',
            isRemoteRead: false,
            text: '😍😍😍😍',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884693546',
            isRemoteRead: false,
            text: '😍😍😍😍',
            isMe: true },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884691555',
            isRemoteRead: false,
            text: '😆😆😆😆😆',
            isMe: true },
        { messageType: 'Image',
            from: '1',
            timestamp: '1474884682425',
            isRemoteRead: false,
            url: 'http://p4.so.qhmsg.com/sdr/1600_900_/t0152251c99c992e169.jpg',
            isMe: false },
        { messageType: 'Image',
            from: '0',
            timestamp: '1474884680423',
            isRemoteRead: false,
            url: 'http://p4.so.qhmsg.com/sdr/1600_900_/t0152251c99c992e169.jpg',
            isMe: true },
        { messageType: 'Image',
            from: '0',
            timestamp: '1474884680420',
            isRemoteRead: false,
            url: 'http://p1.so.qhmsg.com/t01f67a7a5d15fcadd1.jpg',
            isMe: true },
        { messageType: 'Image',
            from: '0',
            timestamp: '1474884680419',
            isRemoteRead: false,
            url: 'http://p0.so.qhmsg.com/sdr/600_900_/t01cf33f99ce0b5813a.jpg',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884679863',
            isRemoteRead: false,
            text: 'Iuuiij',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884677851',
            isRemoteRead: false,
            text: 'Iuuiij',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884669758',
            isRemoteRead: false,
            text: 'You 😄',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884667756',
            isRemoteRead: false,
            text: 'You 😄',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474884661701',
            isRemoteRead: false,
            text: 'The only problem I had was when it comes out of a new update 😅😅😅😅',
            isMe: false },
        { messageType: 'Text',
            from: '0',
            timestamp: '1474884659684',
            isRemoteRead: false,
            text: 'The only problem I had was when it comes out of a new update 😅😅😅😅',
            isMe: true },
        { messageType: 'Text',
            from: '1',
            timestamp: '1474846353000',
            isRemoteRead: false,
            text: 'hello~' } ]


export default class copy extends Component {

    static defaultProps = {

    };


    constructor(){
        super();
        this.state = {

            isRefreshing:false,//下啦活动控制

            showMenuBar:false,
            menuBarOrigin:{},
            menuItems:[],

            showActivity:false,


            dataSource1:[''],
            dataSource2:[''],
            showInvertible:false,
        };

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.msgArr = []
        this.noData = false

    }


    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            const {session}=this.props
            this._getMessages(data_int)
        });

    }


    _sendMessage = (msgs)=>{
        this._getMessages(msgs)
        this.tttt && clearInterval(this.tttt);
        this.tttt = setTimeout(()=>{
            let tmp = this.clone(msgs[0])
            tmp.from = '1'
            tmp.isMe = false
            tmp.timestamp=new Date().getTime()+''
            this._getMessages(tmp)
        },2000)

    }

    clone=(myObj)=>{
        if(typeof(myObj) != 'object') return myObj;
        if(myObj == null) return myObj;
        var myNewObj = new Object();

        for(var i in myObj)
            myNewObj[i] = this.clone(myObj[i]);

        return myNewObj;
    }

    _getMessages = (obj)=>{
        if(this.state.isRefreshing){
            this.noData = obj.length!==20
        }

        this.listView&&!this.state.isRefreshing&&this.listView.scrollTo({
            y: 0,
            x: 0,
            animated:true,
        });

        this.msgArr = this.msgArr.concat(obj)
        this.msgArr.sort((a,b)=>{
            return b.timestamp.localeCompare(a.timestamp)
        })
        
        this._getData()
    }

    _getData = ()=>{
        let msgData = [];
        for(let i = 0;i<this.msgArr.length;i++) {
            let msgTp = parseInt(this.msgArr[i].timestamp)

            if (i === 0) {
                startTimeInterval = msgTp
            } else if (startTimeInterval - msgTp > showTimeInterval) {
                msgData.push(Const.imUtil.getTimeModel(vTimeInterval))
                startTimeInterval = msgTp
            }
            msgData.push(this.msgArr[i])
            if (i === this.msgArr.length - 1) {
                msgData.push(Const.imUtil.getTimeModel(msgTp))
            }
            vTimeInterval = msgTp
        }
        let msgData2 = msgData.concat().reverse()
        this.setState({
            isRefreshing:false,
            dataSource1:msgData,
            dataSource2:msgData2,
        })
    }


    _cellAction = (actionType,obj)=>{

    }


    //长按
    _longPress = (origin,messgae)=>{
        // origin(x, y, width, height)
        let items = messgae.messageType===Const.messageText?['复制','转发','收藏','删除',]:['转发','收藏','删除',]
        //根据 messageType设置 items
        // messgae.messageType
        this.setState({
            showMenuBar:true,
            menuBarOrigin:origin,
            menuItems:items
        })
    }

    _menuBarItemClick = (item)=>{


        this.setState({
            showMenuBar:false,
        })
    }

    //渲染footer
    _renderFooter = ()=>{
        const {isRefreshing}=this.state
        if(isRefreshing){
            return (
                <View
                    style={{alignItems:'center',justifyContent:'center'}}
                >
                    <ActivityIndicator
                        animating={isRefreshing}
                        size="small"
                    />
                </View>
            );
        }else {
            return (
                <View
                    style={{alignItems:'center',justifyContent:'center',height:1}}
                    ref={(listView) => this.footer = listView}
                    onLayout={this._onFooterLayout}
                />
            );
        }
    }

    scrollToBottom=()=> {
        if(FooterLayout === false &&ListLayout===false){
            return;
        }
        FooterLayout = false
        ListLayout=false
        if (_listHeight && _footerY && _footerY > _listHeight) {
            scrollDistance = _listHeight - _footerY;
            this.listView.scrollTo({
                y: -scrollDistance,
                x: 0,
                animated:true,
            });
        }
    }

    //聊天信息变化触发
    _onFooterLayout = (event) =>{

        const {showInvertible}=this.state
        if(!showInvertible) {
            FooterLayout = event.nativeEvent.layout.y>_footerY;
            _footerY = event.nativeEvent.layout.y;
            this.scrollToBottom();

            if(_footerY>_MaxListHeight&&_MaxListHeight!==0){
                this.setState({
                    showInvertible:true
                })
            }
        }
    }
    //界面变化触发
    _onListViewLayout = (event) =>{
        // console.log(_listHeight)

        const {showInvertible}=this.state
        if(!showInvertible){
            _MaxListHeight = event.nativeEvent.layout.height;

            ListLayout = event.nativeEvent.layout.height!==_listHeight;
            _listHeight = event.nativeEvent.layout.height;
            this.scrollToBottom();
        }else {
            this.listView.scrollTo({
                y: 0,
                x: 0,
                animated:true,
            });
        }

    }

    _onTouchStart =()=>{
        // console.warn('_onTouchStart')
        this.intput.hideSubView()
        if (this.state.showMenuBar){
            this.setState({
                showMenuBar:false,
            })
        }
    }

    _onEndReached =()=>{
        if(this.noData||this.state.isRefreshing){
            return;
        }

        this.setState({
            isRefreshing :true
        })

        //模拟
        setTimeout(()=>{
            this._getMessages(data_old)
        },1500)

    }



    _recorderAction = (showActivity,cancel)=>{
        //可优化
        // 调用频繁 优化处理
        
        this.voiceAction.recorderAction(showActivity,cancel)
        
        if (showActivity){
            if(!this.state.showActivity){
                this.setState({
                    showActivity:true,
                })
            }
        }else {
            this.setState({
                showActivity:false,
            })
        }
    }

    _renderNavBar = ()=>{
        return(
            <View
                style={{height:Const.status_bar_nav_bar_height,backgroundColor:Const.color_blue,borderBottomWidth:0.5,borderBottomColor:Const.color_hei_56,
                    justifyContent:'center',alignItems:'center',paddingTop:Const.status_bar_height
                }}
            >
                <Text
                    style={System_styles.getZhonghei(22)}
                >
                    IM-UI-Demo
                </Text>

            </View>
        )
    }

    _renderRow = (rowDate)=>{
        return(
            <IMChatShow
                editing = {false}
                data = {rowDate}
                longPress = {this._longPress}
                callback = {this._cellAction}
            />
        )
    }


    _renderListView = ()=>{
        const {dataSource1,dataSource2,showInvertible}=this.state
        if(!showInvertible){
            return(
                <ListView
                    keyboardDismissMode = 'on-drag'
                    ref={(listView) => this.listView = listView}
                    dataSource={this.ds.cloneWithRows(dataSource2)}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    renderFooter={this._renderFooter}
                    onLayout={this._onListViewLayout}
                    renderScrollComponent={props => <ScrollView {...props} inverted
                                onTouchStart= {this._onTouchStart}
                />}
                    initialListSize = {20}
                />
            )
        }

        return(
            <ListView
                keyboardDismissMode = 'on-drag'
                ref={(listView) => this.listView = listView}
                dataSource={this.ds.cloneWithRows(dataSource1)}
                renderRow={this._renderRow}
                // removeClippedSubviews=
                enableEmptySections={true}
                renderFooter={this._renderFooter}
                onContentSizeChange = {this._onContentSizeChange}
                onLayout={this._onListViewLayout}
                renderScrollComponent={props => <InvertibleScrollView {...props} inverted
                                onTouchStart= {this._onTouchStart}
                />}
                onEndReached = {this._onEndReached}
                onEndReachedThreshold = {100}
                initialListSize = {20}
            />
        )

    }


    render() {
        const {showMenuBar,menuBarOrigin,menuItems,showActivity}=this.state
        let menuBar = showMenuBar?(
            <MenuBar
                origin = {menuBarOrigin}
                menuItems = {menuItems}
                itemClick = {this._menuBarItemClick}
            />
        ):undefined

        let voiceAction = (
            <IMVoiceAction
                style={[{opacity:0},showActivity&&{opacity:1}]}
                ref={(listView) => this.voiceAction = listView}
                sendMessage = {this._sendMessage}
            />
        )

        return (
            <View style={System_styles.styles.container}>
                {this._renderNavBar()}
                {this._renderListView()}
                <IMInput
                    ref={(intput) => this.intput = intput}
                    navigator = {this.props.navigator}
                    recorderAction = {this._recorderAction}
                    layouyChange = {(can)=>this.setState({canScorll:can})}
                    sendMessage={this._sendMessage}
                />
                {menuBar}
                {voiceAction}
            </View>
        );
    }
}
