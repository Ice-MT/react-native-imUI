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

import WebImage from './IMChatShow_Message_Image_Native'

var ww =(Const.screen_width-50)/2

export default class IMChatShow_Message_Image extends Component {

    static defaultProps = {
        data:{
            isMe:false,
            isRead:false,
            messageType:Const.messageImage,
            // imageUrl:''

        },
        callback:undefined,//回调函数, 处理各种类型回调事件{actionType:'', ... }

    }
    constructor(props){
        super(props);
        this.state = {

        };
        
        // this.data = JSON.parse(props.data.messageJson);



        ///------------------ 对比Test

        this.showWeb = true


        this.width = ww;
        this.height = ww;

        this._suitSize()





    }


    componentWillReceiveProps (nextProps){

        this._suitSize()
    }

    _suitSize = ()=>{
        if(this.showWeb){
            return
        }


        Image.getSize(this.props.data.url, (width, height) => {
            //
            console.log(width+'~'+height)
            //
            let iww
            let ihh
            if(width>height){
                iww = ww
                ihh = ww/width*height;
            }else {
                ihh = ww
                iww = ww/height*width;
            }

            this.width=iww
            this.height=ihh
            this.forceUpdate()
        });
    }

    componentWillMount() {

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
        const {data,callback}= this.props


        let imv = this.showWeb?(
            <WebImage
                style={{ width: this.width,height: this.height}}
                url={data.url}
                isMe = {data.isMe}
            />
        ):(
            <Image
                style={{ width: this.width,height: this.height}}
                source={{uri:data.url}}
            />
        )

        let com = (
            <View
                style={[{width:this.width,height:this.height,borderRadius:4,overflow:'hidden'},data&&{borderColor:Const.color_lan}]}
                ref={component => this._root = component}

            >
                {imv}
            </View>
        )

        return (
            <TouchableOpacity
                onPress={()=>{callback('image',data.messageId)}}
                onLongPress = {this._onLongPress}
                activeOpacity = {0.8}
            >
                {com}
            </TouchableOpacity>

        );


    }
}

