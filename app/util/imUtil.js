
export function getTimeModel(timestamp) {
    return {
        messageType:'Time',
        timestamp:timestamp
    }
}

// 'color = "tan" AND name BEGINSWITH "B"'
export function getTimeStr(timestamp,show) {

    var showDetail = show===undefined?false:show
    
    let tpInt =  parseInt(timestamp)
    let tp=new Date(tpInt);

    let now = new Date();
    let nowInt = now.getTime()

    let hour = tp.getHours()
    let minute = tp.getMinutes()
    let hmstr = ' '
    if(hour < 10)
        hmstr += "0";
    hmstr += hour + ":";
    if (minute < 10)
        hmstr += '0';
    hmstr += minute;
    let result = ''
    
    let onedayTimeIntervalValue = 24*60*60*1000
    let gapTime = nowInt - tpInt

    if (gapTime < onedayTimeIntervalValue * 3 && gapTime > 0) {

        if(gapTime <=onedayTimeIntervalValue){
            var isSameDay = tp.getDay() === now.getDay();
            result = isSameDay ?(showDetail?result+hmstr:hmstr)
                :(showDetail?'昨天'+result+hmstr:'昨天');
        }
        else if(gapTime <=onedayTimeIntervalValue*2)//昨天
        {

            result =  showDetail?'昨天 '+result+hmstr:'昨天'
        }
        else if(gapTime <=onedayTimeIntervalValue*3) //前天
        {
            result = showDetail?'前天 '+result+hmstr:'前天'
        }
    }else if(gapTime <=onedayTimeIntervalValue*7 && gapTime > 0){

        switch (tp.getDay()){
            case 0:
                result = '星期日';
                break;
            case 1:
                result =  '星期一';
                break;
            case 2:
                result =  '星期二';
                break;
            case 3:
                result =  '星期三';
                break;
            case 4:
                result =  '星期四';
                break;
            case 5:
                result =  '星期五';
                break;
            case 6:
                result =  '星期六';
                break;
        }
        result = showDetail?result + hmstr:result;
    }else{
        // result =showDetail?Format(tp,"yyyy-MM-dd hh:mm"): Format(tp,"yyyy/MM/dd");
        result = Format(now,"yyyy-MM-dd hh:mm")

    }
    return result
}


function  Format(date,fmt)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

export function getRNMessageArr(msgs) {

    let tmp = []

    msgs.map((msg)=>{
        tmp.push(getRNMessage(msg))
    })

    return tmp
}


export function getRNMessage(msg) {
    let text =''
    let msgJson = msg.messageJson
    let msgType = ''
    switch (msg.messageType){
        case 0:{
            let data
            try {
                data = JSON.parse(msg.text);
                if(data!== undefined ) {
                    switch (data.messageType) {
                        case 1:
                        {//广告
                            msgType = 'ProMessage'
                        }
                            break;
                        case 2:
                        {///消息通知
                            msgType = 'SystemMessage'
                        }
                            break;
                        case 3:
                        {//产品
                            msgType = 'Product'
                        }
                            break;
                        case 4:
                        {//客户轨迹
                            msgType = 'CustomerTrajectory'
                        }
                            break;
                        case 5:
                        {//投顾动作
                            msgType = 'Activity'
                            break;
                        }
                        case 6:
                        {//系统通知消息
                            msgType = ''
                        }
                            break;
                        case 7:
                        {//系统通知消息
                            msgType = ''
                        }
                            break;
                        default:
                            break;
                    }
                    msgJson = JSON.stringify(data.messageData)
                }
            }catch (error){
                msgType = 'Text'
                text = msg.text
            }

        }break;
        case 1:{//图片
            msgType = 'Image'
        }break;
        case 2:{//声音
            msgType = 'Voice'
        }break;
        case 3:{//视频
            msgType = ''
        }break;
        case 4:{//位置
            msgType = 'Location'
        }break;
        case 6:{//文件
            msgType = 'Flie'
        }break;
    }
    return {
        messageId: msg.messageId,
        messageType:msgType,
        session:msg.sessionId,
        from:msg.from,
        timestamp:msg.timestamp+'',
        isDeleted:msg.isDeleted,
        isRemoteRead:msg.isRemoteRead,
        isPlayed:msg.isPlayed,
        playing:msg.playing,
        isMe:msg.isMe,
        text:text,
        messageJson:msgJson,
        sendSuccess:msg.sendSuccess,
        userInfo:msg.userInfo,
    }
}


