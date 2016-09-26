/*
 * 
 * 聊天数据展示--提示/通知
 * 
 * */
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
} from 'react-native';

import Const from '../util/const'

import IMChatShow_Noti_Time from './IMChatShow_Noti_Time'
import IMChatShow_Noti_SystemMessage from './IMChatShow_Noti_SystemMessage'

export default class IMChatShow_Message extends Component {

    static defaultProps = {

    }
    constructor(){
        super();
        this.state = {

        };
    }


    _renderContent = ()=>{
        const {data,longPress}=this.props


        switch (data.messageType){
            case Const.messageTime:{
                return(
                    <IMChatShow_Noti_Time
                        data = {data}
                    />
                )
            }break;
            case Const.messageSystemMessage:{
                return(
                    <IMChatShow_Noti_SystemMessage
                        data = {data}
                    />
                )
            }break;
        }
    }

    render() {

        const {data,editing}=this.props
        return (

            <View style={[{alignItems:'center',justifyContent:'center',paddingHorizontal:16,paddingVertical:8,width:Const.screen_width},data.messageType === Const.messageActivity&&{alignItems:'flex-end'}]}

            >
                {this._renderContent()}

            </View>
        );
    }
}

