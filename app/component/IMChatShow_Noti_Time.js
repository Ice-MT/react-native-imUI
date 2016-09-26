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
            messageType:Const.messageTime,
            timestamp:'19:20'
        },

    }
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        const {data}=this.props


        return (
            <Text
                style={[System_styles.getChanggui(13,Const.color_hei_32),{marginLeft:16,marginRight:16}]}
            >
                {Const.imUtil.getTimeStr(data.timestamp,true)}
            </Text>
        );
    }
}

