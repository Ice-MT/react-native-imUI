
/*
 * 
 * 聊天数据展示
 * 
 * */

'use strict'

import React, { Component } from 'react';
import {
    View,

} from 'react-native';
import IMChatShow_Message from './IMChatShow_Message'
import IMChatShow_Noti from './IMChatShow_Noti'
import Const from '../util/const'



export default class Chat_Room_RecordShow_Time extends Component {

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
            sendSuccess:'bool'
        },
        editing:false,//编辑状态
        callback:undefined,//回调函数, 处理各种类型回调事件{actionType:'', ... }
        longPress:undefined//长按
    };

    /*
    * 
     
    * */
    
    render() {
        const {data,editing,callback,longPress}=this.props

        // console.log(data)

        switch (data.messageType){
            case Const.messageTime:
            case Const.messageSystemMessage:
            case Const.messageProMessage:
            case Const.messageCustomerTrajectory:
            case Const.messageActivity:{
                return(
                    <IMChatShow_Noti
                        
                        data = {data}
                        callback = {(actiontype,data)=>callback(actiontype,data)}
                        longPress = {(data,message)=>longPress(data,message)}
                    />
                )
            }break;
            default :{
                return(
                    <IMChatShow_Message
                        editing = {editing}
                        data = {data}
                        callback = {(actiontype,data)=>callback(actiontype,data)}
                        longPress = {(data,message)=>longPress(data,message)}
                    />
                )
            }
        }
        
    }
}

