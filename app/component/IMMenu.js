'use strict'

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

import Const from '../util/const'
import System_styles from '../util/system_styles'
import Button from './Button'

import IMPagControll from './IMPagControll'

var menu = [
    [
        [
            {image:require('./image/ico_zhaoxiang.png'),title:'照相',itemId:0},
            {image:require('./image/ico_tuku.png'),title:'图库',itemId:1},
            {image:require('./image/ico_shipin.png'),title:'视频聊天',itemId:2},
            {image:require('./image/btn_phone.png'),title:'语音聊天',itemId:3},
        ],
        [
            {image:require('./image/btn_chance_hong.png'),title:'销售机会',itemId:4},
            {image:require('./image/btn_chance_pre.png'),title:'客户关怀',itemId:5},
            {image:require('./image/btn_Info.png'),title:'资料库',itemId:6},
            {image:require('./image/btn_position.png'),title:'位置',itemId:7},
        ]
    ],
    [
        [
            {image:require('./image/btn_product_pre.png'),title:'产品库',itemId:8},
            {image:require('./image/ico_shoucang.png'),title:'我的收藏',itemId:9},
            {itemId:10},
            {itemId:11},
        ],
        [

        ]
    ]
]


export default class IMMenu extends Component {

    static defaultProps = {
        callback:undefined,
    };

    constructor(){
        super();
        this.state = {
            index : 0
        };
    }
    
    shouldComponentUpdate (){
        return false;
    }
    
    _btnClicked =(itemId)=>{
        const {callback} = this.props
        if(callback){
            callback(itemId)
        }

    }

    _onScroll = (obj)=>{

        let i = Math.round(obj.nativeEvent.contentOffset.x/Const.screen_width)

        if (i !== this.state.index){
            this.setState({
                index:i
            })
        }

    }

    _renderFace =(item,key)=>{
        const {index } = this.state

        let tt = 0
        return(
            <View
                style={{width:Const.screen_width-10,}}
                key = {key}
            >
                {item.map((item1)=>{
                    tt++
                    return(
                        <View
                            style={{flex:1,flexDirection:'row',paddingHorizontal:15}}
                            key = {tt}
                        >
                            {item1.map((item)=>{
                                if(item.title === undefined){
                                    return(
                                        <View
                                            style={{flex:1}}
                                            key = {item.itemId}
                                        />
                                    )
                                }
                               return(
                                   <Button
                                       style= {{flex:1}}
                                       image={item.image}
                                       title={item.title}
                                       buttonStyle='center'
                                       key={item.title}
                                       tag={item.itemId}
                                       titleStyle={[System_styles.font_zhonghei_13,{color:Const.color_hei_84}]}
                                       onPress = {this._btnClicked}
                                   />
                               )
                            })}
                        </View>

                    )
                })}
            </View>

        )

    }


    render() {
        let i=0
        return (
            <View
                style={{flex:1,paddingTop:5,borderTopColor:Const.color_hei_240,borderTopWidth:1}}
            >
                <ScrollView
                    showsHorizontalScrollIndicator = {false}
                    horizontal = {true}
                    pagingEnabled = {true}
                    onScroll = {this._onScroll}
                >
                    {menu.map((item)=>{
                        i++
                        return this._renderFace(item,i)
                    })}

                </ScrollView>
                <IMPagControll
                    index={this.state.index}
                    count = {2}
                />

            </View>
        );
    }
}
