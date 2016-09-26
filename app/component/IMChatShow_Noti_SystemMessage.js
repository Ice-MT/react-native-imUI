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
            messageType:Const.messageSystemMessage,
            agentMessage:'改客户已成功提供身份信息改客户已成功提供身份信息改客户已成功提供身份信息改客户已成功提供身份信息改客户已成功提供身份信息'
        },
    }
    constructor(props){
        super(props);
        this.state = {

        };

    }

    componentWillReceiveProps (nextProps){


    }


    render() {
        const {data}=this.props;


        let msg = JSON.parse(data.messageJson);


        return (
            <View style={{paddingHorizontal:5,paddingVertical:8,width:Const.screen_width-32,borderRadius:4,backgroundColor:Const.color_qing}}>
                <Text
                    style={[{color:Const.color_hei_56,width:Const.screen_width-32-16,textAlign:'center'},System_styles.font_changgui_15]}
                >
                    {msg.agentMessage}
                </Text>
            </View>

        );
    }
}

