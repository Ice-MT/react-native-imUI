'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';


import Const from '../util/const'
import System_styles from '../util/system_styles'

var leftVoiceImags = [require('./image/ico_yuyinhui01.png'),require('./image/ico_yuyinhui02.png'),require('./image/ico_yuyinhui.png')]
var rightVoiceImags = [require('./image/ico_01.png'),require('./image/ico_02.png'),require('./image/ico_03.png')]


export default class IMChatShow_Message_Text extends Component {

    static defaultProps = {

        data:{
            isMe:false,
            isRead:false,
            messageType:Const.messageVoice,
            isPlayed:false,
            duration:10
        },
    }
    constructor(props){
        super(props);
        this.state = {
            imageIndex:2,
            animation:false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount(){
        // Keyboard.remove();
        this.timer && clearInterval(this.timer);

    }

    componentWillReceiveProps (nextProps){

        if (!nextProps.data.playing){
            this.timer && clearInterval(this.timer);
            this.setState({
                imageIndex:2,
                animation:false
            })
        }else {
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(()=>{
                var index = this.state.imageIndex
                index = index === 2?0:index+1;
                this.setState({
                    imageIndex:index,
                    animation:true

                })

            },500)
        }

    }
    

    _playVoice = ()=>{
        // Const.IMManager.voiceClick(this.props.data.messageId)

        //模拟
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(()=>{
            var index = this.state.imageIndex
            index = index === 2?0:index+1;
            this.setState({
                imageIndex:index,
                animation:true
                
            })

        },500)


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

    render() {
        const {data}=this.props
        const {imageIndex,animation}=this.state
        // let msgdata = JSON.parse(data.messageJson);
        let duration = data.duration


        var image = data.isMe?rightVoiceImags[imageIndex]:leftVoiceImags[imageIndex];
        
        let voiceIcon = (
            <Image
                source={image}>
            </Image>
        );
        let timeText = (
            <Text style={[{color:Const.color_hei_32,marginLeft:4},System_styles.font_changgui_13,data.isMe&&{marginLeft:0,marginRight:4,color:'white'}]}>
                {Math.round(duration) + '"秒'}
            </Text>
        );
//长度计算
        let ww = (Const.screen_width - 32 -50-40-10)/100.0
        let kk = ww * 29
        let ll =  (Const.screen_width - 32 -50-40-10- kk)/60.0
        let voiceLine = (
            <View style={[{backgroundColor:Const.color_hei_12,padding:8,paddingTop:8,paddingBottom:8,borderRadius:4,flexDirection:'row',width:kk+duration*ll,alignItems:'center'}
            ,data.isMe&&{backgroundColor:Const.color_blue,justifyContent:'flex-end'}]}
                  ref={component => this._root = component}

            >
                {data.isMe ? timeText : voiceIcon}
                {data.isMe ? voiceIcon : timeText}
            </View>
        );

        let content =Const.isAdroid?(
            <TouchableNativeFeedback
                onPress={this._playVoice}
                onLongPress = {this._onLongPress}

            >
                <View style={[{flexDirection:'row'},data.isMe&&{justifyContent:'flex-end'}]}>
                    {voiceLine}

                </View>
            </TouchableNativeFeedback>
        ) :(
            <TouchableOpacity
                onPress={this._playVoice}
                onLongPress = {this._onLongPress}

            >
                <View style={[{flexDirection:'row'},data.isMe&&{justifyContent:'flex-end'}]}>
                    {voiceLine}

                </View>
            </TouchableOpacity>

        )

        if (!data.isMe&&!data.isPlayed){
            return (
                <View
                    style={{flexDirection:'row'}}
                >
                    {content}
                    <View
                        style={{backgroundColor:'red',width:8,height:8,borderRadius:4,marginLeft:3}}
                    />
                </View>
            );
        }else {
            return  content
        }
    }
}

