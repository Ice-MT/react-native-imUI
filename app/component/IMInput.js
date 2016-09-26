'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    Animated,
    Image,
    PanResponder,
    TouchableOpacity
} from 'react-native';

import Const from '../util/const'
import System_styles from '../util/system_styles'
// import Button from '../common/Button'
import Keyboard from 'Keyboard'
import IMMenu from './IMMenu'
import IMFace from './IMFace'



var i = 0

export default class copy extends Component {

    static defaultProps = {
        recorderAction:(showActivity,cancel)=>{},
        layouyChange:(can)=>{},
    };

    constructor(){
        super();
        this.state = {
            showVoice:false,
            showMenu:false,
            showFace:false,
            showKeyboard:false,

            inputHeight:new Animated.Value(34),
            subHeight:new Animated.Value(0),

            voicePressOn:false,

            deleteBackward:false,

            text:''
        };

        this.keyboardHeight = 0

        this.keyboardAutoFoucs = false

        this.oldInputHeight = 0
        this.maxInputHeight = 0
        this.minInputHeight = 0


        this.recorderCancel = false
    }

    componentWillMount(){
        
        const {recorderAction}=this.props
        
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.setState({voicePressOn:true})
                recorderAction(true,false)
                this.recorderCancel = false
            },
            onPanResponderMove: (evt, gestureState) => {
                if(gestureState.moveY<Const.screen_height-70){
                    recorderAction(true,true)
                    this.recorderCancel = true
                }else {
                    recorderAction(true,false)
                    this.recorderCancel = false
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.setState({voicePressOn:false})
                recorderAction(false,this.recorderCancel)
                
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }

    componentDidMount() {
        // Keyboard events监听
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
        this.keyboardAutoFoucs = true

    }


    componentWillUnmount(){
        this.keyboardWillShow.remove()
        this.keyboardWillHide.remove()
    }



    _keyboardWillShow = (frames)=>{

        this.keyboardHeight = frames.endCoordinates.height
        Animated.timing(this.state.subHeight, {
            toValue: this.keyboardHeight,
            duration: 300,
        }).start();
        this.setState({
            showKeyboard:true,
            showVoice:false,
            showMenu:false,
            showFace:false
        })
    };

    _keyboardWillHide = ()=>{
        const {showVoice,showMenu,showFace} = this.state
        if(showVoice||showMenu||showFace)return

        Animated.timing(this.state.subHeight, {
            toValue: 0,
            duration: 300,
        }).start();

        this.setState({
            showKeyboard:false,
            showVoice:false,
            showMenu:false,
            showFace:false
        })

    };

    _voiceOnPress = ()=>{
        const {showVoice} = this.state

        Animated.timing(this.state.subHeight, {
            toValue: 0,
            duration: 300,
        }).start();
        Animated.timing(this.state.inputHeight, {
            toValue: this.minInputHeight+10,
            duration: 300,
        }).start();
        this.keyboardAutoFoucs = true

        this.setState({
            showVoice:!showVoice,
            showMenu:false,
            showFace:false,
            showKeyboard:false,
        })

}
    _faceOnPress = ()=>{

        const {showFace,showKeyboard} = this.state
        if(showKeyboard){
            this.textInput.blur()
        }
        this.keyboardAutoFoucs = false
        if (!showFace){
            Animated.timing(this.state.subHeight, {
                toValue: 186,
                duration: 300,
            }).start();
        }else {
            this.textInput.focus()
            return;
        }

        this.setState({
            showVoice:false,
            showMenu:false,
            showFace:!showFace,
            showKeyboard:false,
        })


    }
    _menuOnPress = ()=>{
        const {showKeyboard} = this.state
        if(showKeyboard){
            this.textInput.blur()
        }
        this.keyboardAutoFoucs = false

        Animated.timing(this.state.subHeight, {
            toValue: 186,
            duration: 300,
        }).start();
        this.setState({
            showVoice:false,
            showMenu:true,
            showFace:false,
            showKeyboard:false,
        })

    }
    
    hideSubView = ()=>{
        const {showKeyboard,showMenu,showFace} = this.state
        if(showKeyboard||showMenu||showFace){
            if(showKeyboard){
                this.textInput.blur()
            }
            Animated.timing(this.state.subHeight, {
                toValue: 0,
                duration: 300,
            }).start();
            this.setState({
                showMenu:false,
                showFace:false,
                showKeyboard:false,
            })
        }

    }

    _onContentSizeChange =(event)=>{
        let height = event.nativeEvent.contentSize.height
        if(this.minInputHeight === 0){
            this.minInputHeight = height
        }
        if(height<125){
            this.oldInputHeight = height
            this.maxInputHeight = 0

            Animated.timing(this.state.inputHeight, {
                toValue: height+10,
                duration: 300,
            }).start();
        }else {
            this.maxInputHeight = this.maxInputHeight===0?this.oldInputHeight+(height-this.oldInputHeight)/2:this.maxInputHeight
            Animated.timing(this.state.inputHeight, {
                toValue: this.maxInputHeight,
                duration: 300,
            }).start();
        }
    }


    _faceClick = (face)=>{
        const {text}=this.state
        if(face === 'send'){
            if(1){
                this._send();
            }
            return
        }
        if(face === 'delete'){
            this.setState({
                deleteBackward: true,
            })
        }else {
            this.setState({
                text: text+face,
            })
        }
    }

    _menuClick = (item)=>{
        this.hideSubView()

        let imgs = ['http://p0.so.qhmsg.com/sdr/600_900_/t01cf33f99ce0b5813a.jpg',
            'http://p1.so.qhmsg.com/t01f67a7a5d15fcadd1.jpg',
            'http://p4.so.qhmsg.com/sdr/1600_900_/t0152251c99c992e169.jpg']

        //模拟
        this.props.sendMessage([  {
            messageType:Const.messageImage,//消息类型
            from:'0',//消息来源  userId
            timestamp:new Date().getTime()+'',//时间戳
            isRemoteRead:false,//对端是否已读
            url:imgs[i],//文本消息可用,
            isMe:true
        }])


        i++
        i = i>2?0:i

    }

    _send = ()=>{
        const {text}=this.state
        if(text.length === 0){
            return;
        }
        this.setState({text:''})

        //模拟
        this.props.sendMessage([  {
            messageType:Const.messageText,//消息类型
            from:'0',//消息来源  userId
            timestamp:new Date().getTime()+'',//时间戳
            isRemoteRead:false,//对端是否已读
            text:text,//文本消息可用,
            isMe:true
        }])
        
    }


    
    
    _imAction = (event)=>{
        switch (event.nativeEvent.actionType){
            case 'del':{
                this.setState({deleteBackward:false})
            }break;
            case 'send':{
                this._send()
            }break;
        }

    }

    _renderInput = ()=>{
        const {showVoice,voicePressOn,deleteBackward,text} = this.state


        if(showVoice){
            return(
                <View
                    style={[{backgroundColor:'white',borderRadius:4,borderColor:Const.color_hei_240,borderWidth:1,alignItems:'center',justifyContent:'center',flex:1},
                    voicePressOn&&{backgroundColor:Const.color_hei_24}]}
                    {...this._panResponder.panHandlers}
                >
                    <Text
                        style={System_styles.getChanggui(17,Const.color_hei_84)}
                    >
                        {voicePressOn?'松开结束':'按住说话'}
                    </Text>
                </View>
            )
        }
        return(
            <Animated.View
                style={{backgroundColor:Const.color_hei_240,borderRadius:4,flex:1,padding:5,paddingRight:0}}
            >
                <TextInput
                    ref={(textInput)=>{this.textInput = textInput}}
                    style={[{flex:1,padding:0},System_styles.getChanggui(17,Const.color_hei_84)]}
                    multiline={true}
                    enablesReturnKeyAutomatically = {true}
                    returnKeyType='send'
                    onChangeText={(text) => this.setState({text:text})}
                    value={text}
                    blurOnSubmit = {false}
                    onContentSizeChange = {this._onContentSizeChange}
                    autoFocus = {this.keyboardAutoFoucs}

                    underlineColorAndroid = {'transparent'}
                    //一下自定义属性 修改源码
                    forIM = {true}
                    deleteBackward= {deleteBackward}
                    onSelectionChange = {this._imAction}
                />
            </Animated.View>
        )

    }
    

    _renderSub = ()=>{
        const {showMenu,showFace,showKeyboard} = this.state

        if (showFace){
            return(
                <IMFace
                    callback = {this._faceClick}
                />
            )
        }
        if (showMenu){
            return(
                <IMMenu
                    callback = {this._menuClick}
                />
            )
        }
        if (showKeyboard){
            return(
                <View
                    style={{flex:1}}
               />
            )
        }



    }

    render() {
        const {showVoice,showFace,subHeight,inputHeight} = this.state

        return (
            <View
                style={{borderTopColor:Const.color_hei_240,borderTopWidth:1,backgroundColor:'white',
                width:Const.screen_width,borderBottomColor:Const.color_hei_240,borderBottomWidth:1}}
            >
                <View
                    //main
                   style={{paddingHorizontal:16,paddingVertical:8,flexDirection:'row'}}
                >
                    <View
                        //voice
                        style={{width:30,justifyContent:'flex-end'}}
                    >
                        <TouchableOpacity
                            onPress={this._voiceOnPress}
                            activeOpacity = {0.8}
                        >
                            <Image
                                source = {showVoice?require('./image/btn_jianpan.png'):require('./image/ico_airing.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        //input
                        style={{height:inputHeight,flex:1,marginHorizontal:5}}

                    >
                        {this._renderInput()}
                    </Animated.View>
                    <View
                        //voice
                        style={{width:30,justifyContent:'flex-end',alignItems:'flex-end',marginRight:3}}
                    >
                        <TouchableOpacity
                            onPress={this._faceOnPress}
                            activeOpacity = {0.8}
                        >
                            <Image
                                source = {showFace?require('./image/btn_jianpan.png'):require('./image/btn_chat.png')}

                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        //voice
                        style={{width:30,justifyContent:'flex-end',alignItems:'flex-end'}}
                    >
                        <TouchableOpacity
                            onPress={this._menuOnPress}
                            activeOpacity = {0.8}
                        >
                            <Image
                                source = {require('./image/btn_add_small.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View
                    //subView
                    style={{height:subHeight,flex:1,marginHorizontal:5}}
                >
                    {this._renderSub()}
                </Animated.View>
            </View>
        );
    }
}
