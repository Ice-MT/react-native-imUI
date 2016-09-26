'use strict'

import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';


import Const from '../util/const'
import System_styles from '../util/system_styles'


export default class MenuBar extends Component {

    static defaultProps = {
            menuItems:['复制','转发','收藏'],
            origin:{},
            itemClick:undefined
    }
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        console.log('MenuBar render')
        const {menuItems,origin,itemClick}=this.props
        let ww = menuItems.length*60
        let ll = 50
        let tt = 200
        let jll = ww/2-10
        if(origin.y>64+45+10){
            tt = origin.y-5-45
        }else {
            tt = origin.y+5+origin.height
        }
        if (ww<origin.width){
            ll = origin.x+origin.width/2-ww/2
        }else {
            if (origin.x < Const.screen_width-origin.x-origin.width){
                ll = origin.x
                jll = origin.width/2-10
            }else {
                ll = origin.x+origin.width-ww
                jll = ww-origin.width/2-10

            }
        }
        let top = origin.y<64+45+10?(
            <View
            >
                <Image
                    style={{left:jll,top:0}}

                    source = {require('./image/heisetop.png')}
                />
            </View>
            ):undefined

        let bottom =origin.y>64+45+10?(
            <View>
                <Image
                    style={{left:jll,top:0}}
                    source = {require('./image/heise.png')}
                />
            </View>
           ):undefined

        return (
            <View
                style={[{flexDirection:'column',height:45,width:ww,left:ll,top:tt,position:'absolute'},this.props.style]}
            >
                {top}
                <View
                    style={{flexDirection:'row',height:35,borderRadius:6,padding:3,overflow:'hidden',backgroundColor:'black'}}
                >
                    {menuItems.map((item)=>{
                        return(
                            <TouchableOpacity
                                style = {[{backgroundColor:'black',height:29,width:(ww-6)/menuItems.length,alignItems:'center',justifyContent:'center'},
                                item!==menuItems[menuItems.length-1]&&{borderRightColor:'white',borderRightWidth:1,}]}
                                key = {item}
                                onPress = {()=>itemClick(item)}
                            >
                                <Text
                                    style={[System_styles.getChanggui(15)]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}


                </View>
                {bottom}

            </View>

        );
    }
}

