//按钮组件

'use strict'
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

/*-----Props
 * buttonStyle:{//button样式
 *  'center' -- default//居中
 *  'rowCenter' -- default//居中
 *  'rowLeft'//左侧对齐
 *  'rowRight'//右侧对齐 !!!不能同时有 image title
 * }
 * flexStyle:{
 *  'column' -- default//纵向
 *  'row'//横向
 * }
 * feekBackStyle:{//交互反馈样式
 *  'all' -- default 全部
 *  'background' //背景有反应
 *  'subComponent'//子组件有反应
 *  'none'
 * }
 * selected
 * highlightedBackgroundColor //高亮时候背景 配合feekBackStyle="background"使用
 * title//标题
 * selectedTitle//标题
 * titleStyle//标题样式
 * selectedTitleStyle//标题样式
 * image//图片
 * selectedImage//图片
 * defaultSourceImage//缓冲图片
 * backgroundImage//背景图片
 * defaultSourceBackgroundImage//缓冲背景图片
 * backgroundColor//背景颜色
 * tag //组件标示
 * onPress //回调
 * disalbed
 * showPhoto
 * 
 * */

export default class Button extends Component {

    static defaultProps = {
        showPhoto:false,
        feekBackStyle:'all',
        btnState:'normol',
        buttonStyle: 'center',
        selected:false,
        flexStyle: 'column',
        titleStyle:{color:'#000000',
            fontSize:16,
            margin:5,
            textAlign:'center',},
    };

    constructor(props){
        super(props);
        this.state = {
            btnState:props.btnState,
        };
    }

    _renderContainer =()=>{
        if(this.props.image !==null && this.props.title === undefined){
            return(
                <Image source={this.props.image} />
            );
        }
      
    }

    _renderImage = ()=>{
        if(this.props.image !==undefined &&this.props.showPhoto===false){
            let image = this.props.image;
            if (this.props.selected){
                image = this.props.selectedImage
            }

            return(
                <Image source={image}
                       style={[this.props.buttonStyle === 'rowRight'&&{alignSelf:'flex-end'},
                        (this.state.btnState==='highlighted'&&this.props.feekBackStyle === 'subComponent')&&{opacity:0.6}]}
                />
            );
        }
    }

    _renderTitle = ()=>{
        if(this.props.title !==undefined &&this.props.showPhoto===false){
            return(
                <Text style={[{margin:5},this.props.titleStyle,
                                this.props.buttonStyle === 'rowRight'&&{alignSelf:'flex-end'},
                                (this.state.btnState==='highlighted'&&this.props.feekBackStyle === 'subComponent')&&{opacity:0.6},
                               ]}
                >{this.props.title}</Text>
            );
        }
    }

    _onPressIn = ()=>{
        if (this.props.feekBackStyle!=='none'){
            this.setState({
                btnState:'highlighted'
            });
        }
    }

    _onPressOut = ()=>{
        this.setState({
            btnState:'normal'
        });
    }

    _onPress = ()=>{
        if(this.props.onPress!==undefined){
            this.props.onPress(this.props.tag)

        }

    }

    render() {
        return (
            <TouchableWithoutFeedback
                disabled = {this.props.btnState==='disabled'}
                onPressIn = {this._onPressIn}
                onPressOut = {this._onPressOut}
                onPress = {this._onPress}
            >
                <View
                    source={this.props.backgroundImage}
                    style={[styles.container,
                              this.props.buttonStyle === 'center'&&{alignItems:'center',justifyContent:'center'},
                              this.props.backgroundColor !== undefined&&{backgroundColor:this.props.backgroundColor},
                              this.props.buttonStyle === 'rowLeft'&&{flexDirection:'row',alignItems: 'center',},
                              this.props.buttonStyle === 'rowCenter'&&{flexDirection:'row',alignItems: 'center',justifyContent:'center'},
                              this.props.buttonStyle === 'rowRight'&&{justifyContent: 'center',},
                              (this.state.btnState==='highlighted'&&this.props.feekBackStyle === 'all')&&{opacity:0.6},
                              (this.state.btnState==='highlighted'&&this.props.feekBackStyle === 'background')&&{backgroundColor:this.props.highlightedBackgroundColor},
                              ,this.props.style
                           ]}>

                    {this._renderImage()}
                    {this._renderTitle()}

                </View>
            </TouchableWithoutFeedback>
        );
    }
}
//{this._renderContainer()}
const styles = StyleSheet.create({
    container: {

    },

});