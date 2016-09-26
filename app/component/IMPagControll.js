'use strict'

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Const from '../util/const'



export default class IMPagControll extends Component {

    static defaultProps = {
        index:0,
        count:0
    };

    constructor(props){
        super(props);
        this.state = {

        };
        this.arr = [];
        for (let i = 0;i<props.count;i++){
            this.arr.push(i)
        }
    }
    
    render() {
        const {index}= this.props
        return (
            <View
                style={{height:20,width:Const.screen_width,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
            >
                {this.arr.map((i)=>{
                    return(
                        <View
                            style={[{backgroundColor:Const.color_hei_240, width: 8, height: 8,borderRadius: 4
                            , marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3},
                            index===i&&{backgroundColor:Const.color_hei_56}] }
                            key = {i}
                        />
                    )
                })}

            </View>
        );
    }
}

const styles = StyleSheet.create({

});