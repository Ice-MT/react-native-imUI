
import {StyleSheet} from 'react-native';
const font_pf_Zhonghei='PingFang-SC-Medium'
const font_pf_Changgui='PingFang-SC-Regular'

function getZhonghei(size,color) {
    return[{
        fontFamily:font_pf_Zhonghei,
        fontSize:size,
        color:'white'
    },color&&{color:color}]
}

function getChanggui(size,color) {
    return[{
        fontFamily:font_pf_Changgui,
        fontSize:size,
        color:'white'
    },color&&{color:color}]
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
});


module.exports = {
    getZhonghei:getZhonghei,
    getChanggui:getChanggui,
    styles:styles
};