/**
 * Created by wdq on 2017/8/1.
 */
/**
 * 跨浏览器事件对象
 */
var eventUtil={
    /**
     * 获取事件对象
     * @param event
     * @returns {*}
     */
    getEvent:function(event){
        return event ? event : window.event;
    },
    /**
     *获取实际目标
     * @param event
     * @returns {Node|at.selectors.pseudos.target|target|MSGesture.target|x.Event.target|*}
     */
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    /**
     * 阻止对象默认事件
     * @param event
     * @returns {*}
     */
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    /**
     * 阻止事件冒泡
     * @param event
     * @returns {*}
     */
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    /**
     * 添加事件处理程序
     * @param element：事件对象
     * @param event：事件类型
     * @param handler：事件处理函数
     */
    addEvent:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on' + type]=handler;
        }
    },
    /**
     * 删除事件处理程序
     * @param element
     * @param event
     * @param handler
     */
    removeEvent:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on' + type]=null;
        }
    },

    /**
     * 鼠标滚轮事件
     * @param event
     * @returns {number}
     */
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail * 40;
        }
    },

    /**
     * 获取键盘按键值
     * @param event
     * @returns {*}
     */
    getCharCode:function(event){
        if(event.charCode == 0){
            return event.keyCode;
        }else{
            return event.charCode;
        }
    },

    /**
     * 判断移动设备
     * */
    separatePhone:function (event) {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            window.location = 'mobile.html';//可以换成http地址
        }
    }
}

/**
 * 触摸组件
 * */

