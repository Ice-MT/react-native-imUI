'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';


import Const from '../util/const'
import System_styles from '../util/system_styles'


export default class IMChatShow_Message_Text extends Component {

    static defaultProps = {
        data:{
            isMe:false,
            isRead:false,
            messageType:Const.messageText,

            text:''

        },


    }

    
    constructor(props){
        super(props);
        this.state = {

        };

    }

    _onLongPress = ()=>{
        const {longPress,data}=this.props
        this._root.measureInWindow((x, y, width, height) => {
            longPress({
                x:x,
                y:y,
                width:width,
                height:height
            },data)

        })
    }

/*
* */
    render() {
        const {data}=this.props
        
        return (

        <TouchableWithoutFeedback
            onLongPress = {this._onLongPress}
        >
            <View
                style={[{justifyContent:'center',paddingHorizontal:5,paddingVertical:8,borderRadius:4,backgroundColor:Const.color_hei_240},data.text.length>19&&{flex:1}
                ,data.isMe&&{backgroundColor:Const.color_blue,alignItems:'flex-end'}]}
                ref={component => this._root = component}

            >
                <Text
                    style={[System_styles.getChanggui(15,Const.color_hei_56),{textAlign:'left',},data.isMe&&{color:'white'}]}
                >
                    {data.text}
                </Text>
            </View>
        </TouchableWithoutFeedback>




        );
    }
}

