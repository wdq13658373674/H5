/**
 * Created by wdq on 2017/7/31.
 */
/**
 * 框架js
 * */
window.onload=function(){
    setTimeout(loading,500);

    /*document.onkeyup=function(event){
        if(event.keyCode == 38){
            up();
        }else if(event.keyCode == 40){
            down();
        }
    }*/

    document.addEventListener(startEvt, startEvent);
    document.addEventListener(moveEvt, moveEvent);
    document.addEventListener(endEvt, endEvent);
}

/**
 * 页面加载等候
 */
function loading(){
    var load=document.getElementById('loading');
    var container=document.getElementById('container');

    if(document.readyState == 'complete'){
        load.className='loading hide';
        container.className='container';
    }
}

/**
 * 页面切换
 * nowPage:当前页
 * prePage:上一页
 * maxPage:最大页码数
 * isAnimate:是否正在动画
 * */
var now=1;
var pre=1;
var max=document.getElementsByClassName('page').length;
var isAnimate=false;
function down(){
    if(!isAnimate){
        if(now == 1){
            pre=now;
            now=max;
        }else {
            pre=now;
            now--;
        }
    }
    go('up');
}

function up(){
    if(!isAnimate){
        if(now == max){
            pre=now;
            now=1;
        }else {
            pre=now;
            now++;
        }
    }
    go('down');
}

function go(state){
    var nowPage='.page' + now;
    var prePage='.page' + pre;

    var outCss='';
    var inCss='';

    if(state == 'down'){
        outCss='outTop';
        inCss='fromBottom';
    }else if(state == 'up'){
        outCss='outBottom';
        inCss='fromTop';
    }

    $(nowPage).removeClass('hide');
    $(nowPage).addClass(inCss);
    $(prePage).addClass(outCss);

    isAnimate=true;
    setTimeout(function(){
        $(prePage).addClass('hide');
        $(nowPage).removeClass(inCss);
        $(prePage).removeClass(outCss);
        isAnimate=false;
    },600)
}


/**
 * touches
 * */
var swipe_dis = 30;//移动30px之后才认为是swipe事件
var swipe_time = 500;//swipe最大经历时间
var point_start,point_end;
var time_start,time_end;
var startEvt, moveEvt, endEvt;

//touchestart
var startEvent=function(e){
    point_end=0;
    point_start = getTouchPos(e);
    time_start = Date.now();
}

//touchmove
var moveEvent=function(e){
    point_end = getTouchPos(e);
}

//end
var endEvent=function(e){
    time_end = Date.now();

    if(getDis(point_start,point_end) > swipe_dis && (time_end - time_start) <  swipe_time){
        var dir = getDir(point_end,point_start);
        if(dir == 'top'){
            up();
        }

        if(dir == 'bottom'){
            down();
        }
    }
}

/**
 * var supportTouch = "createTouch" in document  //判断是否支持触摸事件
 * */
if("ontouchstart" in window){
    startEvt="touchstart";
    moveEvt="touchmove";
    endEvt="touchend";
}else{
    startEvt="mousedown";
    moveEvt="mousemove";
    endEvt="mouseup";
}

//获取touch点
function getTouchPos(e){
    var touches=e.touches;
    if(touches && touches[0]){
        return {
            x : touches[0].clientX,
            y : touches[0].clientY
        };
    }

    return {x : e.clientX,y : e.clientY};
}
//两点间距离
function getDis(p1,p2){
    if(!p1 || !p2) return 0;
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

//计算两点间的角度
function getAngle(p1,p2){
    var r = Math.atan2(p1.y - p2.y, p2.x - p1.x);
    var a = r * 100 / Math.PI;
    return a;
}

//获取swipe方向
function getDir(p2,p1) {
    var dx = p2.x - p1.x;
    var dy = -p2.y + p1.y;
    var angle = Math.atan2(dy , dx) * 180 / Math.PI;

    if(angle < 45 && angle > -45) return "right";
    if(angle >= 45 && angle < 135) return "top";
    if(angle >= 135 || angle < -135) return "left";
    if(angle >= -135 && angle <= -45) return "bottom";
}























