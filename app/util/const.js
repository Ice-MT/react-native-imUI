'use strict'

import React, {
    Dimensions,
    Platform
} from 'react-native';

import *as imUtil from './imUtil'

var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var NAV_BAR_HEIGHT = 44;
var STATUS_BAR_HEIGHT = Platform.OS === 'ios'?20:0;
var TAB_BAR_HEIGHT = 49;
var STATUS_BAR_NAV_BAR_HEIGHT = STATUS_BAR_HEIGHT + NAV_BAR_HEIGHT;
var STATUS_BAR_NAV_BAR_TAB_BAR_HEIGHT = STATUS_BAR_NAV_BAR_HEIGHT + TAB_BAR_HEIGHT;


module.exports = {
    screen_width: SCREEN_WIDTH,
    screen_height: SCREEN_HEIGHT,
    nav_bar_height: NAV_BAR_HEIGHT,
    status_bar_height: STATUS_BAR_HEIGHT,
    tab_bar_height: TAB_BAR_HEIGHT,
    status_bar_nav_bar_height: STATUS_BAR_NAV_BAR_HEIGHT,
    bar_height: STATUS_BAR_NAV_BAR_TAB_BAR_HEIGHT,

    color_hei_84 :'rgba(51,51,51,0.84)',
    color_hei_12 :'rgba(51,51,51,0.12)',
    color_hei_24 :'rgba(51,51,51,0.24)',
    color_hei_32 :'rgba(51,51,51,0.32)',
    color_hei_56 :'rgba(51,51,51,0.56)',
    color_hei_240 :'rgb(240,240,240)',
    color_hei_bg :'rgba(51,51,51,0.56)',
    color_blue :'rgba(55,161,236,0.84)',
    color_red :'rgba(236,84,116,0.84)',
    color_yellow :'rgba(255,186,51,0.84)',

    isAndriod:Platform.OS === 'ios',

    messageText:'Text',
    messageImage:'Image',
    messageLocation:'Location',
    messageSystemMessage:'SystemMessage',
    messageTime:'Time',
    messageVoice:'Voice',
    messageActivity:'Activity',
    messageBusinessCard:'BusinessCard',
    messageFlie:'Flie',
    messageProduct:'Product',
    messageProMessage:'ProMessage',
    // messageCustomerTrajectory:'CustomerTrajectory',

    users:{
        0:{
            avatarUrl:require('../component/image/user1.jpg')
        },
        1:{
            avatarUrl:require('../component/image/user2.jpg')
        }
    },

    imUtil:imUtil
};
