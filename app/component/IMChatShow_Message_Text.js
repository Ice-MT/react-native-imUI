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
import IMCharShowBg from './IMCharShowBg'


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
            bgWidth:0,
            bgHeight:0,

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

    _onLayout = (event)=>{
        this.setState({
            bgHeight: event.nativeEvent.layout.height,
            bgWidth: event.nativeEvent.layout.width,
        })
    }
    
/*
* */
    render() {
        const {data}=this.props
        const {bgHeight,bgWidth}=this.state

        return (

        <TouchableWithoutFeedback
            onLongPress = {this._onLongPress}
            onLayout={this._onLayout}

        >
            <View
                style={[{justifyContent:'center',paddingLeft:15,paddingRight:5,paddingVertical:8,borderRadius:4},data.text.length>19&&{flex:1}
                ,data.isMe&&{alignItems:'flex-end',paddingRight:15,paddingLeft:5}]}
                ref={component => this._root = component}

            >
                <IMCharShowBg
                    width = {bgWidth}
                    height = {bgHeight}
                    isMe = {data.isMe}
                />
                <Text
                    style={[System_styles.getChanggui(15,Const.color_hei_56),{textAlign:'left',backgroundColor:'transparent'},data.isMe&&{color:'white'}]}
                >
                    {data.text}
                </Text>

            </View>
        </TouchableWithoutFeedback>




        );
    }
}

