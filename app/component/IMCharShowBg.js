

import React, { Component } from 'react';
import {
    View
} from 'react-native';

import Svg, {
    Path,
    
} from 'react-native-svg';

import Const from '../util/const'


export default class IMCharShowBg extends Component {


    _getPathForLeft = (ww,hh)=>{

        let left ='M'+(ww-4)+' 0 L4 0 Q 0 0 3 3 L 6 6 Q 8 8 8 12  L 8 '+(hh-4)+' Q 8 '+hh+' 12 '+hh+' L '+(ww-4)+' '+hh+' Q'+ww+' '+hh+' '+ww+' '+(hh-4)+' L '+ww+' 4 Q '+ww+' 0 '+(ww-4)+' 0'
        return left
    }


    _getPathForRight = (ww,hh)=>{
        let right='M4 0 L'+(ww-4)+' 0 Q '+ww+' 0 '+(ww-3)+' 3 L '+(ww-6)+' 6 Q '+(ww-8)+' 8 '+(ww-8)+' 12 L '+(ww-8)+' '+(hh-4)+' Q '+(ww-8)+' '+hh+' '+(ww-12)+' '+hh+' L 4 '+hh+' Q0 '+hh+' 0 '+(hh-4)+' L 0 4 Q0 0 4 0'
        return right
    }
    

    render() {
        
        const {width,height,isMe} = this.props

        let path = isMe?this._getPathForRight(width,height):this._getPathForLeft(width,height)
        let color = isMe?Const.color_blue:Const.color_hei_240
        return (
            <View
                style={{position:'absolute',left:0,top:0,width:width,height:height}}
            >
                <Svg
                    height={height}
                    width={width}
                >
                    <Path
                        fill={color}
                        d={path}
                    />
                </Svg>
            </View>
        );
    }
}


