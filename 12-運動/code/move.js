/* 封裝step1:先思考要封裝函數所要傳遞的參數，不需要先思考功能
* obj:操作對象
* att:操作的屬性
* target:目標位置
*/

//＊緩衝運動
function startMove(obj, att, target){
    clearInterval(obj.timer);
    
    //速度
    var speed = 0;
    //操作的屬性值
    var currentValue = 0;

    obj.timer = setInterval(function(){
        // 1. 獲取當前值
        if(att == 'opacity'){   //特定設定透明度部分
            currentValue = parseInt(getStyle(obj,att)*100); //讓數值在0-100 ，取出來的值在0-1
        } else {
            currentValue = parseInt(getStyle(obj,att));
        }
        // 2. 設置速度
        speed = (target - currentValue) / 7;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 3. 運動處理
        currentValue += speed;
        if(currentValue == target){  //停止
            clearInterval(obj.timer);
        } else {   //運動

            if(att == 'opacity'){
                obj.style.opacity = currentValue /100; // 非IE部分
                obj.style.filter = 'alpha(opacity:' + currentValue + ')'; // IE部分
            } else {
            obj.style[att] = currentValue + 'px';
            }
        }
    },30);
}

//＊獲取物件屬性函數
function getStyle(obj,att){
    return window.getComputedStyle ? getComputedStyle(obj)[att] : obj.currentStyle[att];
}