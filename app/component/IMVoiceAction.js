'use strict'

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Const from '../util/const'
import System_styles from '../util/system_styles'

var oldCancel = true


export default class IMVoiceAction extends Component {

    static defaultProps = {

    };

    constructor(){
        super();
        this.state = {
            recordTime:0,
            imageIndex:4,
            cancel:false,

        };
    }
    componentDidMount(){

    }

    recorderAction = (showActivity,cancel)=>{
        //可优化
        // 调用频繁 优化处理
        if (showActivity){

            if(!this.timer){
                this.timer = setInterval(()=>{
                    const {recordTime,imageIndex}=this.state

                    let index = (imageIndex+1)>4?1:imageIndex+1
                    this.setState({
                        recordTime:recordTime+0.5,
                        imageIndex:index,
                    })
                },500)
            }


            if (oldCancel === cancel){
                return;
            }

            oldCancel = cancel
            this.setState({
                cancel:cancel
            })
        }else {

            if(!cancel){
                //模拟
                this.props.sendMessage([  {
                    messageType:Const.messageVoice,//消息类型
                    from:'0',//消息来源  userId
                    timestamp:new Date().getTime()+'',//时间戳
                    isMe:true,
                    isPlayed:false,
                    duration:this.state.recordTime
                }])
            }
            oldCancel = true

            this.setState({
                recordTime:0,
                cancel:cancel
            })
        }
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    render() {
        const {cancel,recordTime,imageIndex}=this.state

        let img
        switch (imageIndex){
            case 1:{
                img = require('./image/ico_voice1.png')
            }break;
            case 2:{
                img = require('./image/ico_voice2.png')
            }break;
            case 3:{
                img = require('./image/ico_voice3.png')
            }break;
            case 4:{
                img = require('./image/ico_voice4.png')
            }break;
        }

        let im = recordTime<50?(
            <Image
                style={{margin:15,marginBottom:12}}
                source = {img}
            />
        ):undefined
        let ti = recordTime<50?(
            <Text
                style={[System_styles.getChanggui(15)]}
            >
                {recordTime<10?'00:0'+parseInt(recordTime):'00:'+parseInt(recordTime)}
            </Text>
        ):undefined

        return (
            <View
                style={[{width:151,height:130,borderRadius:8,backgroundColor:Const.color_hei_84,left:(Const.screen_width-151)/2,
                top:(Const.screen_height-130)*(1-0.618),position:'absolute',alignItems:'center'},this.props.style]}
            >
                {im}
                {ti}
                <View
                    style={[{marginTop:4,paddingHorizontal:3,borderRadius:3},cancel&&{backgroundColor:Const.color_blue}]}
                >
                    <Text
                        style={[System_styles.getChanggui(15)]}
                    >
                        {cancel?'松开手指，取消发送':'手指上滑，取消发送'}
                    </Text>
                </View>

            </View>
        );
    }
}

