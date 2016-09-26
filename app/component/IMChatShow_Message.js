/*
 * 
 * 聊天数据展示---消息
 * 
 * */
'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,

} from 'react-native';

import Const from '../util/const'
import System_styles from '../util/system_styles'

import IMChatShow_Message_Text from './IMChatShow_Message_Text'
import IMChatShow_Message_Image from './IMChatShow_Message_Image'
import IMChatShow_Message_Voice from './IMChatShow_Message_Voice'


export default class IMChatShow_Message extends Component {

    static defaultProps = {
        data:{
            messageId: 'string',//消息ID
            messageType:'string',//消息类型
            session:'string',//所属会话 sessionId
            from:'string',//消息来源  userId
            timestamp:'string',//时间戳
            isDeleted:'bool',//删除
            isRead:'bool',//是否已读
            isRemoteRead:'bool',//对端是否已读
            isPlayed:'bool',//  消息是否被播放过 语音可用
            text:'string',//文本消息可用
            messageJson:'string',// 富文本可用
            sendSuccess:'bool',
            userInfo:undefined,
            isMe:'bool'
        },
        userInfo:{
            
        },
        editing:false,//编辑状态
        callback:undefined,//回调函数, 处理各种类型回调事件{actionType:'', ... }

        longPress:undefined//长按

    }
    constructor(props){

        // console.log(props)

        super(props);
        this.state = {
            selected:false,//选中状态
        };
        
        this.userInfo=Const.users[props.data.from]

    }

    componentWillReceiveProps (nextProps){

        this.userInfo=Const.users[nextProps.data.from]


    }


    _userClick =()=>{

    }
    

    _renderContent = ()=>{
        const {data,longPress}=this.props
        switch (data.messageType){
            case Const.messageText:{
                return(
                    <IMChatShow_Message_Text
                        data = {data}
                        longPress = {(data,message)=>longPress(data,message)}
                        
                    />
                )
            }break;
            case Const.messageImage:{
                return(
                    <IMChatShow_Message_Image
                        data = {data}
                        longPress = {(data,message)=>longPress(data,message)}
                        callback = {(actionType,obj)=>this.props.callback(actionType,obj)}

                    />
                )
            }break;
            case Const.messageLocation:{
                return(
                    <IMChatShow_Message_Location
                        data = {data}
                        longPress = {(data,message)=>longPress(data,message)}

                    />
                )
            }break;
            case Const.messageVoice:{
                return(
                    <IMChatShow_Message_Voice
                        data = {data}
                        longPress = {(data,message)=>longPress(data,message)}

                    />
                )
            }break;
        }
    }


    render() {
        const {data,editing}=this.props
        const {selected}=this.state
        //编辑按钮
        var image = selected?require('./image/weixinyixuan.png'):require('./image/weixinweixuan.png')
        let editingComponent = editing?(
             <TouchableOpacity

                 style = {{marginRight:10}}

                 onPress={()=>{


                 }}>
                 <Image
                     source={image}
                 />
             </TouchableOpacity>

         ) :undefined;
        //头像
        let uersHeader = (
            <View
                style = {[{marginRight:5},data.isMe&&{marginRight:0,marginLeft:5}]}
            >
                <TouchableOpacity
                    onPress={this._userClick}>
                    <Image
                        style={{width:36,height:36,borderRadius:18}}
                        source={this.userInfo.avatarUrl}
                    />
                </TouchableOpacity>
            </View>

        )
        let contentView = this._renderContent()
        //read状态
        let statusStr = !data.isRemoteRead?'未读':'已读'
        let statusCom = !data.isMe||data.messageType==Const.messageImage?undefined:(
            <View
                style={{flexDirection:'row',alignItems:'flex-end',paddingBottom:5,margin:3,width:50,justifyContent:'flex-end'}}
            >
                <Text
                    style={[System_styles.getChanggui(13,Const.color_hei_56),!data.isRemoteRead&&{color:Const.color_blue}]}
                >
                    {}
                </Text>
            </View>
        )
        let empty = (
            <View
                style={{width:50}}
            />
        )


        let p1 = data.isMe?statusCom:uersHeader
        let p2 = data.isMe?contentView:contentView
        let p3 = data.isMe?uersHeader:empty
        return (
            <View style={[{flexDirection:'row',paddingHorizontal:16,paddingVertical:8,width:Const.screen_width}]}
            >
                {editingComponent}
                <View
                    style={[{flexDirection:'row',flex:1,backgroundColor:'white'},
                            data.isMe&&{justifyContent:'flex-end'}]}
                >
                    {p1}
                    {p2}
                    {p3}
                </View>
            </View>
        );
    }
}

