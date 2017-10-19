/**
 * Created by wdq on 17/4/24.
 */
/**
 *设备适配设置
 * */

fontSize();
window.onresize=function(){
    fontSize();
}

function fontSize(){
    var pixelRatio = 1 / window.devicePixelRatio;
    oMeta = document.createElement('meta');
    oMeta.charset = 'utf-8';
    oMeta.name="viewport";
    oMeta.content='width=device-width,initial-scale=' + pixelRatio + ',minimum-scale=' + pixelRatio + ',maximum-scale=' + pixelRatio;
    document.getElementsByTagName('head')[0].appendChild(oMeta);

    var html = document.getElementsByTagName("html")[0];
    var pageWidth = html.getBoundingClientRect().width;//物理像素640
    console.log(pageWidth);
    html.style.fontSize = pageWidth / 20 + "px";
}
